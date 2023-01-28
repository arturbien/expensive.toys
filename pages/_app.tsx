import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { styleReset, createScrollbars } from "react95";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TextFiltersProvider } from "../components/UI/Typography";

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
  html, body, body > * { min-height: 100vh;}
  body {
    font-family: 'ms_sans_serif';
    -webkit-font-smoothing: antialiased;
    background: #cfcfcf;
    background: ${(p) => p.theme.material};
    overflow-y: scroll;
  }
  * {
    box-sizing: border-box;
    ${createScrollbars()}
  }

`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <TextFiltersProvider />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
