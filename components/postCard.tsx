import Link from "next/link";
import { motion } from "framer-motion";
import Category from "./category";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export interface postCardProps {
  image: any;
  title: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  categories: Array<any>;
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function PostCard({
  image,
  title,
  content,
  publishedAt,
  updatedAt,
  slug,
  categories,
}: postCardProps) {
  const datePublished = new Date(publishedAt);
  const dateUpdated = new Date(updatedAt);
  image = image?.data.attributes;
  // console.log(image);
  // console.log(categories);
  return (
    <motion.div
      key={slug}
      variants={item}
      className="flex flex-wrap w-full px-6 py-6 md:w-1/2 lg:w-1/3"
    >
      <Link as={`/blog-posts/${slug}`} href="/blog-posts/[slug]">
        <a>
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
              stiffness: 150,
              duration: 0.2,
            }}
          >
            <img
              alt={title + " card image"}
              src={`${NEXT_PUBLIC_API_URL}${image?.url}`}
              width={image?.width}
              height={image?.height}
              className="object-cover w-full min-h-full"
            />
            <div className="px-4 py-2 text-dark h-full">
              {categories.map((category: any) => (
                <Category key={category} text={category} />
              ))}
              <h5 className="font-medium ">{title}</h5>
              <p className="">{content}</p>
            </div>
            <p className="font-light px-4 text-sm text-accent-dark mt-auto">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(dateUpdated)}
            </p>
          </motion.div>
        </a>
      </Link>
    </motion.div>
  );
}

export default PostCard;
