const paths = {
  settings: 'M9 2h6l1 3 2 1 3-1 2 4-2 2v2l2 2-2 4-3-1-2 1-1 3H9l-1-3-2-1-3 1-2-4 2-2v-2l-2-2 2-4 3 1 2-1 1-3M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  globe: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M2 12h20M12 2a18 18 0 0 1 0 20 18 18 0 0 1 0-20',
  folder: 'M3 7V4h6l2 3h10v3M3 7v13h16l3-10H7L3 20',
  'external-link': 'M14 3h7v7m0-7L10 14M10 3H3v18h18v-7',
  'bar-chart': 'M4 3v18h17M8 16v-5m5 5V7m5 9v-3',
  megaphone: 'M3 10v4h4l13 5V5L7 10H3m4 4 2 7h4l-2-5M20 9h2v6h-2',
  star: 'm12 2 3.1 6.3L22 9.3l-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2l-5-4.9 6.9-1L12 2',
  'alert-triangle': 'M10.3 3.9 1.8 18.5A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.5L13.7 3.9a2 2 0 0 0-3.4 0M12 9v4m0 4h.01',
  percent: 'M5 19 19 5M9 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0m12 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  calculator: 'M5 2h14v20H5V2m3 3h8v4H8V5m0 8h1m3 0h1m3 0h.01M8 17h1m3 0h1m3 0h.01',
  pie: 'M12 2v10h10A10 10 0 0 0 12 2m-3 1a10 10 0 1 0 12 12H9V3',
  print: 'M6 9V3h12v6M6 18H3V9h18v9h-3M6 14h12v8H6v-8m11-2h.01',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7m13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  'eye-off':
    'm3 3 18 18M10.6 5.1A12 12 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3 4M6.2 6.2A19 19 0 0 0 2 12s3.5 7 10 7a11 11 0 0 0 5.1-1.2M10 10a3 3 0 0 0 4 4',
  edit: 'm16 3 5 5M4 20l5-1L21 7a2 2 0 0 0-4-4L5 15l-1 5M12 21h9',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
  upload: 'M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5',
  image: 'M3 3h18v18H3V3m0 14 6-6 4 4 3-3 5 5M9 7h.01',
  key: 'M14 4a6 6 0 1 1-4 10l-7 7H1v-4l7-7a6 6 0 0 1 6-6m3 3h.01',
  'arrow-left': 'M20 12H4m6-6-6 6 6 6',
  filter: 'M3 5h18l-7 8v6l-4 2v-8L3 5',
  bolt: 'm13 2-9 12h7l-1 8 10-13h-7l1-7',
  home: 'm3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9',
  users:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  building:
    'M4 21V8h6m0 13V3h10v18M2 21h20M14 7h2m-2 4h2m-2 4h2M6 12h1m-1 4h1m7 5v-2h2v2',
  graduation: 'm2 9 10-5 10 5-10 5L2 9m4 2v6c4 3 8 3 12 0v-6m4-2v8',
  clock: 'M12 8v4l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  calendar:
    'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2',
  'calendar-check':
    'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m3 11 3 3 5-5',
  wallet:
    'M20 8V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v12H5a3 3 0 0 1-3-3V6m18 7h-5v4h5m-3-2h.01',
  award: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 12l-1 9 5-3 5 3-1-9',
  shield: 'M12 3 3 7v5c0 5 9 10 9 10s9-5 9-10V7l-9-4m0 5v5m0 3h.01',
  trend: 'm3 17 6-6 4 4 8-10m-6 0h6v6',
  search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12a2 2 0 0 0 4 0',
  chevron: 'm9 5 7 7-7 7',
  'chevron-down': 'm6 9 6 6 6-6',
  plus: 'M12 5v14M5 12h14',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  logout: 'M9 3H4v18h5m7-14 5 5-5 5M9 12h12',
  'check-circle': 'm8 12 3 3 5-6M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  timer: 'M9 2h6m-3 0v3m6 2 2-2m-8 5v4l2 1m6-2a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  'user-minus':
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m15-10h5M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  briefcase: 'M8 6V3h8v3M3 6h18v15H3V6m5 0v15m8-15v15',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  info: 'M12 11v6m0-10h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  file: 'M14 2H4v20h16V8l-6-6v6h6M8 13h8m-8 4h5',
  check: 'm5 12 4 4L19 6',
  mail: 'M3 5h18v14H3V5m0 0 9 8 9-8',
}

export default function Icon({ name, size = 20, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.info} />
    </svg>
  )
}
