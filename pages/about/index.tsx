import Head from "next/head";
import Layout from "../../components/layout";
import Hero from "../../components/hero";
import PostCardDiv from "../../components/postCardDiv";
import { GetStaticProps } from "next";
import FooterLink from "../../components/footerLink";

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
          categories={undefined}
          date={undefined}
        />

        <main className="py-16 container">
          <PostCardDiv>
            <p className="text-justify">
              Hi there, I am Rane Villanueva and I am very pleased that you have
              visited my website.
              <br />
              I created this blog website as my way of
              learning frontend development particularly{" "}
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
          </PostCardDiv>
        </main>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const getCats = await fetch(
    "https://rgvillanueva28-strapi.herokuapp.com/categories?_sort=category:ASC"
  );
  let cats: Array<any> | undefined = await getCats.json();
  let categories = cats?.map((cat) => cat.category.toUpperCase());

  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
};
