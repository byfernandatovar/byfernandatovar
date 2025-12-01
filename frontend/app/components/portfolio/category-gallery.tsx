import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryGalleryProps {
  title: string;
  subtitle: string;
  images: string[];
}

// Editorial layout configurations for 2-column rows
type LayoutItem = {
  width: string;
  offset?: string;
};

type LayoutRow = {
  items: LayoutItem[];
  gap?: string;
  justify?: string;
};

const layoutPatterns: LayoutRow[][] = [
  // Pattern A: Classic editorial
  [
    { items: [{ width: "w-[45%]" }, { width: "w-[35%]", offset: "mt-24" }], justify: "justify-between" },
    { items: [{ width: "w-[30%]", offset: "mt-12" }, { width: "w-[55%]" }], justify: "justify-between" },
    { items: [{ width: "w-[50%]" }, { width: "w-[28%]", offset: "mt-32" }], justify: "justify-center", gap: "gap-16" },
  ],
  // Pattern B: Asymmetric scatter
  [
    { items: [{ width: "w-[35%]" }, { width: "w-[48%]", offset: "mt-16" }], justify: "justify-between" },
    { items: [{ width: "w-[55%]", offset: "mt-8" }, { width: "w-[32%]" }], justify: "justify-between" },
    { items: [{ width: "w-[40%]", offset: "mt-20" }, { width: "w-[42%]" }], justify: "justify-center", gap: "gap-12" },
  ],
  // Pattern C: Bold asymmetry
  [
    { items: [{ width: "w-[52%]" }, { width: "w-[30%]", offset: "mt-28" }], justify: "justify-between" },
    { items: [{ width: "w-[28%]", offset: "mt-4" }, { width: "w-[50%]" }], justify: "justify-between" },
    { items: [{ width: "w-[38%]" }, { width: "w-[45%]", offset: "mt-16" }], justify: "justify-between" },
  ],
];

export const CategoryGallery: React.FC<CategoryGalleryProps> = ({
  title,
  subtitle,
  images,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Group images into pairs for the layout rows
  const imagePairs: string[][] = [];
  for (let i = 0; i < images.length; i += 2) {
    imagePairs.push(images.slice(i, Math.min(i + 2, images.length)));
  }

  // Lightbox navigation
  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }, [selectedIndex, images.length]);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, goToPrevious, goToNext, closeLightbox]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const openLightbox = (globalIndex: number) => {
    setSelectedIndex(globalIndex);
  };

  return (
    <div className="min-h-screen bg-[#F0EBE1] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-[#BE9B5F] text-sm md:text-base uppercase tracking-widest">
              {subtitle}
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl text-black mb-6">{title}</h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-0.5 bg-[#BE9B5F] mx-auto"
          />
        </motion.div>

        {/* Back button */}
        <motion.a
          href="/portfolio"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center text-[#7D7873] hover:text-black transition-colors mb-12 group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-300">←</span>
          Volver al Portfolio
        </motion.a>

        {/* Editorial Gallery Layout - Desktop (2 columns) */}
        <div className="hidden md:block space-y-16 lg:space-y-24">
          {imagePairs.map((pair, pairIndex) => {
            const patternSet = layoutPatterns[pairIndex % layoutPatterns.length];
            const rowConfig = patternSet[pairIndex % patternSet.length];
            
            return (
              <div
                key={pairIndex}
                className={`flex items-start ${rowConfig.justify || "justify-between"} ${rowConfig.gap || "gap-8"}`}
              >
                {pair.map((image, imageIndex) => {
                  const globalIndex = pairIndex * 2 + imageIndex;
                  const itemConfig = rowConfig.items[imageIndex] || rowConfig.items[0];
                  
                  return (
                    <motion.div
                      key={globalIndex}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: imageIndex * 0.12 }}
                      className={`group cursor-pointer ${itemConfig.width} ${itemConfig.offset || ""}`}
                      onClick={() => openLightbox(globalIndex)}
                    >
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={image}
                          alt={`${title} ${globalIndex + 1}`}
                          className="w-full h-auto"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Mobile: Clean stacked layout */}
        <div className="md:hidden space-y-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal - Improved UX */}
        <AnimatePresence mode="wait">
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/95 z-50 flex flex-col"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 md:px-8 py-4 text-white/70">
                <span className="text-sm tracking-wider font-light">
                  {selectedIndex + 1} / {images.length}
                </span>
                <button
                  onClick={closeLightbox}
                  className="p-2 hover:text-white transition-colors"
                  aria-label="Cerrar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Image container */}
              <div 
                className="flex-1 flex items-center justify-center px-4 md:px-20 pb-8 relative"
                onClick={closeLightbox}
              >
                {/* Previous button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  disabled={selectedIndex === 0}
                  className={`absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-all z-10 ${
                    selectedIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10 rounded-full"
                  }`}
                  aria-label="Anterior"
                >
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Image with animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="max-w-full max-h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={images[selectedIndex]}
                      alt={`${title} ${selectedIndex + 1}`}
                      className="max-w-full max-h-[80vh] object-contain select-none"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Next button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  disabled={selectedIndex === images.length - 1}
                  className={`absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-all z-10 ${
                    selectedIndex === images.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10 rounded-full"
                  }`}
                  aria-label="Siguiente"
                >
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Keyboard hint - desktop only */}
              <div className="hidden md:flex justify-center pb-4 text-white/40 text-xs tracking-wider gap-6">
                <span>← → navegar</span>
                <span>ESC cerrar</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
