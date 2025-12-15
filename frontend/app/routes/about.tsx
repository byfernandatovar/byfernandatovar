import type { Route } from "./+types/about";
import AboutUsSection from "../components/about/about-section";
import AboutCta from "../components/about/about-cta";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sobre mí | Fernanda Tovar - Fotógrafa" },
    {
      name: "description",
      content: "Conoce más sobre Fernanda Tovar y su pasión por capturar historias de amor auténticas. Fotógrafa profesional en León, Guanajuato.",
    },
    {
      name: "keywords",
      content: "sobre mi, fernanda tovar, fotógrafa biografía, experiencia fotografía bodas, león guanajuato"
    },
    { property: "og:title", content: "Sobre mí | Fernanda Tovar - Fotógrafa" },
    { property: "og:description", content: "Conoce más sobre Fernanda Tovar y su pasión por capturar historias de amor auténticas." },
    { property: "og:image", content: "/about-img.webp" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:image", content: "/about-img.webp" },
    { property: "twitter:title", content: "Sobre mí | Fernanda Tovar - Fotógrafa" },
    { property: "twitter:description", content: "Conoce más sobre Fernanda Tovar y su pasión por capturar historias de amor auténticas." },
  ];
}

export default function About() {
  return (
    <div className="w-full">
      <section className="w-full">
        <AboutUsSection />
      </section>
      <section className="w-full">
        <AboutCta />
      </section>
    </div>
  );
}

