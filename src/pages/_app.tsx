import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/open-sans";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

import theme from "../theme";
import { AppProps } from "next/app";
import Head from "next/head";
import { useMeQuery } from "../../graphql/generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../lib/createUrqlClient";

function MyApp({ Component, pageProps }: AppProps) {
  const [{ fetching, data }] = useMeQuery();
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Spectrum - Feedback module</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="/site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta
          name="msapplication-TileColor"
          content="#da532c"
        />
        <meta
          name="theme-color"
          content="#ffffff"
        />
      </Head>
      <Component
        {...pageProps}
        fetching={fetching}
        data={data}
      />
    </ChakraProvider>
  );
}

export default withUrqlClient(createUrqlClient)(MyApp);
