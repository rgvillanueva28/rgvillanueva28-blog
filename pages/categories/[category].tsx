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
  categorySelected: any;
}

export default function Categories({
  posts,
  categories,
  query,
  categorySelected,
}: categoriesProps) {
  const router = useRouter();
  // const fallbackQuery: any = router.query.category?.toString().toLowerCase();
  // console.log(fallbackQuery)

  if (router.isFallback) {
    return (
      <AnimatePresence>
        <Layout categories={categories}>
          <Hero title="Loading" content={".........."} />
        </Layout>
      </AnimatePresence>
    );
  }

  // console.log(categorySelected);

  if (!categorySelected) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <Layout categories={categories} className="with-bg">
      <div>
        <Head>
          <title>Categories - Rane Villanueva | Blog</title>
          <meta
            name="description"
            content="A collection of blog posts crafted from the themes of technology, programming, and personal experiences."
          />
          <meta property="og:title" content="Rane Villanueva | Blog" />
          <meta
            property="og:description"
            content="A collection of blog posts crafted from the themes of technology, programming, and personal experiences."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blog.ranevillanueva.com/" />
          <meta
            property="og:image"
            content="https://blog.ranevillanueva.com/icon-512x512.png"
          />
        </Head>

        <Hero
          title="CATEGORY"
          content={<Category text={categorySelected.category} />}
        />

        <main className="relative my-5 container z-20">
          <PostCardDiv>
            {posts?.map((post) => (
              <PostCard
                key={post.attributes.slug}
                slug={post.attributes.slug}
                image={post.attributes.coverImage}
                title={post.attributes.title}
                content={post.attributes.excerpt}
                publishedAt={post.attributes.publishedAt}
                updatedAt={post.attributes.updatedAt}
                categories={post.attributes.categories.data}
              />
            ))}
          </PostCardDiv>
        </main>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let getPaths;
  process.env.NODE_ENV === "development"
    ? (getPaths = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/categories?sort[0]=category&publicationState=preview`
      ))
    : (getPaths = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/categories?sort[0]=category`
      ));
  let cats = await getPaths.json();
  cats = cats?.data;
  // console.log(cats);
  let categories = cats?.map((category: any) =>
    category.attributes.slug.toLowerCase()
  );

  return {
    paths: categories?.map((category: any) => {
      // console.log(category);
      return {
        params: {
          category,
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const query = params.category;

  let getPosts;
  process.env.NODE_ENV === "development"
    ? (getPosts = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/blog-posts?populate=%2A&filters[categories][slug][$in]=${query}&publicationState=preview`
      ))
    : (getPosts = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/blog-posts?populate=%2A&filters[categories][slug][$in]=${query}`
      ));
  let posts: any | undefined = await getPosts.json();
  posts = posts?.data;
  // console.log(posts)

  let getCats = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/categories?sort[0]=category`
  );
  let cats: any | undefined = await getCats.json();
  cats = cats?.data;
  let categories = cats?.map((cat: any) => cat.attributes);

  let categorySelected = categories.find((cat: any) => cat.slug === query);

  return {
    props: {
      posts,
      categories,
      query,
      categorySelected: categorySelected ? categorySelected : null,
    },
    revalidate: 60,
  };
};
