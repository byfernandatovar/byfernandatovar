import type { Route } from "./+types/portfolio.moments";
import { CategoryGallery } from "../components/portfolio/category-gallery";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moments - By Fernanda Tovar" },
    { name: "description", content: "Momentos capturados" },
  ];
}

export default function Moments() {
  // Array de imágenes (ajustar según las imágenes disponibles)
  const images = Array.from({ length: 12 }, (_, i) => 
    `/portfolio-imgs/moments/${i + 1}.webp`
  );

  return (
    <CategoryGallery
      title="Moments"
      subtitle="Life Captured"
      images={images}
    />
  );
}

