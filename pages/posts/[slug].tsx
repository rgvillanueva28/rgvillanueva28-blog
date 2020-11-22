import Head from "next/head";
import remark from "remark";
import html from "remark-html";
import { motion } from "framer-motion";
import Layout from "../../components/layout";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Hero from "../../components/hero";

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
export interface postsProps {
  post: Array<any>;
  contentHtml: string;
  categories: Array<any> | undefined;
  useHighlightAll: any;
}

export default function Posts({
  post,
  contentHtml,
  categories,
  useHighlightAll,
}: postsProps) {
  const router = useRouter();
  const fallbackQuery: any = router.query.slug?.toString().toUpperCase();

  useHighlightAll();

  if (router.isFallback) {
    return (
      <Layout categories={categories}>
        <Hero title="Loading" content={".........."} />
      </Layout>
    );
  }

  if (!post || contentHtml === "error") {
    return <DefaultErrorPage statusCode={404} />;
  }

  const dateCreated = new Date(post[0].date);
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(dateCreated);

  return (
    <Layout categories={categories}>
      <Head>
        <title>{post[0].title} - RANE GILLIAN</title>
      </Head>
      <Hero title={post[0].title} date={date} categories={post[0].categories} />

      <motion.div
        key={post[0].slug}
        className="relative py-5 container z-20 md:pt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3, type: "tween" }}
      >
        {/* <div
          style={{ minHeight: "50vh" }}
          className="absolute top-0 z-0 min-w-full bg-gradient-to-b from-dark to-transparent rounded-2xl opacity-75"
        ></div> */}
        <main className="relative z-10 mb-20 container mx-auto w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 xxl:w-7/12">
          <img
            width={post[0].coverImage[0].url}
            height={post[0].coverImage[0].url}
            src={post[0].coverImage[0].url}
            alt={post[0].title + "cover image"}
            className="object-contain mx-auto mt-2 mb-5 md:my-10"
            style={{ maxHeight: 300 }}
          />
          <div className="flex flex-wrap text-justify text-dark">
            <div
              className="markdown container text-lg"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </main>
        {/* <div className="absolute z-20 min-w-full mx-auto bg-gradient-to-b  from-dark to-transparent rounded-lg"
         style={{ top: "80px", minHeight: "500px", maxHeight: "500px" }}
        ></div> */}
      </motion.div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let getPaths;
  process.env.NODE_ENV === "development"
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
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  let getPostContent;
  let content;
  let contentHtml = "error";
  process.env.NODE_ENV === "development"
    ? (getPostContent = await fetch(
        `https://rgvillanueva28-strapi.herokuapp.com/posts?slug_eq=${params.slug}`
      ))
    : (getPostContent = await fetch(
        `https://rgvillanueva28-strapi.herokuapp.com/posts?status_eq=published&slug_eq=${params.slug}`
      ));

  const post = await getPostContent.json();

  if (post.length > 0) {
    content = await remark().use(html).process(post[0].content);
    contentHtml = content
      .toString()
      .replace(/a\shref/g, 'a target="_blank" href');
  }

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
};
