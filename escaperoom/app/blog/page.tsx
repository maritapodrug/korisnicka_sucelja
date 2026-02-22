import { loadBlogSearchParams } from "@/lib/blog-search-params";
import type { SearchParams } from "nuqs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Pagination } from "../_components/Pagination";
import { BlogFilters } from "./_components/BlogFilters";
import { notFound } from "next/navigation";
import { Navigation } from "@components/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";

export interface BlogPostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PAGE_SIZE = 4;

//
// USERS
//
async function fetchUsers() {
  return [
    { id: 1, name: "Admin" },
    { id: 2, name: "Game Master" },
    { id: 3, name: "Escape Designer" },
  ];
}

//
// COUNT POSTS (FILTERED)
//
async function getPostsCount(userId: number) {

  if (userId > 0) {

    return BLOG_POSTS.filter(
      post => post.userId === userId
    ).length;

  }

  return BLOG_POSTS.length;
}

//
// FETCH POSTS (FILTERED)
//
async function fetchPosts(
  page: number,
  pageSize: number,
  userId: number
): Promise<BlogPostProps[]> {

  const filtered =
    userId > 0
      ? BLOG_POSTS.filter(
          post => post.userId === userId
        )
      : BLOG_POSTS;

  const start = (page - 1) * pageSize;

  return filtered.slice(
    start,
    start + pageSize
  );
}

//
// POST CARD
//
function processPost(
  post: BlogPostProps,
  userName?: string
) {

  return (

    <li key={post.id} className="list-none">

      <Link
        href={`/blog/${post.id}`}
        className="
          group block glass rounded-2xl p-6
          border border-white/10
          hover:-translate-y-1 hover:shadow-xl
          hover:shadow-purple-900/30
          transition-all duration-300
        "
      >

        <div className="flex items-center gap-4">

          <div className="flex-1 min-w-0">

            <h3 className="font-bold tracking-wide text-lg text-white mb-1">
              {post.title}
            </h3>

            <p className="text-sm text-gray-400">
              Post #{post.id} by {userName}
            </p>

          </div>

          <ArrowRight className="text-purple-400 group-hover:translate-x-1 transition" />

        </div>

      </Link>

    </li>

  );
}

interface BlogPageSearchParams {
  searchParams: Promise<SearchParams>;
}

export default async function Page({

  searchParams,

}: BlogPageSearchParams) {

  //
  // GET PARAMS
  //
  const { page, userId } =
    await loadBlogSearchParams(searchParams);

  //
  // FIX USER ID
  //
  const numericUserId =
    Number(userId) || 0;

  //
  // FETCH DATA
  //
  const [users, totalPosts] =
    await Promise.all([

      fetchUsers(),

      getPostsCount(
        numericUserId
      ),

    ]);

  //
  // TOTAL PAGES
  //
  const totalPages =
    Math.max(
      1,
      Math.ceil(
        totalPosts / PAGE_SIZE
      )
    );

  //
  // INVALID PAGE
  //
  if (page > totalPages)
    notFound();

  //
  // POSTS
  //
  const posts =
    await fetchPosts(
      page,
      PAGE_SIZE,
      numericUserId
    );

  //
  // USER MAP
  //
  const userMap =
    new Map(
      users.map(
        user =>
          [
            user.id,
            user.name
          ]
      )
    );

  return (

    <main className="pt-20 bg-gradient-to-b from-[#120018] to-[#05000a] min-h-screen">

      <Navigation />

      <div className="container mx-auto px-4 py-12">

        <div className="max-w-4xl mx-auto">

          {/* HEADER */}

          <div className="text-center mb-12">

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-[0.3em] mb-6">

              BLOG

            </h1>

            <p className="text-gray-400 max-w-xl mx-auto">

              Stories, updates and behind-the-scenes from our escape rooms

            </p>

          </div>

          {/* FILTER */}

          <BlogFilters
            users={users}
            currentUserId={numericUserId}
          />

          {/* POSTS */}

          <div className="space-y-4">

            <ul className="space-y-3">

              {posts.map(

                post =>
                  processPost(
                    post,
                    userMap.get(
                      post.userId
                    )

                  )

              )}

            </ul>

          </div>

          {/* PAGINATION */}

          <div className="flex justify-center mt-8">

            <Pagination
              currentPage={page}
              totalPages={totalPages}
            />

          </div>

        </div>

      </div>

    </main>

  );

}