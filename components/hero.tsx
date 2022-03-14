import Category from "./category";
import { motion } from "framer-motion";

const animation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  },
};

interface HeroProps {
  title: string;
  content?: any;
  date?: string;
  categories?: Array<any>;
}

export default function Hero({ title, content, date, categories }: HeroProps) {
  return (
    <div className="relative min-w-full">
      {title && content ? (
        <>
          <div
            style={{ minHeight: "50vh" }}
            className="absolute top-0 z-0 min-w-full bg-gradient-to-b from-dark to-transparent"
          ></div>
          <motion.div
            key={title}
            variants={animation}
            initial="initial"
            animate="animate"
            className="relative z-10 container px-10 text-center pt-20 pb-8 md:pb-16"
          >
            <h1 className=" text-accent-light text-3xl md:text-4xl font-semibold mt-10 md:mt-16 ">
              {title}
            </h1>
            <p className=" text-accent-mid">{content}</p>
          </motion.div>
        </>
      ) : (
        <>
          <div className="absolute top-0 z-0  min-h-screen min-w-full bg-gradient-to-b from-dark to-transparent"></div>
          <motion.div
            key={title}
            variants={animation}
            initial="initial"
            animate="animate"
            className="relative z-10  container px-10 text-center pt-20 pb-8 md:pb-16"
          >
            <h1 className=" text-accent-light text-3xl md:text-4xl mt-8 md:mt-16">
              {title}
            </h1>
            <p className="text-accent-mid m-5">{date}</p>
            {categories?.map((category) => (
              <Category link={category.attributes.category} slug={category.attributes.slug} key={category.attributes.slug} />
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
