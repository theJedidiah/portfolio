import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getBlogPost } from "@/lib/notion";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60; // Check for updates every 60s

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Generate Metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Jedidiah`,
    description: post.description,
  };
}

// 2. The Page Component
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-16 px-6">
      <article className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Post Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Post Content - The Markdown Renderer */}
        <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              // Headings
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-12 mb-6 text-zinc-900 dark:text-zinc-100" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-10 mb-4 text-zinc-900 dark:text-zinc-100" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-8 mb-3 text-zinc-900 dark:text-zinc-100" {...props} />,
              
              // Paragraphs (The key to fixing the "Wall of Text")
              p: ({ node, ...props }) => <p className="mb-6 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props} />,
              
              // Lists
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-700 dark:text-zinc-300" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-zinc-700 dark:text-zinc-300" {...props} />,
              li: ({ node, ...props }) => <li className="pl-1" {...props} />,
              
              // Blockquotes
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic my-6 text-zinc-600 dark:text-zinc-400" {...props} />
              ),
              
              // Links
              a: ({ node, ...props }) => (
                <a {...props} className="text-teal-600 dark:text-teal-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer" />
              ),
              
              // Inline Code
              code: ({ node, ...props }) => (
                <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

      </article>
    </main>
  );
}