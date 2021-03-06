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
      grain: 'hsla(44, 27%, 92%, 1)',
      taupe: 'hsla(45, 17%, 32%, 1)',
      sand: 'hsla(39, 33%, 96%, 1)', // bg colour
      white: 'hsla(0, 0%, 100%, 1)',
      ruby: 'hsla(360, 56%, 42%, 1)',
      pink: 'hsla(312, 100%, 78%, 1)',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      display: ['degular-display', 'Inter', 'sans-serif'],
      heading: ['Manrope', 'sans-serif'],
    },
    fontSize: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '20px',
      5: '24px',
      6: '32px',
      7: '48px',
      8: '64px',
      9: '72px',
    },
    lineHeight: {
      reading: '1.6',
      normal: '1.4',
      headline: '1.1',
      'headline-display': '0.9',
    },
    extend: {},
  },
  variants: {
    transform: ['group-hover'],
  },
  plugins: [],
}
