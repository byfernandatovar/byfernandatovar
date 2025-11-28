import type { Route } from "./+types/portfolio.weddings";
import { CategoryGallery } from "../components/portfolio/category-gallery";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Weddings - By Fernanda Tovar" },
    { name: "description", content: "Fotografía de bodas" },
  ];
}

export default function Weddings() {
  // Array de imágenes (ajustar según las imágenes disponibles)
  const images = Array.from({ length: 12 }, (_, i) => 
    `/portfolio-imgs/weddings/${i + 1}.webp`
  );

  return (
    <CategoryGallery
      title="Weddings"
      subtitle="Eternal Moments"
      images={images}
    />
  );
}

