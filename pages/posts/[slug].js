import Head from "next/head";
import remark from "remark";
import html from "remark-html";

export default function Home({ post, contentHtml }) {
  return (
    <div className="container">
      <Head>
        <title>RANE GILLIAN | {post[0].title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h2 className="text-center">{post[0].title}</h2>
        <p>{post[0].date}</p>
        <div className="w-full">
          <img
            src={post[0].coverImage[0].formats.medium.url}
            alt={post[0].title + "cover"}
            className="h-full rounded-lg rounded-b-none md:h-48 lg:h-32 xl:h-40 mx-auto"
          ></img>
        </div>
        <div className="flex flex-wrap mx-auto w-11/12 md:w-10/12 lg:w-9/12">
          <div className="markdown" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://rgvillanueva28-strapi.herokuapp.com/posts/");
  const posts = await res.json();
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),

    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://rgvillanueva28-strapi.herokuapp.com/posts?slug_eq=${params.slug}`
  );
  const post = await res.json();
  const content = await remark().use(html).process(post[0].content);
  const contentHtml = await content.toString().replace("a href", "a target=\"_blank\" href")

  return {
    props: {
      post,
      contentHtml,
    },
  };
}