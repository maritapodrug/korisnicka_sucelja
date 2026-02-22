import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { Navigation } from "@components/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
interface BlogPostProps {
  params: { id: string };
}

async function fetchPost(id: string) {
  const post = BLOG_POSTS.find((p) => p.id === Number(id));

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
}

function PostSkeleton() {
  return (
    <article className="w-3xl bg-transparent shadow-lg rounded-lg overflow-hidden p-6 animate-pulse">
      {/* Back link skeleton */}
      <Link
        href="/blog"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
      </Link>
      {/* Title skeleton */}
      <div className="h-10 w-2/3 bg-gray-200 rounded mb-4" />
      {/* Body skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-4 w-5/6 bg-gray-100 rounded" />
      </div>
    </article>
  );
}

async function PostContent({ id }: { id: string }) {
  const post = await fetchPost(id);
  const { title, body } = post;
  return (
    <article className="max-w-3xl bg-transparent shadow-lg rounded-lg overflow-hidden p-6">
      <Link
        href="/blog"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
      </Link>
      <h1 className="text-3xl md:text-4xl capitalize font-extrabold tracking-tight mb-4">
        {title}
      </h1>
      <p>{body}</p>
    </article>
  );
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { id } = await params;
  return (
    <main className="flex flex-col items-center p-20">
      <Navigation/>
      <Suspense fallback={<PostSkeleton />}>
        <PostContent id={id} />
      </Suspense>
    </main>
  );
}