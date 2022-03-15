import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="A collection of blog posts crafted from the themes of technology, programming, and personal experiences."
        />
        <meta name="theme-color" content="#5cdb95" />
        <link rel="apple-touch-icon" href="apple-icon-180x180.png"></link>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
