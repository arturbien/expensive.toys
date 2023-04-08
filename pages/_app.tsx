import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { styleReset, createScrollbars } from "react95";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TextFiltersProvider } from "../components/UI/Typography";
import Script from "next/script";
import { useRouter } from "next/router";
import React from "react";
import * as ga from "../lib/ga";
import { Analytics } from "@vercel/analytics/react";
import { NextPage } from "next";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  html, body, body > * { 
    min-height: 100vh;
    background: ${(p) => p.theme.material};
  }
  body {
    font-family: 'ms_sans_serif';
    -webkit-font-smoothing: antialiased;
    background: #cfcfcf;
    overflow-y: auto;
  }
  * {
    box-sizing: border-box;
    ${createScrollbars()}
  }

`;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <Navbar />
        {page}
        <Footer />
      </>
    ));

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ga.GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${ga.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
            `,
        }}
      />
      <Analytics />

      <ThemeProvider theme={original}>
        <GlobalStyles />
        <TextFiltersProvider />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}
