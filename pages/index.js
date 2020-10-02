import Head from "next/head";
import PostCard from "../components/postCard";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1 className="text-center">RANE GILLIAN BLOG</h1>
        <div className="flex flex-row flex-wrap">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </main>
    </div>
  );
}
