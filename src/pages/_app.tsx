import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff8e88',
    },
  },
});
function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  )
}

export default MyApp
