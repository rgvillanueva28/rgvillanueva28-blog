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
          <Hero
            title="Loading"
            content={".........."}
            categories={undefined}
            date={undefined}
          />
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

        <Hero
          title="CATEGORY"
          content={<Category text={query} />}
          categories={undefined}
          date={undefined}
        />

        <main className="py-16 container">
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
  const res = await fetch(
    "https://rgvillanueva28-strapi.herokuapp.com/categories/"
  );
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
        `https://rgvillanueva28-strapi.herokuapp.com/posts?categories.category_in=${query}&_sort=date:DESC`
      ))
    : (getPosts = await fetch(
        `https://rgvillanueva28-strapi.herokuapp.com/posts?status_eq=published&categories.category_in=${query}&_sort=date:DESC`
      ));
  const posts: Array<any> | undefined = await getPosts.json();

  const getCats = await fetch(
    "https://rgvillanueva28-strapi.herokuapp.com/categories?_sort=category:ASC"
  );
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
