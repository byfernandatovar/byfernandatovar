import type { Route } from "./+types/portfolio";
import { PortfolioGrid } from "../components/portfolio/portfolio-grid";
import { getAllPortfolioCategories, urlFor } from "../lib/sanity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio - By Fernanda Tovar" },
    { name: "description", content: "Explora mi trabajo fotográfico" },
  ];
}

export async function loader() {
  const categories = await getAllPortfolioCategories();
  
  // Transform categories to include cover image URLs
  const transformedCategories = categories.map((category) => ({
    id: category.name,
    title: category.title,
    subtitle: category.subtitle,
    href: `/portfolio/${category.name}`,
    image: category.coverImage 
      ? urlFor(category.coverImage).auto('format').quality(85).url()
      : `/portfolio-imgs/${category.name}/1.webp`, // Fallback to local image
  }));

  return { categories: transformedCategories };
}

export default function Portfolio({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full min-h-screen bg-[#F0EBE1]">
      <PortfolioGrid categories={loaderData.categories} />
    </div>
  );
}

