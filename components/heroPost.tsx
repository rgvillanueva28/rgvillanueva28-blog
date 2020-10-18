import Category from "./category";

interface HeroPostProps {
  title: string;
  date: string;
  categories: Array<any>;
}

export default function HeroPost({ title, date, categories }: HeroPostProps) {
  return (
    <div className="bg-gradient-to-b from-accent-dark to-dark">
      <div className="text-center pt-16 mx-5 pb-8">
        <h1 className=" text-accent-light text-3xl md:text-4xl">{title}</h1>
        <p className="text-accent-dark mb-5">{date}</p>
        {categories.map((category) => (
          <Category link={category.category} />
        ))}
      </div>
    </div>
  );
}