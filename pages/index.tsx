import Head from "next/head";
import PostCardDiv from "../components/postCardDiv";
import PostCard from "../components/postCard";
import Layout from "../components/layout";
import Hero from "../components/hero";
import { GetStaticProps, GetStaticPaths  } from 'next'

export interface indexProps {
  posts: Array<any> | undefined;
  categories: Array<any> | undefined;
}

export default function Home({ posts, categories }: indexProps) {
  return (
    <Layout categories={categories} className="with-bg">
      <div >
        <Head>
          <title>RANE GILLIAN | BLOG</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Hero
          title="BLOG HOMEPAGE"
          content="A collection of blog posts crafted from the themes of technology,
          programming, and personal experiences."
        />

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

export const getStaticProps: GetStaticProps = async () => {
  let getPosts;
  process.env.NODE_ENV === "development"
    ? (getPosts = await fetch(
        "https://rgvillanueva28-strapi.herokuapp.com/posts?_sort=date:DESC"
      ))
    : (getPosts = await fetch(
        "https://rgvillanueva28-strapi.herokuapp.com/posts?status_eq=published&_sort=date:DESC"
      ));
  let posts: Array<any> | undefined = await getPosts.json();

  const getCats = await fetch(
    "https://rgvillanueva28-strapi.herokuapp.com/categories?_sort=category:ASC"
  );
  let cats: Array<any> | undefined = await getCats.json();
  let categories = cats?.map((cat) => cat.category.toUpperCase());

  return {
    props: {
      posts,
      categories,
    },
    revalidate: 60,
  };
}
