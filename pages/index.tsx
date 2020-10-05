import Head from "next/head";
import PostCardDiv from "../components/postCardDiv"
import PostCard from "../components/postCard";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/header"
import Layout from "../components/layout"

export interface indexProps {
  posts: Array<any> | undefined;
}

export default function Home({ posts }: indexProps) {

  return (
    <AnimatePresence>
      <Layout>
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
            <h2 className="text-center text-dark">RANE GILLIAN BLOG</h2>
            <PostCardDiv>
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
            </PostCardDiv>
          </main>
        </motion.div>
      </Layout>

    </AnimatePresence>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://rgvillanueva28-strapi.herokuapp.com/posts");
  const posts: Array<any> | undefined = await response.json();
  return {
    props: {
      posts,
    },
  };
}