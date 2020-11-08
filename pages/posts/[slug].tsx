import Head from "next/head";
import remark from "remark";
import html from "remark-html";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../../components/layout";
import { useEffect } from "react";

import HeroPost from "../../components/heroPost";

export interface postsProps {
  post: Array<any>;
  contentHtml: string;
  categories: Array<any>;
  useHighlightAll: any;
}

export default function Posts({
  post,
  contentHtml,
  categories,
  useHighlightAll,
}: postsProps) {
  useHighlightAll();

  const dateCreated = new Date(post[0].date);
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(dateCreated);

  return (
    <AnimatePresence>
      <Layout categories={categories}>
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
            <img
              src={post[0].coverImage[0].url}
              alt={post[0].title + "cover image"}
              className="object-fit mx-auto mb-10"
              style={{ maxHeight: 300 }}
            />
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
  let getPaths;
  process.env.DEV
    ? (getPaths = await fetch(
        "https://rgvillanueva28-strapi.herokuapp.com/posts"
      ))
    : (getPaths = await fetch(
        "https://rgvillanueva28-strapi.herokuapp.com/posts?status_eq=published"
      ));
  const posts = await getPaths.json();
  return {
    paths: posts.map((post: any) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  let getPostContent;
  process.env.DEV
    ? (getPostContent = await fetch(
        `https://rgvillanueva28-strapi.herokuapp.com/posts?slug_eq=${params.slug}`
      ))
    : (getPostContent = await fetch(
        `https://rgvillanueva28-strapi.herokuapp.com/posts?status_eq=published&slug_eq=${params.slug}`
      ));

  const post = await getPostContent.json();
  const content = await remark().use(html).process(post[0].content);
  const contentHtml = await content
    .toString()
    .replace(/a\shref/g, 'a target="_blank" href');

    const getCats = await fetch(
      "https://rgvillanueva28-strapi.herokuapp.com/categories?_sort=category:ASC"
    );
    let cats: Array<any> | undefined = await getCats.json();
    let categories = cats?.map((cat) => cat.category.toUpperCase());

  return {
    props: {
      post,
      contentHtml,
      categories,
    },
    revalidate: 60,
  };
}
