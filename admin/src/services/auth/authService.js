import * as accountAdapter from './demoAuthAdapter.js'
import { loginSchema } from '../../utils/validation/authSchema.js'
import { adminAccountSchema, adminProfileSchema, adminSessionSchema, accountSecuritySchema } from '../../utils/validation/accountSchemas.js'

// Connect backend requests here using ../api/api.js; components keep this interface.
// The current adapter is demo-only. These exports supply the demo login screen.
export { getDemoAccount, getDemoLogin } from './demoAuthAdapter.js'
export { DEMO_LOGIN } from '../../utils/constants/accountConstants.js'

function readResponse(schema, value, label) {
  const result = schema.safeParse(value)
  if (!result.success) throw new Error(label + ' returned an invalid response.', { cause: result.error })
  return result.data
}

export async function signIn(values) {
  const session = await accountAdapter.signIn(loginSchema.parse(values))
  return readResponse(adminSessionSchema, session, 'Sign-in')
}

export async function signOut() {
  await accountAdapter.signOut()
}

export async function saveAdminProfile(values) {
  const account = await accountAdapter.saveAdminProfile(adminProfileSchema.parse(values))
  return readResponse(adminAccountSchema, account, 'Profile save')
}

export async function saveAccountSecurity(values) {
  const { email, currentPassword, newPassword } = accountSecuritySchema.parse(values)
  // Password confirmation belongs to the form; role/ID are never update inputs.
  const account = await accountAdapter.saveAccountSecurity({ email, currentPassword, newPassword })
  return readResponse(adminAccountSchema, account, 'Account save')
}
