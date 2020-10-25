interface HeroProps {
  title: string;
  content: any;
}

export default function Hero({title, content}: HeroProps) {
  return (
    <div className="bg-gradient-to-b from-accent-dark to-dark">
      <div className="text-center py-16 mx-5">
        <h1 className=" text-accent-light text-3xl md:text-4xl">{title}</h1>
        <p className=" text-accent-mid">
          {content}
        </p>
      </div>
    </div>
  );
}
