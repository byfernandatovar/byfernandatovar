import type { Route } from "./+types/contact";
import ContactSection from "../components/contact/contact-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contacto - By Fernanda Tovar" },
    {
      name: "description",
      content: "Contáctame para capturar los momentos más especiales de tu boda. Fernanda Tovar, fotógrafa profesional de bodas en León, Guanajuato.",
    },
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

