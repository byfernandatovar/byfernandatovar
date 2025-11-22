import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { HomeCta } from "../components/home/home-cta";

// ==== Single-file demo adapted for React + Vite (no Lenis, no Button import, using react-icons) ====
export default function Footer() {
  return (
    <div className="bg-[#FAF8F3] relative w-full">
      <div className="flex h-screen flex-col items-center justify-center gap-10">
        <HomeCta />
      </div>
      <StickyFooter />
    </div>
  );
}

// ===== StickyFooter (in-file) =====
function StickyFooter({ className = "" }) {
  return (
    <footer
      className={`relative h-[720px] w-full  ${className}`}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[720px] w-full bg-[#F0EDE8]">
        <div className="sticky top-[calc(100vh-720px)] h-full overflow-y-auto">
          <div className="relative flex size-full flex-col justify-between gap-5 px-4 py-8 md:px-12">

            <div className="mt-10 flex flex-col gap-8 md:flex-row xl:mt-0">
              <AnimatedContainer className="w-full max-w-sm min-w-64 space-y-4 relative z-[1]">
                <img src="/textlogo-2.png" alt="Logo" className="w-auto h-24 object-contain" />
                <p className="text-[#7D7873] mt-8 text-sm md:mt-0">
                  Creo en capturar los momentos auténticos y sin guion que hacen única tu historia. Mi enfoque combina el arte editorial con la narración documental para crear imágenes atemporales que atesorarás por generaciones.
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return Icon ? (
                      <a
                        key={link.title}
                        href={link.href}
                        aria-label={link.title}
                        className="inline-flex size-8 items-center justify-center rounded-md border bg-[#7d7873] transition"
                      >
                        <Icon className="size-4" />
                      </a>
                    ) : null;
                  })}
                </div>
              </AnimatedContainer>

              {footerLinkGroups.map((group, index) => (
                <AnimatedContainer key={group.label} delay={0.1 + index * 0.1} className="w-full relative z-[1]">
                  <div className="mb-10 md:mb-0">
                    <h3 className="text-sm text-[#7D7873] uppercase tracking-wide">{group.label}</h3>
                    <ul className="text-[#7D7873] mt-4 space-y-2 text-sm md:text-xs lg:text-sm">
                      {group.links.map((link) => (
                        <li key={link.title}>
                          <a
                            href={link.href}
                            className="hover:text-foreground inline-flex items-center transition-all duration-300"
                          >
                            {link.icon && <link.icon className="me-1 size-4" />}
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedContainer>
              ))}
            </div>

            <div className="text-[#7D7873] flex flex-col items-center justify-between gap-2 border-t pt-2 text-sm md:flex-row">
              <p>© 2025 By Fernanda Tovar. All rights reserved.</p>
              <p>Designed and developed by <a href="https://blinksites.mx" target="_blank" rel="noopener noreferrer">Blink Sites</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

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
  { title: "Facebook", href: "https://www.facebook.com/profile.php?id=100044179428532", icon: FaFacebook },
  { title: "Instagram", href: "https://www.instagram.com/byfernandatovar/", icon: FaInstagram },
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

// ===== Animated container =====
function AnimatedContainer({ delay = 0.1, children, className = "", ...props }: { delay?: number; children: React.ReactNode; className?: string; [key: string]: any }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
