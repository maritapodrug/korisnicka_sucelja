"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Home", path: "/" },
  {
    title: "Rooms",
    path: "/rooms",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Book now",
    path: "/booknow",
  },
  {
    title: "Contact us",
    path: "/contact",
  },
  {
    title: "Login/Register", 
    path: "/login",
  },
  {
    title: "Account", //only if the user is logged in  
    path: "/account",
  },
];

function processPage(page: Page, index: number, currentPath?: string) {
  const isActive = currentPath === page.path;

  return (
    <li key={index}>
      <Link
        href={page.path}
        className={`
          px-4 py-2
          rounded-full
          text-lg
          transition-all duration-200
          ${
            isActive
              ? "font-extrabold text-black"
              : "text-gray-700 hover:bg-gray-200 hover:font-extrabold hover:shadow-sm"
          }
        `}
      >
        {page.title}
      </Link>
    </li>
  );
}
export function Navigation() {
  const currentPath = usePathname();

  return (
    <nav className="max-w-4xl mx-auto">
      <ul className="flex justify-center space-x-4 mb-4">
        {pages.map((page, index) =>
          processPage(page, index, currentPath)
        )}
      </ul>
    </nav>
  );
}
