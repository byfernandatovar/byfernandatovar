import React, { useState, useEffect, useRef } from "react"
import {
  FaCamera,
  FaRing,
  FaHeart,
  FaImages,
  FaCalendarAlt,
  FaStar,
  FaArrowRight,
  FaEdit,
} from "react-icons/fa"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import type { Variants } from "framer-motion"
import { GiPhotoCamera, GiBookCover } from "react-icons/gi"

type ServiceItemProps = {
  icon: React.ReactNode
  title: string
  description: string
  variants: Variants
  delay: number
  direction: "left" | "right"
}

type StatCounterProps = {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  delay: number
}

const AboutUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const statsRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const services = [
    {
      icon: <FaRing className="w-6 h-6" />,
      title: "Fotografía de Bodas",
      description:
        "Capturamos cada momento especial de tu boda con profesionalismo y creatividad. Desde la preparación hasta la recepción, cada detalle es documentado con cuidado y pasión.",
      position: "left" as const,
    },
    {
      icon: <FaHeart className="w-6 h-6" />,
      title: "Sesiones de Parejas",
      description:
        "Sesiones fotográficas personalizadas para parejas en lugares emblemáticos de León. Capturamos la química y el amor en cada imagen con un toque artístico único.",
      position: "left" as const,
    },
    {
      icon: <FaEdit className="w-6 h-6" />,
      title: "Edición Profesional",
      description:
        "Edición cuidadosa y personalizada de cada fotografía. Retoque profesional que realza la belleza natural, colores vibrantes y un acabado de galería.",
      position: "left" as const,
    },
    {
      icon: <FaImages className="w-6 h-6" />,
      title: "Galería Digital",
      description:
        "Acceso a tu galería digital privada con todas tus fotos. Descarga ilimitada en alta resolución y opciones de impresión en varios formatos.",
      position: "right" as const,
    },
    {
      icon: <GiBookCover className="w-6 h-6" />,
      title: "Álbumes Personalizados",
      description:
        "Álbumes de lujo personalizados con diseño exclusivo. Impresión de fotolibros de alta calidad que preservan tus recuerdos para siempre.",
      position: "right" as const,
    },
    {
      icon: <GiPhotoCamera className="w-6 h-6" />,
      title: "Cobertura Completa",
      description:
        "Cobertura de jornada completa para tu evento especial. Múltiples ángulos, momentos candentes y detalles que hacen único tu día.",
      position: "right" as const,
    },
  ]

  const stats = [
    { icon: <FaHeart />, value: 500, label: "Parejas Fotografiadas", suffix: "+" },
    { icon: <FaRing />, value: 250, label: "Bodas Capturadas", suffix: "+" },
    { icon: <FaCalendarAlt />, value: 8, label: "Años de Experiencia", suffix: "" },
    { icon: <FaStar />, value: 100, label: "Satisfacción de Clientes", suffix: "%" },
  ]

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-32 px-4 overflow-hidden relative bg-[#F0EBE1]"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#BE9B5F]/10 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#BE9B5F]/15 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#BE9B5F]/40"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#7D7873]/30"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#2C2A29]">
            SOY FERNANDA TOVAR
          </h2>
          <motion.div
            className="h-1 bg-[#BE9B5F] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p
          className="text-center max-w-3xl mx-auto mb-6 text-[#4B5563] text-lg"
          variants={itemVariants}
        >
          Fotógrafa profesional especializada en bodas y sesiones de parejas en León, Guanajuato.
          Mi pasión es capturar los momentos más especiales de tu vida con autenticidad, creatividad y profesionalismo.
        </motion.p>

        <motion.p
          className="text-center max-w-2xl mx-auto mb-16 text-[#6B7280]"
          variants={itemVariants}
        >
          Mi filosofía se basa en capturar la esencia real del amor. Cada boda, cada pareja tiene una historia única,
          y mi objetivo es congelar esos momentos mágicos en imágenes que perdurarán para siempre en tu memoria.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="rounded-md overflow-hidden shadow-xl bg-white/80"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <div className="relative w-full h-full">
                  <img
                    src="/about-img.png"
                    alt="Talento conectando marcas con audiencias"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  />
                </div>
              </motion.div>
              <motion.div
                className="absolute inset-0 border-4 border-[#E0D8CC]/70 rounded-md -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-[#BE9B5F]/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-[#7D7873]/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              />

              {/* Additional decorative elements */}
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#BE9B5F]/70"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#7D7873]/70"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  icon,
  title,
  description,
  variants,
  delay,
  direction,
}) => {
  return (
    <motion.div
      className="flex flex-col group"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-[#BE9B5F] bg-white p-3 rounded-lg transition-colors duration-300 group-hover:bg-[#F7EFE4] relative border border-[#E0D9CF]"
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-medium text-[#2C2A29] group-hover:text-[#4B5563] transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="text-sm text-[#6B7280] leading-relaxed pl-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 pl-12 flex items-center text-[#7D7873] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        <span className="flex items-center gap-1">
          Conoce más <FaArrowRight className="w-3 h-3" />
        </span>
      </motion.div>
    </motion.div>
  )
}

const StatCounter: React.FC<StatCounterProps> = ({ icon, value, label, suffix, delay }) => {
  const countRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(countRef, { once: false })
  const [hasAnimated, setHasAnimated] = useState(false)

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value)
      setHasAnimated(true)
    } else if (!isInView && hasAnimated) {
      springValue.set(0)
      setHasAnimated(false)
    }
  }, [isInView, value, springValue, hasAnimated])

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  return (
    <motion.div
      className="bg-white/70 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white transition-colors duration-300 border border-[#E0D9CF]"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-[#F4E9DA] flex items-center justify-center mb-4 text-[#BE9B5F] group-hover:bg-[#F0E0C5] transition-colors duration-300 border border-[#E0D9CF]"
      >
        {icon}
      </motion.div>
      <motion.div
        ref={countRef}
        className="text-3xl font-bold text-[#2C2A29] flex items-center"
      >
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-[#6B7280] text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-[#BE9B5F] mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  )
}

export default AboutUsSection
