import "../styles/index.css";
import "../styles/progressBar.css";
import "prismjs/themes/prism-okaidia.css";

import type { AppProps } from "next/app";

import Router from "next/router";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
