import { loginSchema } from '../../utils/validation/authSchema.js'
import { DEMO_LOGIN, INITIAL_ADMIN_ACCOUNT } from '../../utils/constants/accountConstants.js'
import { adminAccountSchema, adminProfileSchema } from '../../utils/validation/accountSchemas.js'

// Local demo adapter. Account changes last for this tab's lifetime, including logout.
// Input validation belongs to authService.js; no browser storage is used.
let account = structuredClone(INITIAL_ADMIN_ACCOUNT)
let credential
let activeSession = false
let updating = false

export function getDemoAccount() { return structuredClone(account) }

// The default password is offered only until the user changes it.
export function getDemoLogin() {
  return { email: account.loginEmail, password: account.passwordChangedAt ? '' : DEMO_LOGIN.password }
}

async function derivePassword(password, salt) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  return new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256))
}

async function createCredential(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  return { salt, hash: await derivePassword(password, salt) }
}

async function matchesPassword(password) {
  if (!credential) credential = createCredential(DEMO_LOGIN.password)
  const saved = await credential
  const hash = await derivePassword(password, saved.salt)
  return hash.every((byte, index) => byte === saved.hash[index])
}

function requireSession() {
  if (!activeSession) throw new Error('Sign in before changing this account.')
}

export async function signIn(values) {
  const { email, password } = loginSchema.parse(values)
  if (email.toLowerCase() !== account.loginEmail || !await matchesPassword(password))
    throw new Error('Email or password is incorrect. Use the current demo account credentials.')
  activeSession = true
  return { account: getDemoAccount(), signedInAt: new Date().toISOString() }
}

export async function signOut() { activeSession = false }

export async function saveAdminProfile(values) {
  requireSession()
  const profile = adminProfileSchema.parse(values)
  account = adminAccountSchema.parse({ ...account, profile: {
    ...profile, fullName: profile.fullName.replace(/\s+/g, ' '), contactEmail: profile.contactEmail.toLowerCase(),
  } })
  return getDemoAccount()
}

export async function saveAccountSecurity({ email: loginEmail, currentPassword, newPassword }) {
  requireSession()
  if (updating) throw new Error('Account changes are already being saved.')
  const email = loginEmail.toLowerCase()
  if (email === account.loginEmail && !newPassword) throw new Error('Change your sign-in email or enter a new password before saving.')
  updating = true
  try {
    if (!await matchesPassword(currentPassword)) {
      const error = new Error('Your current password is incorrect.')
      error.field = 'currentPassword'
      throw error
    }
    const nextCredential = newPassword ? await createCredential(newPassword) : credential
    requireSession()
    const next = adminAccountSchema.parse({ ...account, loginEmail: email,
      passwordChangedAt: newPassword ? new Date().toISOString() : account.passwordChangedAt })
    credential = nextCredential
    account = next
    return getDemoAccount()
  } finally { updating = false }
}
