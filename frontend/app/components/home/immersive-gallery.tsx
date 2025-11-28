import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// Types
interface IPicture {
  src: string;
  scale?: MotionValue<number>;
}

interface ImmersiveScrollGalleryProps {
  images?: IPicture[]; // Optional custom images array
  className?: string; // Optional className for container customization
}

// Defaults: solo src, sin scale para evitar errores TS
const DEFAULT_IMAGES: IPicture[] = [
  { src: "/home-imgs/hero/hero1.webp" },
  { src: "/home-imgs/hero/hero2.webp" },
  { src: "/home-imgs/hero/hero3.webp" },
  { src: "/home-imgs/hero/hero4.webp" },
  { src: "/home-imgs/hero/hero5.webp" },
  { src: "/home-imgs/hero/hero6.webp" },
  { src: "/home-imgs/hero/hero7.webp" },
];

const IMAGE_STYLES = [
  "w-[25vw] h-[25vh]",
  "w-[35vw] h-[30vh] -top-[30vh] left-[5vw]",
  "w-[20vw] h-[55vh] -top-[15vh] -left-[25vw]",
  "w-[25vw] h-[25vh] left-[27.5vw]",
  "w-[20vw] h-[30vh] top-[30vh] left-[5vw]",
  "w-[30vw] h-[25vh] top-[27.5vh] -left-[22.5vw]",
  "w-[15vw] h-[15vh] top-[22.5vh] left-[25vw]",
];

const ImmersiveScrollGallery: React.FC<ImmersiveScrollGalleryProps> = ({
  images = DEFAULT_IMAGES,
  className = "",
}) => {
  // Ref del contenedor
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll y transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  const opacityImage = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const opacitySection2 = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const sectionScale = useTransform(scrollYProgress, [0.6, 0.8], [0.8, 1]);

  // Asignar scales a cada imagen
  const pictures: IPicture[] = images.map((img, index) => ({
    ...img,
    scale: scales[index % scales.length],
  }));

  return (
    <div
      ref={containerRef}
      className={`relative h-[200vh] bg-[#F0EBE1] py-24 ${className}`}
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        {/* Imágenes con zoom */}
        {pictures.map(({ src, scale }, index) => (
          <motion.div
            key={index}
            style={{ scale, opacity: opacityImage }}
            className="absolute inset-0 flex items-center justify-center w-full h-full"
          >
            <div
              className={`relative ${
                IMAGE_STYLES[index % IMAGE_STYLES.length]
              }`}
            >
              <img
                src={src}
                alt={`Zoom image ${index + 1}`}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          </motion.div>
        ))}

        {/* Sección de contenido */}
        <motion.div
          style={{
            opacity: opacitySection2,
            scale: sectionScale,
          }}
          className="w-full h-full flex items-center justify-center max-w-3xl mx-auto p-8 relative"
        >
          <h1
            className="text-[#4b3f33] text-2xl md:text-3xl font-normal font-heading"
            style={{ lineHeight: 1.2 }}
          >
            Especializada en bodas y parejas, capturo los momentos más preciosos
            del amor mexicano — desde miradas cómplices hasta celebraciones
            llenas de color y tradición. Cada sesión es una historia de conexión
            genuina, donde inmortalizo la alegría, la intimidad y la magia
            cultural que hace únicas a las parejas mexicanas. Mi lente
            transforma emociones efímeras en arte eterno, celebrando el romance
            con elegancia contemporánea.
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default ImmersiveScrollGallery;
