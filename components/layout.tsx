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
          content="Blog of Rane Gillian"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
      <Header onTop={onTop} isLarge={isLarge} categories={props.categories}/>
      <AnimatePresence>
        <motion.div
          className="min-h-screen"
          key="mainContainer"
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              opacity: 0,
              // y: -100,
            },
            pageAnimate: {
              opacity: 1,
              // y: 0,
              transition: {
                duration: 1,
                delay: 0.25,
                type: "spring",
                stiffness: 500,
              },
            },
            pageExit: {
              opacity: 0,
              // y: 100,
            },
          }}
        >
          {props.children}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}
