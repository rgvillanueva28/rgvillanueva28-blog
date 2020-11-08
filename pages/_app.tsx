import "../styles/index.css";
import "../styles/progressBar.css";

import Prism from "prismjs";

import type { AppProps } from "next/app";

import Router from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function useHighlightAll() {
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }, []);
}

function MyApp({ Component, pageProps }: AppProps) {
  const newPageProps = { ...pageProps, useHighlightAll }

  return <Component { ...newPageProps } />;
}

export default MyApp;