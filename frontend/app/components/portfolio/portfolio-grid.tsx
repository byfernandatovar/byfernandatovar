import React from "react";
import { motion } from "framer-motion";

interface Category {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
}

interface PortfolioGridProps {
  categories: Category[];
}

export const PortfolioGrid = ({ categories }: PortfolioGridProps) => {
  return (
    <div className="min-h-screen py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl text-black mb-6">Portfolio</h1>
          <p className="text-lg md:text-xl text-[#7D7873] max-w-2xl mx-auto">
            Descubre mis colecciones fotográficas donde cada imagen cuenta una historia única
          </p>
        </motion.div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href={category.href}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden aspect-[4/5] md:aspect-[3/4] bg-black/5"
            >
              {/* Image with overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                >
                  <p className="text-[#BE9B5F] text-sm md:text-base uppercase tracking-widest mb-2">
                    {category.subtitle}
                  </p>
                  <h2 className="text-white text-4xl md:text-5xl font-light mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    {category.title}
                  </h2>
                  <div className="flex items-center text-white/80 text-sm group-hover:text-white transition-colors duration-300">
                    <span className="mr-2">Explorar</span>
                    <motion.span
                      className="text-xl"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

