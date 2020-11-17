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
    <div className="bg-gradient-to-b from-accent-dark to-dark">
      {title && content ? (
        <motion.div
          key={title}
          variants={animation}
          initial="initial"
          animate="animate"
          className="text-center py-16 mx-5"
        >
          <h1 className=" text-accent-light text-3xl md:text-4xl">{title}</h1>
          <p className=" text-accent-mid">{content}</p>
        </motion.div>
      ) : (
        <motion.div
          key={title}
          variants={animation}
          initial="initial"
          animate="animate"
          className="text-center pt-16 mx-5 pb-8"
        >
          <h1 className=" text-accent-light text-3xl md:text-4xl">{title}</h1>
          <p className="text-accent-dark mb-5">{date}</p>
          {categories?.map((category) => (
            <Category link={category.category} key={category.category} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
