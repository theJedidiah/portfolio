import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// 1. Initialize the Client (We keep this for notion-to-md)
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  content?: string;
}

// 2. NEW: Fetch Blog Posts using standard "fetch" (Bypassing the broken library)
export async function getBlogPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    console.warn("Missing Notion Secrets");
    return [];
  }

  try {
    // We call the Notion API directly via URL
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Notion-Version": "2022-06-28", // Use the latest stable API version
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Published",
          checkbox: { equals: true },
        },
        sorts: [{ property: "Date", direction: "descending" }],
      }),
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      console.error("Notion API Error:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.results.map((post: any) => ({
      id: post.id,
      slug: post.properties.Slug?.rich_text[0]?.plain_text || "",
      title: post.properties.Name?.title[0]?.plain_text || "Untitled",
      description: post.properties.Summary?.rich_text[0]?.plain_text || "",
      publishedAt: post.properties.Date?.date?.start || new Date().toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tags: post.properties.Tags?.multi_select.map((tag: any) => tag.name) || [],
    }));

  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

// 3. Fetch Single Post (Keeps using the library for Markdown conversion)
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // We reuse the fetch method here too to be safe
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return null;

  // We only use the library for the content conversion part
  try {
    const mdblocks = await n2m.pageToMarkdown(post.id);
    const mdString = n2m.toMarkdownString(mdblocks);
    return { ...post, content: mdString.parent };
  } catch (e) {
    console.error("Error parsing markdown:", e);
    return { ...post, content: "Error loading content." };
  }
}