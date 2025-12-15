import type { Route } from "./+types/portfolio";
import { PortfolioGrid } from "../components/portfolio/portfolio-grid";
import { getAllPortfolioCategories, urlFor } from "../lib/sanity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portafolio | Fernanda Tovar" },
    { name: "description", content: "Explora galerías seleccionadas de bodas, sesiones de pareja y retratos. Cada imagen cuenta una historia única." },
    {
      name: "keywords",
      content: "portafolio fotografía, galería bodas, fotos de parejas, retratos artísticos, fernanda tovar trabajo"
    },
    { property: "og:title", content: "Portafolio | Fernanda Tovar" },
    { property: "og:description", content: "Explora galerías seleccionadas de bodas, sesiones de pareja y retratos. Cada imagen cuenta una historia única." },
    { property: "og:image", content: "/portfolio-imgs/weddings/1.webp" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:image", content: "/portfolio-imgs/weddings/1.webp" },
    { property: "twitter:title", content: "Portafolio | Fernanda Tovar" },
    { property: "twitter:description", content: "Explora galerías seleccionadas de bodas, sesiones de pareja y retratos. Cada imagen cuenta una historia única." },
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

