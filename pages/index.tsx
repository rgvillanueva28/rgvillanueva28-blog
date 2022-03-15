import PostCardDiv from "../components/postCardDiv";
import PostCard from "../components/postCard";
import Layout from "../components/layout";
import Hero from "../components/hero";
import { GetStaticProps } from "next";
import Head from "next/head";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export interface indexProps {
  posts: Array<any> | undefined;
  categories: any | undefined;
}

export default function Home({ posts, categories }: indexProps) {
  return (
    <>
      <Layout categories={categories} className="with-bg">
        <Head>
          <title>Rane Villanueva | Blog</title>
        </Head>
        <div>
          <Hero
            title="BLOG HOMEPAGE"
            content="A collection of blog posts crafted from the themes of technology,
          programming, and personal experiences."
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
                  categories={categories}
                />
              ))}
            </PostCardDiv>
          </main>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  let getPosts;
  process.env.NODE_ENV === "development"
    ? (getPosts = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/blog-posts?populate=%2A&sort[0]=updatedAt:desc&publicationState=preview`
      ))
    : (getPosts = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/blog-posts?populate=%2A&sort[0]=updatedAt:desc`
      ));

  let posts: any | undefined = await getPosts.json();
  posts = posts?.data;

  let getCats = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/categories?sort[0]=category`
  );
  let cats: any | undefined = await getCats.json();
  cats = cats?.data;
  let categories = cats?.map((cat: any) =>
    cat.attributes.category.toUpperCase()
  );

  return {
    props: {
      posts,
      categories,
    },
    revalidate: 60,
  };
};
