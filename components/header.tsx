import { useState } from "react";
import Link from "next/link";

import { FaBars, FaCaretUp } from "react-icons/fa";

export default function Header(props: any) {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav
      id="header"
      className={
        "fixed w-full lg:px-16 px-6 lg:py-0 py-2 flex flex-wrap items-center " +
        (toggleMenu
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
          <h1 className="ranegillian text-2xl text-foreground">
            <strong>RANE</strong>GILLIAN
          </h1>
        </div>
      </div>

      <div
        className="transition duration-200 cursor-pointer lg:hidden  focus:outline-none hover:bg-accent-light border border-transparent hover:border-foreground rounded-md p-1 py-3 relative"
        style={{ minHeight: 42, minWidth: 42 }}
        onClick={() => setToggleMenu(!toggleMenu)}
        id="toggle-menu"
      >
        <div className="container">
          {toggleMenu ? (
            <div className="absolute" style={{ top: "4px" }}>
              <FaCaretUp style={props} color="#EEF4ED" size={32} />
            </div>
          ) : (
            <div className="absolute" style={{ top: "4px" }}>
              <FaBars style={props} color="#EEF4ED" size={32} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
