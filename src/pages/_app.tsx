import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme/theme'

// Types
import type { AppProps } from 'next/app'

// Fonts
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/700.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
