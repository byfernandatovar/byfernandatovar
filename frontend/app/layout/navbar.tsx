import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import {
  useMotionValueEvent,
  AnimatePresence,
  useScroll,
  motion,
} from "framer-motion";
import Button from "../ui/button";

const Example = () => {
  return <FlyoutNav />;
};

const FlyoutNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Cambiar glassmorphism después de 100px
    setScrolled(latest > 100 ? true : false);

    // Detectar dirección del scroll
    if (latest > prevScroll) {
      // Scrolling down
      setHidden(true);
    } else {
      // Scrolling up
      setHidden(false);
    }
    setPrevScroll(latest);
  });

  return (
    <motion.nav
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 z-60 w-full px-6 text-black
      transition-all duration-300 ease-out lg:px-12
      ${
        scrolled
          ? "bg-white/30 py-3 backdrop-blur-md shadow-lg"
          : "bg-[#F0EBE1]/0 py-6 shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <div className="hidden gap-6 lg:flex">
          <Links />
          <CTAs />
        </div>
        <MobileMenu />
      </div>
    </motion.nav>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center">
      <img
        src="/logo.png"
        alt="Logo"
        className="h-16 w-auto"
      />
    </div>
  );
};

const Links = () => {
  return (
    <div className="flex items-center gap-6">
      {LINKS.map((l) => (
        <NavLink key={l.text} href={l.href} FlyoutContent={l.component}>
          {l.text}
        </NavLink>
      ))}
    </div>
  );
};

const NavLink = ({
  children,
  href,
  FlyoutContent,
}: {
  children: React.ReactNode;
  href: string;
  FlyoutContent?: React.ElementType;
}) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit"
    >
      <a href={href} className="relative text-sm text-[#7D7873] uppercase tracking-wide">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTAs = () => {
  return (
    <div className="flex items-center">
      <a href="/contact">
        <Button variant="primary">Contacto</Button>
      </a>
    </div>
  );
};




const MobileMenuLink = ({
  children,
  href,
  setMenuOpen,
  hasSubmenu,
}: {
  children: React.ReactNode;
  href: string;
  setMenuOpen: (value: boolean) => void;
  hasSubmenu?: boolean;
}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const portfolioCategories = [
    { name: "Weddings", href: "/portfolio/weddings", subtitle: "Eternal Moments" },
    { name: "Portraits", href: "/portfolio/portraits", subtitle: "Soul Stories" },
    { name: "Moments", href: "/portfolio/moments", subtitle: "Life Captured" },
    { name: "Couples", href: "/portfolio/couples", subtitle: "Love & Connection" },
  ];

  if (hasSubmenu) {
    return (
      <div className="relative text-neutral-950">
        <div
          onClick={() => setSubmenuOpen(!submenuOpen)}
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl text-[#7D7873] uppercase tracking-wide hover:bg-neutral-50 transition-colors"
        >
          <span>{children}</span>
          <span className="text-lg">{submenuOpen ? "−" : "+"}</span>
        </div>
        {submenuOpen && (
          <div className="bg-[#F0EBE1] pl-6">
            {portfolioCategories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 border-b border-neutral-300/50 text-lg text-[#7D7873] hover:text-black transition-colors"
              >
                <div>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm text-[#A59B82] mt-1">{category.subtitle}</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative text-neutral-950">
      <a
        onClick={() => setMenuOpen(false)}
        href={href}
        className="flex w-full cursor-pointer items-center border-b border-neutral-300 py-6 text-start text-2xl text-[#7D7873] uppercase tracking-wide hover:bg-neutral-50 transition-colors"
      >
        <span>{children}</span>
      </a>
    </div>
  );
};

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="block lg:hidden">
      <button onClick={() => setOpen(true)} className="block text-3xl">
        <FiMenu />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "100vw" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-0 top-0 flex h-screen w-full flex-col bg-white"
          >
            <div className="flex items-center justify-between p-6">
              <Logo />
              <button onClick={() => setOpen(false)}>
                <FiX className="text-3xl text-neutral-950" />
              </button>
            </div>
            <div className="h-screen overflow-y-scroll bg-neutral-100 p-6">
              {LINKS.map((l) => (
                <MobileMenuLink
                  key={l.text}
                  href={l.href}
                  setMenuOpen={setOpen}
                  hasSubmenu={l.text === "Portafolio"}
                >
                  {l.text}
                </MobileMenuLink>
              ))}
            </div>
            <div className="flex justify-end bg-[#F0EBE1] p-6">
              <CTAs />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Example;

const PortfolioFlyout = () => {
  const portfolioCategories = [
    { name: "Weddings", href: "/portfolio/weddings", subtitle: "Eternal Moments" },
    { name: "Portraits", href: "/portfolio/portraits", subtitle: "Soul Stories" },
    { name: "Moments", href: "/portfolio/moments", subtitle: "Life Captured" },
    { name: "Couples", href: "/portfolio/couples", subtitle: "Love & Connection" },
  ];

  return (
    <div className="w-64 bg-white p-6 shadow-xl rounded-lg">
      <div className="space-y-3">
        {portfolioCategories.map((category) => (
          <a
            key={category.name}
            href={category.href}
            className="block group"
          >
            <div className="p-3 rounded-md hover:bg-[#F0EBE1] transition-colors duration-200">
              <h3 className="text-black text-base font-medium group-hover:text-[#BE9B5F] transition-colors">
                {category.name}
              </h3>
              <p className="text-[#7D7873] text-xs mt-1">{category.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const LINKS = [
  {
    text: "Inicio",
    href: "/",
  },
  {
    text: "Sobre mí",
    href: "/about",
  },
  {
    text: "Portafolio",
    href: "/portfolio",
    component: PortfolioFlyout,
  }
];