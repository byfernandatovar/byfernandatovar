import type { Route } from "./+types/portfolio.portraits";
import { CategoryGallery } from "../components/portfolio/category-gallery";
import { getPortfolioCategory, getImageUrls } from "../lib/sanity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Retratos | Portafolio - Fernanda Tovar" },
    { name: "description", content: "Retratos que van más allá de una imagen. Sesiones personales que resaltan tu esencia y personalidad." },
    {
      name: "keywords",
      content: "fotografía retratos, sesión personal, retrato artístico, book fotos, león guanajuato"
    },
    { property: "og:title", content: "Retratos | Portafolio - Fernanda Tovar" },
    { property: "og:description", content: "Retratos que van más allá de una imagen. Sesiones personales que resaltan tu esencia y personalidad." },
    { property: "og:image", content: "/portfolio-imgs/portraits/1.webp" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:image", content: "/portfolio-imgs/portraits/1.webp" },
    { property: "twitter:title", content: "Retratos | Portafolio - Fernanda Tovar" },
    { property: "twitter:description", content: "Retratos que van más allá de una imagen. Sesiones personales que resaltan tu esencia y personalidad." },
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
