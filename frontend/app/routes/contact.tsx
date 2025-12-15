import type { Route } from "./+types/contact";
import ContactSection from "../components/contact/contact-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contacto | Fernanda Tovar" },
    {
      name: "description",
      content: "¿Planeando tu boda o una sesión especial? Escríbeme y creemos algo hermoso juntos. Disponible en León, Guanajuato y para viajar.",
    },
    {
      name: "keywords",
      content: "contacto fotógrafa bodas, reservar sesión fotos, cotización boda león guanajuato, fernanda tovar contacto"
    },
    { property: "og:title", content: "Contacto | Fernanda Tovar" },
    { property: "og:description", content: "¿Planeando tu boda o una sesión especial? Escríbeme y creemos algo hermoso juntos." },
    { property: "og:image", content: "/contact-bg.webp" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:image", content: "/contact-bg.webp" },
    { property: "twitter:title", content: "Contacto | Fernanda Tovar" },
    { property: "twitter:description", content: "¿Planeando tu boda o una sesión especial? Escríbeme y creemos algo hermoso juntos." },
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

