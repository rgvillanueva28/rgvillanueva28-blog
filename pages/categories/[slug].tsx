import Head from "next/head";
import remark from "remark";
import html from "remark-html";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../../components/layout";
import { useEffect } from "react";

import HeroPost from "../../components/heroPost";
import Hero from "../../components/hero";
import PostCard from "../../components/postCard";
import PostCardDiv from "../../components/postCardDiv";
import Category from "../../components/category"

export interface categoriesProps {
  posts: Array<any> | undefined;

  cats: Array<any>;
  query: string;
}

export default function Categories({ posts, cats, query }: categoriesProps) {
  const categories = cats.map((cat) => cat.category);

  return (
    <AnimatePresence>
      <Layout categories={categories}>
        <div>
          <Head>
            <title>RANE GILLIAN | BLOG</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Hero title="CATEGORY" content={<Category text={query} />}/>

          <main className="py-16 container">
            <PostCardDiv>
              {posts?.map((post: any) => (
                <PostCard
                  key={post.slug}
                  slug={post.slug}
                  image={post.coverImage[0].url}
                  title={post.title}
                  content={post.excerpt}
                  date={post.date}
                  categories={post.categories}
                />
              ))}
              {posts?.map((post: any) => (
                <PostCard
                  key={post.slug}
                  slug={post.slug}
                  image={post.coverImage[0].url}
                  title={post.title}
                  content={post.excerpt}
                  date={post.date}
                  categories={post.categories}
                />
              ))}
            </PostCardDiv>
          </main>
        </div>
      </Layout>
    </AnimatePresence>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    "https://rgvillanueva28-strapi.herokuapp.com/categories/"
  );
  const response = await res.json();

  const paths = response.map((category: any) => ({
    params: { slug: category.category.toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
    const query = params.slug[0].toUpperCase() + params.slug.substring(1);
  const response = await fetch(
    `https://rgvillanueva28-strapi.herokuapp.com/posts?categories.category_in=${query}&_sort=date:DESC`
  );
  const response2 = await fetch(
    `https://rgvillanueva28-strapi.herokuapp.com/categories/`
  );
  const cats: Array<any> | undefined = await response2.json();
  const posts: Array<any> | undefined = await response.json();

  return {
    props: {
      posts,
      cats,
      query,
    },
  };
}
