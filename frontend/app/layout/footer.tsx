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
    label: "Navigation",
    links: [
      { title: "Home", href: "/" },
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Portfolio",
    links: [
      { title: "Weddings", href: "/portfolio/weddings" },
      { title: "Portraits", href: "/portfolio/portraits" },
      { title: "Moments", href: "/portfolio/moments" },
      { title: "Couples", href: "/portfolio/couples" },
    ],
  },
];

// ===== Footer ancho completo =====
export default function Footer() {
  return (
    <footer className="w-full bg-[#F0EBE1]">
      <div className="flex w-full flex-col gap-10 px-4 py-10 md:px-12 lg:px-20 xl:px-32">
        {/* Bloque principal */}
        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr_0.8fr] md:gap-10 lg:gap-12">
          {/* Columna logo + descripción */}
          <div className="w-full space-y-4 relative z-[1]">
            <img
              src="/textlogo-2.png"
              alt="Logo"
              className="w-auto h-20 object-contain"
            />
            <p className="text-[#7D7873] mt-4 text-sm leading-relaxed">
              I believe in capturing the authentic, unscripted moments that make
              your story unique. My approach combines editorial art with
              documentary storytelling to create timeless images that you will
              treasure for generations.
            </p>
          </div>

          {/* Columnas de links */}
          <div className="grid gap-8 sm:grid-cols-2 relative z-[1]">
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

          {/* Columna redes sociales */}
          <div className="flex flex-col items-start space-y-4 relative z-[1]">
            <h3 className="text-sm text-[#7D7873] uppercase tracking-wide">
              Follow me
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return Icon ? (
                  <a
                    key={link.title}
                    href={link.href}
                    aria-label={link.title}
                    className="inline-flex size-10 items-center justify-center rounded-md transition hover:opacity-75"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="size-5 text-[#7D7873]" />
                  </a>
                ) : null;
              })}
            </div>
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
