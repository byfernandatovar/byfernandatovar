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
    { title: "By Fernanda Tovar" },
    { name: "description", content: "Bienvenido a By Fernanda Tovar" },
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
