import type { Route } from "./+types/portfolio.portraits";
import { CategoryGallery } from "../components/portfolio/category-gallery";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portraits - By Fernanda Tovar" },
    { name: "description", content: "Fotografía de retratos" },
  ];
}

export default function Portraits() {
  // Array de imágenes (ajustar según las imágenes disponibles)
  const images = Array.from({ length: 12 }, (_, i) => 
    `/portfolio-imgs/portraits/${i + 1}.webp`
  );

  return (
    <CategoryGallery
      title="Portraits"
      subtitle="Soul Stories"
      images={images}
    />
  );
}

