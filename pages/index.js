import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1 className="text-center">NEXT.JS with TailwindCSS</h1>
        <p className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          euismod tincidunt orci, vel commodo odio. Nunc ut lectus sed purus
          aliquam placerat. Donec odio arcu, feugiat non tristique feugiat,
          tristique et nunc. Suspendisse dignissim risus vitae tempor feugiat.
          Sed non mi purus. Nullam faucibus mauris id erat sodales ullamcorper.
          Vestibulum lacinia elit vel metus fermentum elementum. Aenean at est
          dignissim, fermentum orci a, blandit libero. Aliquam lobortis
          imperdiet ligula sed accumsan. Donec ultrices lectus in ornare luctus.
          Donec volutpat risus eleifend sagittis fringilla. Nunc velit arcu,
          dapibus sed sapien ut, condimentum luctus ligula. Quisque posuere mi
          neque, ut lacinia magna lobortis consectetur. Proin vestibulum sem
          tortor, interdum pulvinar risus facilisis eu. Aenean risus arcu,
          sagittis vel facilisis vel, sodales sit amet risus. Nulla id lectus
          vulputate, semper sapien ac, tempus eros.
        </p>
      </main>
    </div>
  );
}