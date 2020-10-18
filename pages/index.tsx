import Head from "next/head";
import PostCardDiv from "../components/postCardDiv";
import PostCard from "../components/postCard";
import Header from "../components/header";
import Layout from "../components/layout";
import Hero from "../components/hero";
import { motion } from "framer-motion";

export interface indexProps {
  posts: Array<any> | undefined;
}

export default function Home({ posts }: indexProps) {
  return (
    <Layout>
      <div>
        <Head>
          <title>RANE GILLIAN | BLOG</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Hero />

        <main className="p-16 container">
          <PostCardDiv>
            {posts?.map((post) => (
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
            {posts?.map((post) => (
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
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://rgvillanueva28-strapi.herokuapp.com/posts?_sort=date:DESC"
  );
  const posts: Array<any> | undefined = await response.json();
  return {
    props: {
      posts,
    },
  };
}
