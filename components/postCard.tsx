import Link from "next/link";
import { motion, AnimateSharedLayout } from "framer-motion";
import Category from "./category";

export interface postCardProps {
  image: string;
  title: string;
  content: string;
  date: string;
  slug: string;
  categories: Array<any>;
}

function PostCard({
  image,
  title,
  content,
  date,
  slug,
  categories,
}: postCardProps) {
  const dateCreated = new Date(date);
  return (
    <div className="flex flex-wrap w-full px-6 py-6 md:w-1/2 lg:w-1/3">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a>
          <AnimateSharedLayout>
            <motion.div
              layout
              className="flex flex-col items-stretch min-h-full pb-2 bg-white shadow-lg overflow-hidden"
              initial={{ borderRadius: 10 }}
              whileHover={{
                scale: 1.05,
                borderRadius: 0,
              }}
              whileTap={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 200,
                duration: 0.25,
              }}
            >
              <div className="">
                <img
                  src={image}
                  alt="postCover"
                  className="object-cover w-full h-full"
                ></img>
              </div>
              <motion.div layout className="px-4 py-2 text-dark h-full">
                {categories.map((category: any) => (
                  <Category key={category.category} text={category.category} />
                ))}
                <h5 className="font-medium ">{title}</h5>
                <p className="">{content}</p>
              </motion.div>
              <p className="font-light px-4 text-sm text-accent-dark mt-auto">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(dateCreated)}
              </p>
            </motion.div>
          </AnimateSharedLayout>
        </a>
      </Link>
    </div>
  );
}

export default PostCard;
