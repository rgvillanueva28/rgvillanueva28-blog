import Head from "next/head";
import remark from "remark";
import html from "remark-html";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../../components/layout";
import { useEffect } from "react";

import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";

import HeroPost from "../../components/heroPost";

export interface postsProps {
  post: Array<any>;
  contentHtml: string;
}

export default function Home({ post, contentHtml }: postsProps) {
  const dateCreated = new Date(post[0].date);
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(dateCreated);

  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }, []);

  return (
    <AnimatePresence>
      <Layout>
        <HeroPost
          title={post[0].title}
          date={date}
          categories={post[0].categories}
        />
        <motion.div
          key={post[0].slug}
          className="container py-5 md:py-10 lg:py-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 300 }}
          exit={{ opacity: 0, y: 200 }}
        >
          <Head>
            <title>{post[0].title} - RANE GILLIAN</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="container mx-auto w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 xxl:w-7/12">
            {/* <h2 className="text-center">{post[0].title}</h2> */}
            {/* <p>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(dateCreated)}
            </p> */}
            {/* <div className="w-full my-4">
              <img
                src={post[0].coverImage[0].url}
                alt={post[0].title + "cover"}
                className="object-cover w-full h-40 lg:h-48 xl:h-56 "
              ></img>
            </div> */}
            <div className="flex flex-wrap text-justify text-dark">
              <div
                className="markdown container text-lg"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          </main>
        </motion.div>
      </Layout>
    </AnimatePresence>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://rgvillanueva28-strapi.herokuapp.com/posts/");
  const posts = await res.json();
  return {
    paths: posts.map((post: any) => ({
      params: {
        slug: post.slug,
      },
    })),

    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
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
