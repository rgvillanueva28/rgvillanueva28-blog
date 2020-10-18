interface CategoryProps {
    text: string
}

export default function Category({ text }: CategoryProps) {
    return (
        <span className="uppercase text-xs rounded-md bg-accent-light px-2 py-1 mr-1">
            {text}
        </span>
    )
}
