import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryGalleryProps {
  title: string;
  subtitle: string;
  images: string[];
}

// Editorial layout configurations - each defines a row pattern
type LayoutItem = {
  width: string; // Tailwind width class
  align?: "start" | "center" | "end"; // vertical alignment
  offset?: string; // optional top margin for stagger effect
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Group images into pairs for the layout rows
  const imagePairs: string[][] = [];
  for (let i = 0; i < images.length; i += 2) {
    imagePairs.push(images.slice(i, Math.min(i + 2, images.length)));
  }

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

        {/* Editorial Gallery Layout - Desktop */}
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
                      transition={{ duration: 0.8, delay: imageIndex * 0.15 }}
                      className={`group cursor-pointer ${itemConfig.width} ${itemConfig.offset || ""}`}
                      onClick={() => setSelectedImage(image)}
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
              onClick={() => setSelectedImage(image)}
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

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/95 z-60 flex items-center justify-center p-4 md:p-8 cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[70vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Full size"
                  className="max-w-full max-h-full object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 md:top-4 md:right-4 text-white text-4xl md:text-5xl hover:text-[#BE9B5F] transition-colors bg-black/50 md:bg-transparent w-12 h-12 md:w-auto md:h-auto rounded-full md:rounded-none flex items-center justify-center"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

