import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

export default function postCardDiv({ children }: any) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-row flex-wrap mx-auto w-11/12 md:w-10/12 lg:w-9/12"
    >
      {children}
    </motion.div>
  );
}
