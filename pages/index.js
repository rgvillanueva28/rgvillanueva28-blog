import Head from "next/head";
import PostCard from "../components/postCard";

export default function Home({ posts }) {
  const postsSample = [
    {
      image: "../pics/laptop.jpg",
      title: "Blog Post Title",
      content:
        "This is the excerpts of the blog post. Lorem ipsum dolor sit amet \
      consectetur, adipisicing elit. Dignissimos nihil sunt laborum eos \
      fugit assumenda tenetur perferendis reiciendis officiis quasi \
      repellendus ab ea et accusantium exercitationem incidunt, non \
      laboriosam asperiores.",
      date: "October 3, 2020",
    },
    {
      image: "https://picsum.photos/seed/random/600/400",
      title: "Blog Title 2",
      content:
        "Lorem ipsum dolor sit amet \
      consectetur, adipisicing elit. Dignissimos nihil sunt laborum eos \
      fugit assumenda tenetur perferendis reiciendis officiis quasi \
      repellendus ab ea et accusantium exercitationem incidunt, non \
      laboriosam asperiores.",
      date: "October 3, 2020",
    },
    {
      image: "https://picsum.photos/seed/rane/300/200",
      title: "Blog Title Post Number 4",
      content:
        "consectetur, adipisicing elit. Dignissimos nihil sunt laborum eos \
      repellendus ab ea et accusantium exercitationem incidunt, non \
      laboriosam asperiores.",
      date: "October 3, 2020",
    },
    {
      image: "https://picsum.photos/seed/idk/600/400",
      title: "Blog Title 3",
      content:
        "consectetur, adipisicing elit. Dignissimos nihil sunt laborum eos \
      fugit assumenda tenetur perferendis reiciendis officiis quasi \
      repellendus ab ea et accusantium exercitationem incidunt, non \
      laboriosam asperiores.",
      date: "October 3, 2020",
    },
    {
      image: "https://picsum.photos/seed/random/600/400",
      title: "Blog Title 2",
      content:
        "Lorem ipsum dolor sit amet \
      consectetur, adipisicing elit. Dignissimos nihil sunt laborum eos \
      fugit assumenda tenetur perferendis reiciendis officiis quasi \
      repellendus ab ea et accusantium exercitationem incidunt, non \
      laboriosam asperiores.",
      date: "October 3, 2020",
    },
    {
      image: "https://picsum.photos/seed/idk/600/400",
      title: "Blog Title 3",
      content:
        "consectetur, adipisicing elit. Dignissimos nihil sunt laborum eos \
      fugit assumenda tenetur perferendis reiciendis officiis quasi \
      repellendus ab ea et accusantium exercitationem incidunt, non \
      laboriosam asperiores.",
      date: "October 3, 2020",
    },
    {
      image: "https://picsum.photos/seed/idk/600/400",
      title: "Blog Title 3",
      content:
        "consectetur, adipisicing elit. Dignissimos nihil sunt laborum eos \
      fugit assumenda tenetur perferendis reiciendis officiis quasi \
      repellendus ab ea et accusantium exercitationem incidunt, non \
      laboriosam asperiores.",
      date: "October 3, 2020",
    },
  ];

  const apiUrl = "https://rgvillanueva28-strapi.herokuapp.com";

  return (
    <div className="container">
      <Head>
        <title>RANE GILLIAN | BLOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h2 className="text-center">RANE GILLIAN BLOG</h2>
        <div className="flex flex-row flex-wrap mx-auto w-11/12 md:w-10/12 lg:w-9/12">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              image={post.coverImage[0].formats.small.url}
              title={post.title}
              content={post.excerpt}
              date={post.date}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://rgvillanueva28-strapi.herokuapp.com/posts/");
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}