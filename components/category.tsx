import Link from "next/link"

interface CategoryProps {
    text?: string | null,
    link?: string | null
}

export default function Category({ text, link }: CategoryProps) {
    return (
        text ?
        <span className="inline-block uppercase text-xs rounded-md bg-accent-light px-2 py-1 mr-1 mb-2">
            {text}
        </span>
        :
        link ?
        <Link href={`/categories/${link.toLowerCase()}`}>
            <a>
                <span className="inline-block uppercase text-xs rounded-md bg-accent-light px-2 py-1 mr-1 mb-2">
                    {link}
                </span>
            </a>
        </Link>
        
        :
        null
    )
}