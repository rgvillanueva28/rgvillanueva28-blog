import Link from "next/link";

interface CategoryProps {
  text?: any;
  link?: string | null;
  slug?: string | null;
}

export default function Category({ text, slug, link }: CategoryProps) {
  return text ? (
    <span className="inline-block uppercase text-xs rounded-md bg-accent-light px-2 py-1 mr-1 mb-2 text-dark">
      {text}
    </span>
  ) : link ? (
    <Link href={`/categories/${slug?.toLowerCase()}`}>
      <a>
        <span className="inline-block uppercase text-xs rounded-md bg-accent-light px-2 py-1 mr-1 mb-2 text-dark">
          {link}
        </span>
      </a>
    </Link>
  ) : null;
}
