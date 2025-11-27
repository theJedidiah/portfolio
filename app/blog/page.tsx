import Link from "next/link";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Sort posts by date just in case Notion didn't
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <main className="min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Blog
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Thoughts on software, design, and product engineering.
          </p>
        </div>

        {/* Post List */}
        <div className="grid gap-8">
          {sortedPosts.length === 0 ? (
            <p className="text-zinc-500 italic">No posts found. Check back soon!</p>
          ) : (
            sortedPosts.map((post) => (
              <article key={post.id} className="group relative flex flex-col items-start">
                <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                  <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                    <span className="relative z-10">{post.title}</span>
                  </Link>
                </h2>
                
                {/* Date & Tags */}
                <div className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                  <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  </span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.tags && post.tags.length > 0 && (
                     <>
                       <span className="mx-2">–</span>
                       <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                         {post.tags.join(", ")}
                       </span>
                     </>
                  )}
                </div>

                {/* Summary */}
                <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {post.description}
                </p>
                
                <div aria-hidden="true" className="relative z-10 mt-4 flex items-center text-sm font-medium text-coffee-600 dark:text-coffee-400">
                  Read article
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-1 h-4 w-4 stroke-current">
                    <path d="M6.75 5.75 9.25 8l-2.5 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}