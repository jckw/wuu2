import { createStitches } from '@stitches/react'

import type * as Stitches from '@stitches/react'

export const stitches = createStitches({
  prefix: '',
  theme: {
    colors: {
      forest: 'hsla(136, 34%, 38%, 1)',
      forest50: 'hsla(136, 34%, 38%, 0.5)',
      mustard: 'hsla(41, 73%, 52%, 1)',
      mustard50: 'hsla(41, 73%, 52%, 0.5)',
      olive: 'hsla(58, 24%, 59%, 1)',
      olive50: 'hsla(58, 24%, 59%, 0.5)',
      rust: 'hsla(21, 45%, 52%, 1)',
      rust50: 'hsla(21, 45%, 52%, 0.5)',
      grey30: 'hsla(0, 0%, 30%, 1)',
      grey48: 'hsla(0, 0%, 48%, 1)',
    },
    fonts: {
      default:
        "Inter, -apple-system, 'Segoe UI', Helvetica Neue, Helvetica, Roboto, Arial, sans-serif, system-ui, 'Apple Color Emoji', 'Segoe UI Emoji'",
    },
  },
  utils: {
    p: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingLeft: value,
    }),
    px: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginLeft: value,
    }),
    mx: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),
    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),
  },
})

export const { css, styled, globalCss, theme, keyframes, getCssText } = stitches
