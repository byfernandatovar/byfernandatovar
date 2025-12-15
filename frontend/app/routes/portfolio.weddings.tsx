import type { Route } from "./+types/portfolio.weddings";
import { CategoryGallery } from "../components/portfolio/category-gallery";
import { getPortfolioCategory, getImageUrls } from "../lib/sanity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bodas | Portafolio - Fernanda Tovar" },
    { name: "description", content: "Tu día especial documentado con arte y sentimiento. Fotografía de bodas emotiva y atemporal." },
    {
      name: "keywords",
      content: "fotografía bodas, fotógrafo bodas león, boda destino, reportaje boda, fotos novia"
    },
    { property: "og:title", content: "Bodas | Portafolio - Fernanda Tovar" },
    { property: "og:description", content: "Tu día especial documentado con arte y sentimiento. Fotografía de bodas emotiva y atemporal." },
    { property: "og:image", content: "/portfolio-imgs/weddings/1.webp" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:image", content: "/portfolio-imgs/weddings/1.webp" },
    { property: "twitter:title", content: "Bodas | Portafolio - Fernanda Tovar" },
    { property: "twitter:description", content: "Tu día especial documentado con arte y sentimiento. Fotografía de bodas emotiva y atemporal." },
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
