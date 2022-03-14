import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../../components/layout";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";

import Hero from "../../components/hero";
import PostCard from "../../components/postCard";
import PostCardDiv from "../../components/postCardDiv";
import Category from "../../components/category";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface categoriesProps {
  posts: Array<any> | undefined;
  categories: Array<any> | undefined;
  query: string;
}

export default function Categories({
  posts,
  categories,
  query,
}: categoriesProps) {
  const router = useRouter();
  const fallbackQuery: any = router.query.category?.toString().toUpperCase();

  if (router.isFallback) {
    return (
      <AnimatePresence>
        <Layout categories={categories}>
          <Hero title="Loading" content={".........."} />
        </Layout>
      </AnimatePresence>
    );
  }

  if (!categories?.includes(fallbackQuery)) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <Layout categories={categories} className="with-bg">
      <div>
        <Head>
          <title>RANE GILLIAN | BLOG</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Hero title="CATEGORY" content={<Category text={query} />} />

        <main className="relative my-5 container z-20">
          <PostCardDiv>
            {posts?.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                image={post.coverImage[0]}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/categories/`);
  const response = await res.json();

  const paths = response.map((category: any) => ({
    params: { category: category.category.toLowerCase() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const query = params.category;

  let getPosts;
  process.env.NODE_ENV === "development"
    ? (getPosts = await fetch(
        `${NEXT_PUBLIC_API_URL}/blog-posts?categories.category_in=${query}&_sort=date:DESC`
      ))
    : (getPosts = await fetch(
        `${NEXT_PUBLIC_API_URL}/blog-posts?status_eq=published&categories.category_in=${query}&_sort=date:DESC`
      ));
  let posts: any | undefined = await getPosts.json();
  posts = posts?.data;

  const getCats = await fetch(`${NEXT_PUBLIC_API_URL}/categories?_sort=category:ASC`);
  let cats: Array<any> | undefined = await getCats.json();
  let categories = cats?.map((cat) => cat.category.toUpperCase());

  return {
    props: {
      posts,
      categories,
      query,
    },
    revalidate: 60,
  };
};
