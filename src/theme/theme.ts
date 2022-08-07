import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

const theme = extendTheme({
  // Theme config
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },

  // Font settings
  fonts: {
    heading: `'Open Sans', ${baseTheme.fonts.heading}`,
    body: `'Open Sans', ${baseTheme.fonts.body}`,
  },
})

export default theme
