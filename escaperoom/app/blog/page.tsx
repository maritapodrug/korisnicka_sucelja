import { loadBlogSearchParams } from "@/lib/blog-search-params";
import type { SearchParams } from "nuqs/server";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Pagination } from "../_components/Pagination";
import { BlogFilters } from "./_components/BlogFilters";
import { notFound } from "next/navigation";
import { Navigation } from "@components/navigation"; 

export interface BlogPostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PAGE_SIZE = 6;
export const BASE_API_URL = "https://jsonplaceholder.typicode.com";

// Get the total number of posts; please note this feature is JSONPlaceholder API specific.
async function getPostsCount(userId?: number): Promise<number> {
  // https://jsonplaceholder.typicode.com/posts/?_start=5&_limit=8
  const url =
    userId && userId > 0
      ? `${BASE_API_URL}/posts/?userId=${userId}&_limit=1`
      : `${BASE_API_URL}/posts/?_limit=1`;
  const data = await fetch(url, {
    method: "HEAD",
    next: { revalidate: 60 },
  });
  const count = data.headers.get("x-total-count") || "1";
  return parseInt(count, 10);
}

// Fetch paginated posts
async function fetchPosts(
  page: number,
  pageSize: number,
  userId?: number
): Promise<BlogPostProps[]> {
  const start = (page - 1) * pageSize;
  const userQuery = userId && userId > 0 ? `&userId=${userId}` : "";
  const response = await fetch(
    `${BASE_API_URL}/posts?_start=${start}&_limit=${pageSize}${userQuery}`,
    { next: { revalidate: 60 } }
  );
  return response.json();
}

// Fetch users
async function fetchUsers(): Promise<{ id: number; name: string }[]> {
  const response = await fetch(`${BASE_API_URL}/users`, {
    next: { revalidate: 60 },
  });
  return response.json();
}

function processPost(post: BlogPostProps, userName?: string) {
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
          {/* Icon placeholder */}
          <div className="flex-shrink-0 w-10 h-10 rounded bg-gray-200 border border-gray-300"></div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold tracking-wide text-lg text-white mb-1">
              {post.title}
            </h3>
              <p className="text-sm text-gray-400">
              Post #{post.id} by {userName || `User ${post.userId}`}
            </p>
          </div>

          {/* Arrow */}
        <ArrowRight className="text-purple-400 group-hover:translate-x-1 transition" />
        </div>
      </Link>
    </li>
  );
}

interface BlogPageSearchParams {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: BlogPageSearchParams) {
  const { page, userId } = await loadBlogSearchParams(searchParams);
  console.log({ userId, page });
  // Not used, just for console logging
  const params = await searchParams;
  console.log("searchParams:", params);

  // Fetch users and total posts count in parallel
  const [users, totalPosts] = await Promise.all([
    fetchUsers(),
    getPostsCount(userId > 0 ? userId : undefined),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));
  if (page > totalPages) notFound();
  const posts = await fetchPosts(
    page,
    PAGE_SIZE,
    userId > 0 ? userId : undefined
  );

  // Create a map of userId to userName (post author name)
  // (if authors do not change frequently, this could be cached globally)
  const userMap = new Map(users.map((user) => [user.id, user.name]));

  return (
  <main className="pt-20 bg-gradient-to-b from-[#120018] to-[#05000a] min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-[0.3em] mb-6">
              BLOG
            </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
                Stories, updates and behind-the-scenes from our escape rooms
          </p>

          </div>
          {/* Filters */}
          <BlogFilters users={users} currentUserId={userId} />
          {/* Blog Posts Grid */}
          <div className="space-y-4">
            <ul className="space-y-3">
              {posts.map((post) => processPost(post, userMap.get(post.userId)))}
            </ul>
          </div>
          {/* Pagination */}
     <div className="flex justify-center mt-8">
      <Pagination currentPage={page} totalPages={totalPages} />
      </div>
        </div>
      </div>
    </main>
  );
}
