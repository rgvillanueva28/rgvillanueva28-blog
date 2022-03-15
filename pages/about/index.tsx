import Head from "next/head";
import Layout from "../../components/layout";
import Hero from "../../components/hero";
import { GetStaticProps } from "next";
import FooterLink from "../../components/footerLink";

import { motion } from "framer-motion";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export interface indexProps {
  categories: Array<any> | undefined;
}

export default function Home({ categories }: indexProps) {
  return (
    <Layout categories={categories} className="with-bg">
      <div>
        <Head>
          <title>ABOUT | RANE GILLIAN</title>
        </Head>

        <Hero
          title="ABOUT"
          content="A collection of blog posts crafted from the themes of technology,
          programming, and personal experiences."
        />

        <main className="relative my-5 container z-20">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.3,
              },
            }}
            className="flex flex-row flex-wrap mx-auto w-11/12 md:w-10/12 lg:w-9/12 "
          >
            <p className="text-justify">
              Hi there, I am Rane Villanueva and I am very pleased that you have
              visited my website.
              <br />I created this blog website as my way of learning frontend
              development particularly{" "}
              <FooterLink
                href="https://reactjs.org/"
                text="React"
                className="text-accent-dark"
              />
              . This blog is created using{" "}
              <FooterLink
                href="https://nextjs.org/"
                text="Next.JS"
                className="text-accent-dark"
              />{" "}
              and{" "}
              <FooterLink
                href="https://strapi.io/"
                text="Strapi"
                className="text-accent-dark"
              />
              . Next.JS is utilized for SSG and Strapi for the headless CMS.
            </p>
          </motion.div>
        </main>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
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
      categories,
    },
    revalidate: 60,
  };
};
