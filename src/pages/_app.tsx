import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react";
import usePageView from '../../lib/hooks/usePageView';
import GooglrAnalytics from '../../components/GooglrAnalytics';

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


function MyApp({ Component, pageProps }:AppProps) {
  usePageView();
  return (
      <ChakraProvider theme={chakraTheme}>
          <GooglrAnalytics />
          <Component {...pageProps} />
      </ChakraProvider>
  )
}

export default MyApp
