import { css } from '~/stitches.config'

const text = css({
  boxSizing: 'border-box',
  fontFamily: '$default',
  lineHeight: '1.4em',
  margin: 0,

  variants: {
    type: {
      heading: {
        letterSpacing: '-0.02em',
      },
      body: {
        letterSpacing: 0,
      },
    },
    size: {
      1: {
        fontSize: '12px',
      },
      2: {
        fontSize: '13px',
      },
      3: {
        fontSize: '16px',
      },
      4: {
        fontSize: '20px',
      },
      5: {
        fontSize: '24px',
      },
      6: {
        fontSize: '32px',
      },
      7: {
        fontSize: '48px',
      },
      8: {
        fontSize: '64px',
      },
      9: {
        fontSize: '72px',
      },
    },
    weight: {
      bold: {
        fontStyle: 'normal',
        fontWeight: '600',
      },
      normal: {
        fontStyle: 'normal',
        fontWeight: '400',
      },
      medium: {
        fontStyle: 'normal',
        fontWeight: '500',
      },
    },
  },

  defaultVariants: {
    size: 3,
    weight: 'medium',
    type: 'body',
  },
})

export default text
