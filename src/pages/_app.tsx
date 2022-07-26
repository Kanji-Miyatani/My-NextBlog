import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { extendTheme } from "@chakra-ui/react";

export const chakraTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "cray.50",
        color: "teal.900"
      }
    }
  }
});
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#ff8e88',
    },
  },
});

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      <ChakraProvider theme={chakraTheme}>
          <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  )
}

export default MyApp
