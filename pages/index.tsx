import Head from "next/head";
import PostCardDiv from "../components/postCardDiv";
import PostCard from "../components/postCard";
import Header from "../components/header";
import Layout from "../components/layout";
import { motion } from "framer-motion";

export interface indexProps {
  posts: Array<any> | undefined;
}

export default function Home({ posts }: indexProps) {
  return (
    <Layout>
      <div className="container">
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
