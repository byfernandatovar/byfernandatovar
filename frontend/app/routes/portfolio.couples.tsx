import type { Route } from "./+types/portfolio.couples";
import { CategoryGallery } from "../components/portfolio/category-gallery";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Couples - By Fernanda Tovar" },
    { name: "description", content: "Fotografía de parejas" },
  ];
}

export default function Couples() {
  // Array de imágenes (ajustar según las imágenes disponibles)
  const images = Array.from({ length: 12 }, (_, i) => 
    `/portfolio-imgs/couples/${i + 1}.webp`
  );

  return (
    <CategoryGallery
      title="Couples"
      subtitle="Love & Connection"
      images={images}
    />
  );
}

