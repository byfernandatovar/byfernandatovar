import type { Route } from "./+types/contact";
import ContactSection from "../components/contact/contact-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contacto | Fernanda Tovar" },
    {
      name: "description",
      content: "¿Planeando tu boda o una sesión especial? Escríbeme y creemos algo hermoso juntos.",
    },
    {
      name: "keywords",
      content: "contacto fotógrafa bodas, reservar sesión fotos, cotización boda, fernanda tovar contacto"
    },
    { property: "og:title", content: "Contacto | Fernanda Tovar" },
    { property: "og:description", content: "¿Planeando tu boda o una sesión especial? Escríbeme y creemos algo hermoso juntos." },
    { property: "og:image", content: "/contact-bg.webp" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "/contact-bg.webp" },
    { name: "twitter:title", content: "Contacto | Fernanda Tovar" },
    { name: "twitter:description", content: "¿Planeando tu boda o una sesión especial? Escríbeme y creemos algo hermoso juntos." },
  ];
}

export default function Contact() {
  return (
    <div className="w-full">
      <section className="w-full">
        <ContactSection />
      </section>
    </div>
  );
}

