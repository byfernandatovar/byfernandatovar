// src/components/features.tsx

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "~/ui/button";

interface Section {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
}

const sections: Section[] = [
  {
    id: 1,
    title: "Momentos Eternos",
    description:
      "Capturo la esencia de su amor en cada mirada, sonrisa y abrazo. Cada instante se transforma en una historia visual que perdurará para siempre, reflejando la autenticidad de su día más especial.",
    imageUrl:
      "/home-imgs/hero/hero9.webp",
    reverse: false,
  },
  {
    id: 2,
    title: "Arte Natural",
    description:
      "Fotografía documental que fluye con la naturalidad de su celebración. Sin poses forzadas, solo la magia espontánea de un día único, donde cada emoción se revela en su forma más pura y hermosa.",
    imageUrl:
      "/home-imgs/hero/hero10.webp",
    reverse: true,
  },
  {
    id: 3,
    title: "Su Historia",
    description:
      "Más que fotografías, me gusta crear el relato visual de su amor. Desde los preparativos íntimos hasta el último baile, documento cada capítulo de su jornada hacia la felicidad eterna.",
    imageUrl:
      "/home-imgs/hero/hero11.webp",
    reverse: false,
  },
];

const Features: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // refs para cada sección
  const sectionRefs = sections.map(() =>
    useRef<HTMLDivElement | null>(null)
  );

  // scrollYProgress para cada sección
  const scrollYProgress = sectionRefs.map((ref) => {
    return useScroll({
      target: ref,
      offset: ["start end", "center start"],
    }).scrollYProgress;
  });

  // animaciones derivadas
  const opacityContents = scrollYProgress.map((progress) =>
    useTransform(progress, [0, 0.7], [0, 1])
  );

  const clipProgresses = scrollYProgress.map((progress) =>
    useTransform(
      progress,
      [0, 0.7],
      ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
    )
  );

  const translateContents = scrollYProgress.map((progress) =>
    useTransform(progress, [0, 1], [-50, 0])
  );

  return (
    <div className="bg-[#F0EBE1] overflow-hidden py-24">
      {/* Secciones con parallax */}
      <div className="flex flex-col md:px-0 px-10 pt-10">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={sectionRefs[index]}
            className={`min-h-screen flex flex-col md:flex-row items-center justify-center md:gap-40 gap-10 py-10 ${
              section.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            <motion.div style={{ y: isMobile ? 0 : translateContents[index] }} className="w-full md:w-auto">
              <h2 className="text-black text-4xl md:text-6xl max-w-sm">
                {section.title}
              </h2>
              <motion.p
                style={{ y: isMobile ? 0 : translateContents[index] }}
                className="text-black/70 max-w-sm mt-6 md:mt-10"
              >
                {section.description}
              </motion.p>
            </motion.div>

            <motion.div
              style={{
                opacity: opacityContents[index],
                clipPath: clipProgresses[index],
              }}
              className="relative w-full max-w-md h-[400px] md:w-80 md:h-[500px] lg:w-96 lg:h-[600px] overflow-hidden "
            >
              <img
                src={section.imageUrl}
                className="w-full h-full object-cover"
                alt={`Section ${section.id}`}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
