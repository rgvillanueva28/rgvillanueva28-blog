import Head from "next/head";
import remark from "remark";
import html from "remark-html";
import { AnimatePresence, motion } from "framer-motion";

export default function Home({ post, contentHtml }) {
  return (
    <AnimatePresence>
      <motion.div
        key={post[0].slug}
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
      >
        <Head>
          <title>RANE GILLIAN | {post[0].title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container">
          <h2 className="text-center">{post[0].title}</h2>
          <p>{post[0].date}</p>
          <div className="w-full">
            <img
              src={post[0].coverImage[0].formats.medium.url}
              alt={post[0].title + "cover"}
              className="h-full rounded-lg rounded-b-none md:h-48 lg:h-32 xl:h-40 mx-auto"
            ></img>
          </div>
          <div className="flex flex-wrap mx-auto w-11/12 md:w-10/12 lg:w-9/12">
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://rgvillanueva28-strapi.herokuapp.com/posts/");
  const posts = await res.json();
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),

    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://rgvillanueva28-strapi.herokuapp.com/posts?slug_eq=${params.slug}`
  );
  const post = await res.json();
  const content = await remark().use(html).process(post[0].content);
  const contentHtml = await content
    .toString()
    .replace(/a\shref/g, 'a target="_blank" href');

  return {
    props: {
      post,
      contentHtml,
    },
  };
}
