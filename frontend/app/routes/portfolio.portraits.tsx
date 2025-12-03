import type { Route } from "./+types/portfolio.portraits";
import { CategoryGallery } from "../components/portfolio/category-gallery";
import { getPortfolioCategory, getImageUrls } from "../lib/sanity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portraits - By Fernanda Tovar" },
    { name: "description", content: "Fotografía de retratos" },
  ];
}

export async function loader() {
  const category = await getPortfolioCategory("portraits");

  // Fallback to static images if Sanity data is not available
  const images = category
    ? getImageUrls(category.images)
    : Array.from({ length: 12 }, (_, i) => `/portfolio-imgs/portraits/${i + 1}.webp`);

  return {
    title: category?.title || "Portraits",
    subtitle: category?.subtitle || "Soul Stories",
    images,
  };
}

export default function Portraits({ loaderData }: Route.ComponentProps) {
  const { title, subtitle, images } = loaderData;

  return (
    <CategoryGallery
      title={title}
      subtitle={subtitle}
      images={images}
    />
  );
}
