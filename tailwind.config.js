const { plugin } = require('twrnc')

const caclulateNewChannel = (target, overlay, alpha) =>
  Math.floor(alpha * overlay + (1 - alpha) * target)

const hext2rgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

const overlayColor = (target, overlay, alpha) => {
  const [r, g, b] = hext2rgb(target)
  const [r2, g2, b2] = hext2rgb(overlay)
  const r3 = caclulateNewChannel(r, r2, alpha)
  const g3 = caclulateNewChannel(g, g2, alpha)
  const b3 = caclulateNewChannel(b, b2, alpha)
  return `#${r3.toString(16)}${g3.toString(16)}${b3.toString(16)}`
}

module.exports = {
  mode: 'jit',
  // content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extends: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#715c00',
      'on-primary': '#ffffff',
      'primary-container': '#ffe16c',
      'on-primary-container': '#231b00',
      secondary: '#675e40',
      'on-secondary': '#ffffff',
      'secondary-container': '#f0e2bc',
      'on-secondary-container': '#211b04',
      tertiary: '#45664d',
      'on-tertiary': '#ffffff',
      'tertiary-container': '#c6eccc',
      'on-tertiary-container': '#00210d',
      error: '#ba1b1b',
      'on-error': '#ffffff',
      'error-container': '#ffdad4',
      'on-error-container': '#410001',
      outline: '#7d7767',
      background: '#fffbf7',
      'on-background': '#1d1b16',
      surface: '#fffbf7',
      'surface-1': overlayColor('#fffbf7', '#715c00', 0.05),
      'surface-2': overlayColor('#fffbf7', '#715c00', 0.08),
      'surface-3': overlayColor('#fffbf7', '#715c00', 0.11),
      'surface-4': overlayColor('#fffbf7', '#715c00', 0.12),
      'surface-5': overlayColor('#fffbf7', '#715c00', 0.14),
      'on-surface': '#1d1b16',
      'surface-variant': '#ebe2d0',
      'on-surface-variant': '#4b4639',
      'inverse-surface': '#33302a',
      'inverse-on-surface': '#f6f0e7',
      black: '#000000',
    },
    spacing: {
      0: 0,
      4: 4,
      8: 8,
      12: 12,
      16: 16,
      20: 20,
      24: 24,
      32: 32,
    },
    borderRadius: {
      0: 0,
      4: 4,
      8: 8,
      12: 12,
      16: 16,
      20: 20,
      24: 24,
      32: 32,
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        btn: {
          padding: 3,
          borderRadius: 10,
          textTranform: `uppercase`,
          backgroundColor: `#333`,
        },
        'tp-headline-medium': {
          fontSize: 28,
          lineHeight: 36,
          letterSpacing: 0,
          fontWeight: '400',
        },
        'tp-headline-small': {
          fontSize: 24,
          lineHeight: 32,
          letterSpacing: 0,
          fontWeight: '400',
        },
        'tp-title-large': {
          fontSize: 22,
          lineHeight: 28,
          letterSpacing: 0,
          fontWeight: '500',
        },
        'tp-title-medium': {
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: 0.15,
          fontWeight: '500',
        },
        'tp-title-small': {
          fontSize: 14,
          lineHeight: 20,
          letterSpacing: 0.1,
          fontWeight: '500',
        },
        'tp-label-large': {
          fontSize: 14,
          lineHeight: 20,
          letterSpacing: 0.1,
          fontWeight: '500',
        },
        'tp-label-medium': {
          fontSize: 12,
          lineHeight: 16,
          letterSpacing: 0.5,
          fontWeight: '500',
        },
        'tp-label-small': {
          fontSize: 11,
          lineHeight: 16,
          letterSpacing: 0.5,
          fontWeight: '500',
        },
        'tp-body-large': {
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: 0.15,
          fontWeight: '400',
        },
        'tp-body-medium': {
          fontSize: 14,
          lineHeight: 20,
          letterSpacing: 0.25,
          fontWeight: '400',
        },
        'tp-body-small': {
          fontSize: 12,
          lineHeight: 16,
          letterSpacing: 0.4,
          fontWeight: '400',
        },
      })
    }),
  ],
}
