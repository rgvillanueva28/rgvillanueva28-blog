import Head from "next/head";
import PostCard from "../components/postCard";
import { AnimatePresence, motion } from "framer-motion";

export interface indexProps {
  posts: Array<any> | undefined;
}

export default function Home({ posts }: indexProps) {

  return (
    <AnimatePresence>
      <motion.div
        key="home"
        className="container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 300 }}
        exit={{ opacity: 0, y: 200 }}
      >
        <Head>
          <title>RANE GILLIAN | BLOG</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container">
          <h2 className="text-center">RANE GILLIAN BLOG</h2>
          <div className="flex flex-row flex-wrap mx-auto w-11/12 md:w-10/12 lg:w-9/12">
            {posts?.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                image={post.coverImage[0].formats.small.url}
                title={post.title}
                content={post.excerpt}
                date={post.date}
              />
            ))}
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://rgvillanueva28-strapi.herokuapp.com/posts");
  const posts: Array<any> | undefined  = await response.json();
  return {
    props: {
      posts,
    },
  };
}