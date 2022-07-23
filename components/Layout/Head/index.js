import React from "react";
import Head from "next/head";

function HeadTag() {
  return (
    <Head>
      <title>TinDOTA</title>
      <meta name="description" content="Dota Balancer" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="icon" href="/assets/images/logo.png" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
  );
}

export default HeadTag;
