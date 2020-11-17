import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LayoutComponent(props: any) {
  let listener: any;
  const [onTop, setOnTop] = useState(true);
  const [isLarge, setIsLarge] = useState(
    global.innerWidth >= 1024 ? true : false
  );

  useEffect(() => {
    listener = document.addEventListener("scroll", (e) => {
      var scrolled: any = document.scrollingElement?.scrollTop;
      if (scrolled >= 60) {
        setOnTop(false);
      } else {
        setOnTop(true);
      }
    });

    global.addEventListener("resize", (e) => {
      global.innerWidth >= 1024 ? setIsLarge(true) : setIsLarge(false);
    });

    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [onTop, isLarge]);

  return (
    <>
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
      <Header onTop={onTop} isLarge={isLarge} categories={props.categories} />
      <AnimatePresence>
        <div className="min-h-screen relative flex flex-col">
          <motion.div
          className={"flex flex-col flex-1 " + props.className}
          animate={{
            transition: {
              delayChildren: 0.5,
              staggerChildren: 0.1,
            },
          }}
        >
          {props.children}
        </motion.div>
      <Footer />
        </div>
        
      </AnimatePresence>

    </>
  );
}
