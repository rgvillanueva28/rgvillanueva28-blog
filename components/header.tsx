import { useState } from "react";
import Link from "next/link";
import { motion, useViewportScroll } from "framer-motion";

import { FaBars, FaCaretUp } from "react-icons/fa";
import pages from "./headerPages";

export default function Header(props: any) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { scrollYProgress } = useViewportScroll();

  return (
    <motion.header
      id="header"
      className={
        "fixed w-full lg:px-16 px-6 lg:py-0 py-2 flex flex-wrap items-center transition duration-300 z-50  " +
        (props.isLarge
          ? props.onTop
            ? "bg-transparent"
            : "bg-accent-dark"
          : toggleMenu
          ? "bg-accent-dark"
          : props.onTop
          ? "bg-transparent"
          : "bg-accent-dark")
      }
    >
      <div className="flex-1 flex justify-between items-center text-foreground">
        <Link href="/">
          <a className="fill-current">
            <img
              className="bg-foreground rounded-full"
              src="/logo.png"
              width="32"
              height="32"
              // onClick={scrollToTop}
            />
          </a>
        </Link>
        <div className="m-0 mr-auto p-0 pl-1 my-auto">
          <h1
            className={
              "transition duration-300 ranegillian text-2xl " +
              (toggleMenu
                ? "text-foreground"
                : props.onTop
                ? "text-dark"
                : "text-foreground")
            }
          >
            <strong>RANE</strong>GILLIAN
          </h1>
        </div>
      </div>

      <div
        className={
          "transition duration-300 cursor-pointer lg:hidden focus:outline-none  border border-transparent rounded-md p-1 py-3 relative " +
          (toggleMenu
            ? "text-foreground hover:text-dark hover:border-dark hover:bg-accent-light"
            : props.onTop
            ? "text-dark hover:text-foreground hover:border-foreground hover:bg-accent-dark"
            : "text-foreground hover:text-dark hover:border-dark hover:bg-accent-light")
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
            <div className="absolute" style={{ top: "4px" }}>
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
          staggerChildren: 0.3,
          delayChildren: 0.3,
        }}
        id="menu"
      >
        <nav className={toggleMenu ? "visible" : "invisible lg:visible"}>
          <ul className="lg:flex items-center justify-between text-base pt-4 lg:pt-0">
            {pages.map(({ label, id }) => (
              <li key={id}>
                <Link href={id} as={id}>
                  <a
                    className={
                      "lg:py-4 py-3 px-5 block border-b-2 border-transparent " +
                      (toggleMenu
                        ? "text-foreground hover:text-dark hover:border-dark hover:bg-accent-light"
                        : props.onTop
                        ? "text-dark hover:text-foreground hover:border-foreground hover:bg-accent-dark"
                        : "text-foreground hover:text-dark hover:border-dark hover:bg-accent-light")
                    }
                    onClick={() => setToggleMenu(false)}
                  >
                    {label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </motion.header>
  );
}
