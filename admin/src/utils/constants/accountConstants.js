// Demo fixtures only. Real identity and access assignments come from the server.
export const DEMO_LOGIN = { email: 'admin@hadiya.gov.et', password: 'HRMS-demo-2026' }

export const INITIAL_ADMIN_ACCOUNT = {
  id: 'ADMIN-001', role: 'HR Manager', department: 'IT Department',
  profile: { fullName: 'Besufekad Ermias', contactEmail: DEMO_LOGIN.email, phoneNumber: '' },
  loginEmail: DEMO_LOGIN.email, passwordChangedAt: null,
}
