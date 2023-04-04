import styled from "styled-components";
import BrokenPopup from "../components/BrokenPopup";
import HeroMain from "../components/HeroMain";
import { Center } from "../components/Layout";
import Projects from "../components/Projects";
import { VStack } from "../components/UI/Stack";
import Head from "next/head";

const Home = () => (
  <>
    <Head>
      <title>Artur Bień</title>
      <meta
        name="google-site-verification"
        content="77WkCNrItg2AyQU1WYDoD06BaXWBmCIjjzzvZzLwnVw"
      />

      <meta property="og:type" content="website" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="675" />

      {/* <meta name="description" content={frontMatter.abstract} /> */}
      <meta name="og:title" content={"Artur Bień"} />
      <meta
        name="og:description"
        content={"Building user interfaces for fun."}
      />
      {/* <meta name="og:image" content={frontMatter.heroImg} /> */}
      {/* <meta name="og:image:alt" content={frontMatter.heroImg} /> */}

      <meta name="twitter:title" content={"Artur Bień"} />
      <meta
        name="twitter:description"
        content={"Building user interfaces for fun."}
      />
      {/* <meta name="twitter:image" content={frontMatter.heroImg} /> */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@artur_bien" />
    </Head>
    <Center>
      <HeroMain />
      {/* <Projects /> */}
    </Center>
    {/* <BrokenPopup /> */}
  </>
);
export default Home;
