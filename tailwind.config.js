module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      black: 'hsla(0, 0%, 0%, 1)',
      pale: 'hsla(200, 1%, 60%, 1)',
      normal: 'hsla(0, 0%, 30%, 1)',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      display: ['degular-display', 'Inter', 'sans-serif'],
    },
    fontSize: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '20px',
      5: '24px',
      6: '32px',
      7: '48px',
    },
    lineHeight: {
      normal: '1.4',
      headline: '1.1',
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}
