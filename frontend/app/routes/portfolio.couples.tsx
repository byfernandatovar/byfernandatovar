import type { Route } from "./+types/portfolio.couples";
import { CategoryGallery } from "../components/portfolio/category-gallery";
import { getPortfolioCategory, getImageUrls } from "../lib/sanity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Couples - By Fernanda Tovar" },
    { name: "description", content: "Fotografía de parejas" },
  ];
}

export async function loader() {
  const category = await getPortfolioCategory("couples");

  // Fallback to static images if Sanity data is not available
  const images = category
    ? getImageUrls(category.images)
    : Array.from({ length: 12 }, (_, i) => `/portfolio-imgs/couples/${i + 1}.webp`);

  return {
    title: category?.title || "Couples",
    subtitle: category?.subtitle || "Love & Connection",
    images,
  };
}

export default function Couples({ loaderData }: Route.ComponentProps) {
  const { title, subtitle, images } = loaderData;

  return (
    <CategoryGallery
      title={title}
      subtitle={subtitle}
      images={images}
    />
  );
}
