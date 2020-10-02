function PostCard() {
  return (
    <div className="transition-all duration-150 flex flex-wrap w-full px-4 py-6 md:w-1/2 lg:w-1/3 rounded bg-accent-light">
      <img
        src="../pics/laptop.jpg"
        alt="postCover"
        className="object-fill w-full rounded-lg rounded-b-none "
      ></img>
      <h5 className="font-medium">Blog Post Title</h5>
      <div className="max-">

      </div>
      <p className>
          This is the excerpts of the blog post.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Dignissimos nihil sunt laborum eos fugit assumenda tenetur
          perferendis reiciendis officiis quasi repellendus
          ab ea et accusantium exercitationem incidunt, non laboriosam asperiores.
      </p>
    </div>
  );
}

export default PostCard;
