import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { extendTheme } from "@chakra-ui/react";
import React,{ useContext } from 'react';
import { getCategoryCount } from '../../lib/posts';

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
  const categorysCount = getCategoryCount();
  const MicroCMSProvider = React.createContext(categorysCount);
  return (
    <ThemeProvider theme={muiTheme}>
      <ChakraProvider theme={chakraTheme}>
      <MicroCMSProvider.Provider value={categorysCount}>
        <Component {...pageProps} />
      </MicroCMSProvider.Provider>
      </ChakraProvider>
    </ThemeProvider>
  )
}

export default MyApp
