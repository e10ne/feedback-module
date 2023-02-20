import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/open-sans";
import "@fontsource/montserrat";

import theme from "../theme";
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Spectrum - Feedback module</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
