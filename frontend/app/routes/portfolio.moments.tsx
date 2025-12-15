import type { Route } from "./+types/portfolio.moments";
import { CategoryGallery } from "../components/portfolio/category-gallery";
import { getPortfolioCategory, getImageUrls } from "../lib/sanity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Momentos | Portafolio - Fernanda Tovar" },
    { name: "description", content: "Instantes fugaces llenos de emoción. Capturando la espontaneidad y belleza de lo cotidiano." },
    {
      name: "keywords",
      content: "fotografía lifestyle, momentos espontáneos, fotografía documental, vida real, emociones"
    },
    { property: "og:title", content: "Momentos | Portafolio - Fernanda Tovar" },
    { property: "og:description", content: "Instantes fugaces llenos de emoción. Capturando la espontaneidad y belleza de lo cotidiano." },
    { property: "og:image", content: "/portfolio-imgs/moments/1.webp" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "/portfolio-imgs/moments/1.webp" },
    { name: "twitter:title", content: "Momentos | Portafolio - Fernanda Tovar" },
    { name: "twitter:description", content: "Instantes fugaces llenos de emoción. Capturando la espontaneidad y belleza de lo cotidiano." },
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
