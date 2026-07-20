import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogArticleGrid from "@/components/BlogArticleGrid";
import BlogCategoryNav from "@/components/blog/BlogCategoryNav";
import { BLOG_CATEGORIES, getArticlesByCategory, getBlogCategory } from "@/lib/blogContent";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getBlogCategory(categorySlug);

  if (!category) {
    return {
      title: "Blog Category | Bible Buddy",
    };
  }

  return {
    title: `${category.name} | Bible Buddy Blog`,
    description: category.description,
    alternates: {
      canonical: `/blog/category/${category.slug}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getBlogCategory(categorySlug);

  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);

  return (
    <main className="min-h-screen bg-[#f7fafc] px-4 py-10 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/blog" className="text-sm font-black uppercase tracking-[0.18em] text-[#0056fd]">
            Back to Blog
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-[#0056fd] px-5 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(0,86,253,0.22)]"
          >
            Start Free
          </Link>
        </div>

        <div className="mb-8 rounded-[32px] border border-[#d8e3ec] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0056fd]">
            Bible Buddy Blog
          </p>
          <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
            {category.description}
          </p>
        </div>

        <BlogCategoryNav activeCategorySlug={category.slug} />

        <BlogArticleGrid articles={articles} />
      </section>
    </main>
  );
}
