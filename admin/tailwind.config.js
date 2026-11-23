// Keep the current admin theme; the login migration does not introduce new colors.
export default {
  theme: {
    extend: {
      colors: {
        page: 'var(--page-bg)',
        surface: 'var(--surface)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        border: 'var(--border)',
        'icon-bg': 'var(--icon-bg)',
      },
      boxShadow: {
        login: '0 8px 30px #092a3208',
      },
    },
  },
}
