import Head from "next/head";

export interface seoInterface {
  title: string;
  excerpt: string;
  imageLink: string;
  slug: string;
}

function SeoComponent({ title, excerpt, imageLink, slug }: seoInterface) {
  return (
    <Head>
      <title>{title} - Rane Villanueva | Blog</title>
      <meta name="description" content={excerpt} />
      <meta
        property="og:title"
        content={`${title} - Rane Villanueva | Blog<`}
      />
      <meta property="og:description" content={excerpt} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageLink} />
      <meta
        property="og:url"
        content={`https://blog.ranevillanueva.com/posts/${slug}`}
      />
    </Head>
  );
}

export default SeoComponent;
