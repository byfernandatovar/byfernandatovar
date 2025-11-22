// src/components/features.tsx

import React, { useRef } from "react";
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
      "Capturamos la esencia de su amor en cada mirada, sonrisa y abrazo. Cada instante se transforma en una historia visual que perdurará para siempre, reflejando la autenticidad de su día más especial.",
    imageUrl:
      "/home/hero/hero9.webp",
    reverse: false,
  },
  {
    id: 2,
    title: "Arte Natural",
    description:
      "Fotografía documental que fluye con la naturalidad de vuestra celebración. Sin poses forzadas, solo la magia espontánea de un día único, donde cada emoción se revela en su forma más pura y hermosa.",
    imageUrl:
      "/home/hero/hero10.webp",
    reverse: true,
  },
  {
    id: 3,
    title: "Su Historia",
    description:
      "Más que fotografías, creamos el relato visual de vuestro amor. Desde los preparativos íntimos hasta el último baile, documentamos cada capítulo de vuestra jornada hacia la felicidad eterna.",
    imageUrl:
      "/home/hero/hero11.webp",
    reverse: false,
  },
];

const Features: React.FC = () => {
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
    <div className="bg-[#F0EBE1] overflow-hidden">
      {/* Intro */}
      <div className="h-[50vh] w-screen flex flex-col items-center justify-center px-4 pt-24 text-center">
        <h1 className="text-black text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight mb-6">
          <span className="block">LA ALEGRÍA</span>
          <span className="block">DE SER VISTO</span>
        </h1>
        <p className="text-black text-lg md:text-xl lg:text-2xl font-normal max-w-2xl">
          — La pasión de reflejar y documentar el sueño más grande.
        </p>
        <Button variant="primary" className="my-10">Agenda tu sesión</Button>
      </div>

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
            <motion.div style={{ y: translateContents[index] }} className="w-full md:w-auto">
              <div className="text-black text-4xl md:text-6xl max-w-sm">
                {section.title}
              </div>
              <motion.p
                style={{ y: translateContents[index] }}
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
              className="relative w-full max-w-md h-[400px] md:w-80 md:h-[500px] lg:w-96 lg:h-[600px] overflow-hidden rounded-lg"
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
