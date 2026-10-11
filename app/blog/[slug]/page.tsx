import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/views/BlogPostView";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Zoenex Studios",
    };
  }

  const url = `https://zoenexstudios.in/blog/${post.slug}`;

  return {
    title: `${post.title} | Zoenex Studios`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | Zoenex Studios`,
      description: post.excerpt,
      url,
      type: "article",
      siteName: "Zoenex Studios",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zoenexstudios.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://zoenexstudios.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://zoenexstudios.in/blog/${post.slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: "Zoenex Studios",
      url: "https://zoenexstudios.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Zoenex Studios",
      logo: {
        "@type": "ImageObject",
        url: "https://zoenexstudios.in/icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zoenexstudios.in/blog/${post.slug}`,
    },
    datePublished: "2026-10-01T00:00:00+05:30",
    dateModified: "2026-10-05T00:00:00+05:30",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, articleSchema]),
        }}
      />
      <BlogPostView post={post} />
    </>
  );
}
