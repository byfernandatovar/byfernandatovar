import type { Route } from "./+types/home";
import { Hero } from "../components/home/hero";
import Features from "../components/home/features";
import StickyGallery from "../components/home/sticky-gallery";
import ImmersiveScrollGallery from "../components/home/immersive-gallery";
import { HomeCta } from "../components/home/home-cta";
import BeigeDivider from "../ui/beige-divider";
import { HomeCta2 } from "~/components/home/home-cta-2";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fernanda Tovar - Fotografía de Bodas y Retratos" },
    {
      name: "description",
      content: "Fotografía de bodas, parejas y retratos. Capturando momentos auténticos y atemporales con un estilo documental y artístico."
    },
    {
      name: "keywords",
      content: "fotógrafa de bodas, fotografía de parejas, retratos, fotografía documental, boda, fernanda tovar"
    },
    { property: "og:title", content: "Fernanda Tovar - Fotografía de Bodas y Retratos" },
    { property: "og:description", content: "Capturando momentos auténticos y atemporales con un estilo documental y artístico." },
    { property: "og:image", content: "/home-imgs/hero/hero-1.webp" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "/home-imgs/hero/hero-1.webp" },
    { name: "twitter:title", content: "Fernanda Tovar - Fotografía de Bodas y Retratos" },
    { name: "twitter:description", content: "Capturando momentos auténticos y atemporales con un estilo documental y artístico." },
  ];
}

export default function Home() {
  return (
    <div className="w-full">
      <section className="w-full h-[110vh]">
        <Hero />
      </section>
      <BeigeDivider />
      <section className="w-full">
        <HomeCta2 />
      </section> 
      <section className="w-full">
        <Features />
      </section>
      <BeigeDivider />
      <section className="w-full">
        <StickyGallery />
      </section>
      <BeigeDivider />
      <section className="w-full">
        <ImmersiveScrollGallery />
      </section>
      <section className="w-full">
        <HomeCta />
      </section>
    </div>
  );
}
