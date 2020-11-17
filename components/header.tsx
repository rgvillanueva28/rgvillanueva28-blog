import { useState } from "react";
import Link from "next/link";
import { motion, useViewportScroll } from "framer-motion";

import { FaBars, FaCaretUp, FaCaretDown } from "react-icons/fa";
import HeaderSidebar from "./headerSidebar";

export default function Header(props: any) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleCategories, setToggleCategories] = useState(false);

  return (
    <motion.header
      id="header"
      className={
        "fixed w-full lg:px-16 px-6 lg:py-0 py-2 flex flex-wrap items-center transition duration-500 z-50  " +
        (props.isLarge
          ? props.onTop
            ? "bg-transparent text-accent-light"
            : "bg-dark text-foreground"
          : toggleMenu
          ? "bg-dark text-foreground"
          : props.onTop
          ? "bg-transparent text-accent-light"
          : "bg-dark text-foreground")
      }
    >
      <div className="flex-1 flex justify-between items-center">
        <Link href="/">
          <a className="fill-current">
            <img
              alt="Rane Gillian Blog Logo"
              className="bg-foreground rounded-full"
              src="/icon-32x32.png"
              width="32"
              height="32"
              // onClick={scrollToTop}
            />
          </a>
        </Link>
        <div className="m-0 mr-auto p-0 pl-1 my-auto">
          <h1 className="text-2xl">
            <strong>RANE</strong>GILLIAN
          </h1>
        </div>
      </div>

      <div
        className={
          "transition cursor-pointer lg:hidden focus:outline-none  border border-transparent rounded-md p-1 py-3 relative " +
          " hover:text-dark hover:border-accent-dark hover:bg-accent-light"
        }
        style={{ minHeight: 42, minWidth: 42 }}
        onClick={() => setToggleMenu(!toggleMenu)}
        id="toggle-menu"
      >
        <div className="container">
          {toggleMenu ? (
            <div className="absolute " style={{ top: "4px" }}>
              <FaCaretUp size={32} />
            </div>
          ) : (
            <div className="absolute " style={{ top: "4px" }}>
              <FaBars size={32} />
            </div>
          )}
        </div>
      </div>

      <motion.div
        className="lg:flex lg:items-center lg:w-auto w-full text-foreground lg:h-auto"
        animate={{ height: toggleMenu ? "auto" : 0 }}
        transition={{
          duration: 0.3,
          type: "tween",
        }}
        id="menu"
      >
        <nav className={toggleMenu ? "visible" : "invisible lg:visible"}>
          <ul className="lg:flex items-center justify-between text-base pt-4 lg:pt-0">
            <motion.li
              key="home"
              animate={{
                opacity: props.isLarge ? 1 : toggleMenu ? 1 : 0,
                y: props.isLarge ? 0 : toggleMenu ? 0 : -20,
              }}
              transition={{ duration: 0.3, type: "tween" }}
            >
              <Link href="/" as="/">
                <a
                  className={
                    "lg:py-4 py-3 px-5 block border-b-2 border-transparent " +
                    (props.isLarge
                      ? props.onTop
                        ? "text-accent-light hover:text-dark hover:border-dark hover:bg-accent-light"
                        : "text-foreground hover:text-dark hover:border-accent-dark hover:bg-accent-light"
                      : toggleMenu
                      ? "text-foreground hover:text-dark hover:border-accent-dark hover:bg-accent-light"
                      : props.onTop
                      ? "text-accent-light hover:text-dark hover:border-dark hover:bg-accent-light"
                      : "text-foreground hover:text-dark hover:border-accent-dark hover:bg-accent-light")
                  }
                  onClick={() => setToggleMenu(false)}
                >
                  Home
                </a>
              </Link>
            </motion.li>

            <motion.li
              className="cursor-pointer"
              key="categories"
              animate={{
                opacity: props.isLarge ? 1 : toggleMenu ? 1 : 0,
                y: props.isLarge ? 0 : toggleMenu ? 0 : -20,
              }}
              transition={{ duration: 0.3, type: "tween" }}
            >
              <a
                className={
                  "lg:py-4 py-3 px-5 flex border-b-2 border-transparent  " +
                  (props.isLarge
                    ? props.onTop
                      ? "text-accent-light hover:text-dark hover:border-dark hover:bg-accent-light"
                      : "text-foreground hover:text-dark hover:border-accent-dark hover:bg-accent-light"
                    : toggleMenu
                    ? "text-foreground hover:text-dark hover:border-accent-dark hover:bg-accent-light"
                    : props.onTop
                    ? "text-accent-light hover:text-dark hover:border-dark hover:bg-accent-light"
                    : "text-foreground hover:text-dark hover:border-accent-dark hover:bg-accent-light")
                }
                onClick={() => setToggleCategories(!toggleCategories)}
              >
                Categories&nbsp;
                <FaCaretDown className="mt-1" />
              </a>
            </motion.li>

            {/* Dropdown */}
            <HeaderSidebar categories={props.categories} shown={toggleCategories} setToggleCategories={setToggleCategories} setToggleMenu={setToggleMenu}/>

            <motion.li
              key="about"
              animate={{
                opacity: props.isLarge ? 1 : toggleMenu ? 1 : 0,
                y: props.isLarge ? 0 : toggleMenu ? 0 : -20,
              }}
              transition={{ duration: 0.3, type: "tween" }}
            >
              <Link href="/about" as="/about">
                <a
                  className={
                    "lg:py-4 py-3 px-5 block border-b-2 border-transparent " +
                    (props.isLarge
                      ? props.onTop
                        ? "text-accent-light hover:text-dark hover:border-dark hover:bg-accent-light"
                        : "text-foreground hover:text-dark hover:border-accent-dark hover:bg-accent-light"
                      : toggleMenu
                      ? "text-foreground hover:text-dark hover:border-accent-dark hover:bg-accent-light"
                      : props.onTop
                      ? "text-accent-light hover:text-dark hover:border-dark hover:bg-accent-light"
                      : "text-foreground hover:text-dark hover:border-accent-dark hover:bg-accent-light")
                  }
                  onClick={() => setToggleMenu(false)}
                >
                  About
                </a>
              </Link>
            </motion.li>
          </ul>
        </nav>
      </motion.div>
    </motion.header>
  );
}
