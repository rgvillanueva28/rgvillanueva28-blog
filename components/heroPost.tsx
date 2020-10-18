import Category from "./category"

interface HeroPostProps {
  title: string;
  date: string;
  categories: Array<string>
}

export default function HeroPost({title, date, categories}: HeroPostProps) {
  return (
    <div className="bg-gradient-to-b from-accent-dark to-dark">
      <div className="text-center py-16 mx-5">
        <h1 className=" text-accent-light text-3xl md:text-4xl">{title}</h1>
        <p className=" text-accent-mid">
          {
            categories.map(category => {
              <Category text={category} />
            })
          }
        </p>
      </div>
    </div>
  );
}
