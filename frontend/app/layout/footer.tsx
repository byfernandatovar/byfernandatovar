import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

// ===== Types =====
type FooterLink = {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type FooterLinkGroup = {
  label: string;
  links: FooterLink[];
};

// ===== Data =====
const socialLinks: FooterLink[] = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100044179428532",
    icon: FaFacebook,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/byfernandatovar/",
    icon: FaInstagram,
  },
];

const footerLinkGroups: FooterLinkGroup[] = [
  {
    label: "Servicios",
    links: [
      { title: "Bodas", href: "/bodas" },
      { title: "Sesiones de Compromiso", href: "/compromiso" },
      { title: "Sesiones de Parejas", href: "/parejas" },
      { title: "Trash the Dress", href: "/trash-the-dress" },
      { title: "Aniversarios", href: "/aniversarios" },
    ],
  },
  {
    label: "Portafolio",
    links: [
      { title: "Bodas Completas", href: "/portfolio/bodas" },
      { title: "Momentos Íntimos", href: "/portfolio/momentos" },
      { title: "Detalles y Decoración", href: "/portfolio/detalles" },
      { title: "Testimonios", href: "/testimonios" },
    ],
  },
  {
    label: "Información",
    links: [
      { title: "Sobre Mí", href: "/about" },
      { title: "Mi Proceso", href: "/proceso" },
      { title: "Paquetes", href: "/paquetes" },
      { title: "Contacto", href: "/contacto" },
    ],
  },
];

// ===== Footer ancho completo =====
export default function Footer() {
  return (
    <footer className="w-full bg-[#F0EBE1]">
      <div className="flex w-full flex-col gap-10 px-4 py-10 md:px-12 lg:px-20 xl:px-32">
        {/* Bloque principal */}
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Columna logo + descripción + redes */}
          <div className="w-full max-w-sm min-w-64 space-y-4 relative z-[1]">
            <img
              src="/textlogo-2.png"
              alt="Logo"
              className="w-auto h-24 object-contain"
            />
            <p className="text-[#7D7873] mt-4 text-sm">
              Creo en capturar los momentos auténticos y sin guion que hacen
              única tu historia. Mi enfoque combina el arte editorial con la
              narración documental para crear imágenes atemporales que
              atesorarás por generaciones.
            </p>
            <div className="flex gap-2 mt-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return Icon ? (
                  <a
                    key={link.title}
                    href={link.href}
                    aria-label={link.title}
                    className="inline-flex size-8 items-center justify-center rounded-md border bg-[#7d7873] transition hover:opacity-90"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="size-4 text-[#FAF8F3]" />
                  </a>
                ) : null;
              })}
            </div>
          </div>

          {/* Columnas de links */}
          <div className="flex-1 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-[1]">
            {footerLinkGroups.map((group) => (
              <div key={group.label} className="w-full">
                <h3 className="text-sm text-[#7D7873] uppercase tracking-wide">
                  {group.label}
                </h3>
                <ul className="text-[#7D7873] mt-4 space-y-2 text-sm md:text-xs lg:text-sm">
                  {group.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="inline-flex items-center transition-all duration-300 hover:text-black"
                      >
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Línea final */}
        <div className="text-[#7D7873] flex flex-col items-center justify-between gap-2 border-t pt-3 text-xs md:flex-row md:text-sm">
          <p>© 2025 By Fernanda Tovar. All rights reserved.</p>
          <p>
            Designed and developed by{" "}
            <a
              href="https://blinksites.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-black"
            >
              Blink Sites
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
