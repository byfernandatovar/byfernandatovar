import type { Route } from "./+types/about";
import AboutUsSection from "../components/about/about-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sobre Nosotros - By Fernanda Tovar" },
    {
      name: "description",
      content: "Conoce a Brand of Talent, especialistas en conexión de talento y marcas con cobertura internacional.",
    },
  ];
}

export default function About() {
  return (
    <div className="w-full">
      <section className="w-full">
        <AboutUsSection />
      </section>
    </div>
  );
}

