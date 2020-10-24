import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default function headerSidebar({
  categories,
  shown,
  setToggleCategories,
}: any) {
  const cats = categories.map((cat: any) => cat.category);
  return (
    <>
      <div
        className="transition-opacity duration-300 ease-in-out fixed w-full h-full bg-black bottom-0 left-0"
        style={{
          transform: shown ? "translateX(0)" : "translateX(100%)",
          opacity: shown ? 0.25 : 0,
        }}
        onClick={() => setToggleCategories(!shown)}
      ></div>
      <nav
        className={
          "transition-all duration-300 ease-in-out h-full bg-dark shadow-lg fixed top-0 right-0 w-64 max-w-xl "
        }
        style={{
          transform: shown ? "translateX(0)" : "translateX(100%)",
          zIndex: 200,
        }}
      >
        <ul>
          <li key="hide">
            <div
              className="flex py-2 px-4 hover:text-dark hover:bg-accent-light cursor-pointer text-accent-light "
              onClick={() => setToggleCategories(!shown)}
            >
              <FaAngleRight className="ml-auto h-6" />
            </div>
          </li>
          {cats.map((category: string) => (
            <li key={category}>
              <Link
                href={`/categories/${category}`}
                as={`/categories/${category}`}
              >
                <a className="flex py-2 px-4 hover:text-dark hover:bg-accent-light text-accent-light ">
                  {category}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
