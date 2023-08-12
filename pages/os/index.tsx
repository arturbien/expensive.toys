import React from "react";
import Head from "next/head";
import OS from "../../components/os";

const OS2095 = () => {
  return <OS />;
};

export default OS2095;

OS2095.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>2095 OS | Artur Bień</title>
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="675" />

        {/* <meta name="description" content={frontMatter.abstract} /> */}
        <meta name="og:title" content={"Ambilight Effect | Artur Bień"} />
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
      {page}
    </>
  );
};
