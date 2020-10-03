import Link from "next/link";

function PostCard({ image, title, content, date, slug }) {
  return (
    <div className="transition-all duration-150 flex flex-wrap w-full px-4 py-6 md:w-1/2 lg:w-1/3">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a>
          <div className="flex flex-col items-stretch min-h-full pb-2 transition-all duration-150 bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="">
              <img
                src={image}
                alt="postCover"
                className="object-cover w-full h-full rounded-lg rounded-b-none md:h-48 lg:h-32 xl:h-40"
              ></img>
            </div>
            <div className="px-4 py-2 text-accent-mid h-full">
              <h5 className="font-medium ">{title}</h5>
              <p className="">{content}</p>
            </div>
            <p className="font-light px-4 text-sm text-gray-600 align-text-bottom">{date}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default PostCard;
