import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryGalleryProps {
  title: string;
  subtitle: string;
  images: string[];
}

export const CategoryGallery: React.FC<CategoryGalleryProps> = ({
  title,
  subtitle,
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

        {/* Masonry Gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <motion.img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
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
                  className="max-w-full max-h-full object-contain rounded-lg"
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

