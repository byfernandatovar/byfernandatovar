import type { Route } from "./+types/portfolio.weddings";
import { CategoryGallery } from "../components/portfolio/category-gallery";
import { getPortfolioCategory, getImageUrls } from "../lib/sanity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Weddings - By Fernanda Tovar" },
    { name: "description", content: "Fotografía de bodas" },
  ];
}

export async function loader() {
  const category = await getPortfolioCategory("weddings");

  // Fallback to static images if Sanity data is not available
  const images = category
    ? getImageUrls(category.images)
    : Array.from({ length: 12 }, (_, i) => `/portfolio-imgs/weddings/${i + 1}.webp`);

  return {
    title: category?.title || "Weddings",
    subtitle: category?.subtitle || "Eternal Moments",
    images,
  };
}

export default function Weddings({ loaderData }: Route.ComponentProps) {
  const { title, subtitle, images } = loaderData;

  return (
    <CategoryGallery
      title={title}
      subtitle={subtitle}
      images={images}
    />
  );
}
