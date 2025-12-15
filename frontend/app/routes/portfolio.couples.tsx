import type { Route } from "./+types/portfolio.couples";
import { CategoryGallery } from "../components/portfolio/category-gallery";
import { getPortfolioCategory, getImageUrls } from "../lib/sanity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Parejas | Portafolio - Fernanda Tovar" },
    { name: "description", content: "Historias de amor capturadas con naturalidad. Sesiones de pareja que reflejan conexión y complicidad." },
    {
      name: "keywords",
      content: "fotografía parejas, sesión engagement, fotos novios, amor, conexión"
    },
    { property: "og:title", content: "Parejas | Portafolio - Fernanda Tovar" },
    { property: "og:description", content: "Historias de amor capturadas con naturalidad. Sesiones de pareja que reflejan conexión y complicidad." },
    { property: "og:image", content: "/portfolio-imgs/couples/1.webp" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "/portfolio-imgs/couples/1.webp" },
    { name: "twitter:title", content: "Parejas | Portafolio - Fernanda Tovar" },
    { name: "twitter:description", content: "Historias de amor capturadas con naturalidad. Sesiones de pareja que reflejan conexión y complicidad." },
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
