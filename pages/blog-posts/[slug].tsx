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

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface postsProps {
  post: Array<any>;
  contentHtml: string;
  categories: any | undefined;
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

  const publishedAt = post[0].attributes.publishedAt;
  const updatedAt = post[0].attributes.updatedAt;
  const datePublished = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(publishedAt));

  const dateUpdated = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(updatedAt));

  return (
    <Layout categories={categories}>
      <Head>
        <title>{post[0].attributes.title} - RANE GILLIAN</title>
      </Head>
      <Hero
        title={post[0].attributes.title}
        date={dateUpdated}
        categories={post[0].attributes.categories.data}
      />

      <motion.div
        key={post[0].attributes.slug}
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
            width={post[0].attributes.coverImage.data.attributes.width}
            height={post[0].attributes.coverImage.data.attributes.height}
            src={`${NEXT_PUBLIC_API_URL}${post[0].attributes.coverImage.data.attributes.url}`}
            alt={post[0].attributes.title + "cover image"}
            className="object-contain mx-auto mt-2 mb-5 md:my-10"
            style={{ maxHeight: 300 }}
          />
          <div className="flex flex-wrap text-justify text-dark">
            <div
              className="markdown container text-lg"
              dangerouslySetInnerHTML={{ __html: post[0].attributes.content }}
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
        `${NEXT_PUBLIC_API_URL}/api/blog-posts?populate=%2A&sort[0]=updatedAt&publicationState=preview`
      ))
    : (getPaths = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/blog-posts?populate=%2A&sort[0]=updatedAt`
      ));
  let posts = await getPaths.json();
  // console.log(posts)
  posts = posts?.data;
  return {
    paths: posts?.map((post: any) => ({
      params: {
        slug: post.attributes.slug,
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
        `${NEXT_PUBLIC_API_URL}/api/blog-posts?populate=%2A&filters[slug][$eq]=${params.slug}&publicationState=preview`
      ))
    : (getPostContent = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/blog-posts?populate=%2A&filters[slug][$eq]=${params.slug}`
      ));

  let post = await getPostContent.json();
  post = post.data;
  if (post.length > 0) {
    content = await remark().use(html).process(post[0].content);
    contentHtml = content
      .toString()
      .replace(/a\shref/g, 'a target="_blank" href');
  }

  let getCats = await fetch(`${NEXT_PUBLIC_API_URL}/api/categories?sort[0]=category`);
  let cats: any | undefined = await getCats.json();
  cats = cats?.data;
  let categories = cats?.map((cat: any) =>
    cat.attributes.category.toUpperCase()
  );

  return {
    props: {
      post,
      contentHtml,
      categories,
    },
    revalidate: 60,
  };
};
