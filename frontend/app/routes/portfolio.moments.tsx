import type { Route } from "./+types/portfolio.moments";
import { CategoryGallery } from "../components/portfolio/category-gallery";
import { getPortfolioCategory, getImageUrls } from "../lib/sanity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moments - By Fernanda Tovar" },
    { name: "description", content: "Momentos capturados" },
  ];
}

export async function loader() {
  const category = await getPortfolioCategory("moments");

  // Fallback to static images if Sanity data is not available
  const images = category
    ? getImageUrls(category.images)
    : Array.from({ length: 12 }, (_, i) => `/portfolio-imgs/moments/${i + 1}.webp`);

  return {
    title: category?.title || "Moments",
    subtitle: category?.subtitle || "Life Captured",
    images,
  };
}

export default function Moments({ loaderData }: Route.ComponentProps) {
  const { title, subtitle, images } = loaderData;

  return (
    <CategoryGallery
      title={title}
      subtitle={subtitle}
      images={images}
    />
  );
}
