import React, { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import type { Variants } from "framer-motion"

const AboutUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const isTextInView = useInView(textRef, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const fadeUp: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  }

  const paragraphs = [
    "The camera has been my way of understanding the world: observing calmly, feeling before I shoot, finding beauty even in the silences.",
    "My style lives between the elegant and the documentary. I don't seek rigid poses or scenes that feel foreign. I prefer what happens naturally: sincere glances, gestures that say more than words, moments that never repeat.",
    "I work from presence. From being there, really there.",
    "Sometimes I guide, but most of the time I listen to what the moment asks for: soft light, a minimal movement, a second of intimacy that becomes eternal.",
  ]

  const closingParagraphs = [
    "I don't pursue technical perfection as a goal.",
    "I pursue something far more valuable: photographs that have soul.",
    "Images that you can see years later and still feel alive.",
  ]

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full min-h-screen relative bg-[#F0EBE1] overflow-hidden"
    >
      {/* Hero section with main image */}
      <div className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left content */}
            <motion.div 
              className="lg:col-span-5 order-2 lg:order-1"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {/* Name intro */}
              <motion.div variants={fadeUp} className="mb-12">
                <h2 className="mt-12 text-5xl md:text-6xl lg:text-7xl font-light text-[#000000] leading-[1.1]">
                  I'm <span className="italic font-normal text-[#BE9B5F]">Fer</span>,
                </h2>
                <p className="mt-2 text-2xl md:text-3xl text-[#000000] font-light">
                  photographer for 13 years.
                </p>
              </motion.div>

              {/* First paragraph - highlighted */}
              <motion.p 
                variants={fadeUp}
                className="text-lg md:text-xl text-[#000000] font-light leading-relaxed mb-8 border-l-2 border-[#BE9B5F]/50 pl-6"
              >
                {paragraphs[0]}
              </motion.p>

              {/* Decorative element */}
              <motion.div 
                variants={fadeIn}
                className="flex items-center gap-4 my-10"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-[#000000]/40 to-transparent" />
                <div className="w-2 h-2 rounded-full bg-[#BE9B5F]/60" />
              </motion.div>

              {/* Second paragraph */}
              <motion.p 
                variants={fadeUp}
                className="text-[#000000] leading-relaxed text-base md:text-lg"
              >
                {paragraphs[1]}
              </motion.p>
            </motion.div>

            {/* Right - Main image */}
            <motion.div 
              className="lg:col-span-7 order-1 lg:order-2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                {/* Main image container */}
                <motion.div 
                  className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden"
                  style={{ y: y2 }}
                >
                  <img
                    src="/about-img.webp"
                    alt="Fernanda Tovar - Photographer"
                    className="w-full h-full object-cover grayscale-[20%] contrast-[1.05]"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816]/60 via-transparent to-[#1a1816]/20" />
                </motion.div>

                {/* Second smaller image */}
                <motion.div
                  className="absolute -bottom-8 -left-8 md:-bottom-16 md:-left-16 w-32 h-40 md:w-48 md:h-60 overflow-hidden shadow-2xl z-10 m-6"
                  style={{ y: y1 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <img
                    src="/about-img-2.webp"
                    alt="Fernanda working"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border border-[#BE9B5F]/30" />
                </motion.div>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={fadeIn}
            className="flex items-center justify-center gap-6 mt-24 md:hidden"
          >
            <div className="h-px w-16 md:w-32 bg-[#BE9B5F]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#BE9B5F]/50" />
            <div className="h-px w-16 md:w-32 bg-[#BE9B5F]/30" />
          </motion.div>
        </div>
      </div>

      {/* Second section - Philosophy - Editorial Style */}
      <motion.div 
        ref={textRef}
        className="relative md:pt-24 pt-12 bg-[#F0EBE1]"
        initial="hidden"
        animate={isTextInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Big statement - Presencia */}
          <motion.div 
            variants={fadeUp}
            className="max-w-5xl mx-auto mb-16 md:mb-24"
          >
            <div className="relative">
              <h1 className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-light text-[#2C2A29] leading-[1.3] tracking-tight">
                I work from <span className="italic text-[#BE9B5F]">presence</span>.
              </h1>
              <p className="relative z-10 mt-2 text-2xl md:text-4xl lg:text-5xl font-light text-[#5C5856] leading-[1.3]">
                From being there, really there.
              </p>
            </div>
          </motion.div>

          {/* Flowing paragraph */}
          <motion.div 
            variants={fadeUp}
            className="max-w-2xl ml-auto mr-0 md:mr-20 mb-20 md:mb-32"
          >
            <p className="text-lg md:text-xl text-[#3D3B39] text-right leading-relaxed font-light">
              Sometimes I guide, but most of the time I listen to what the moment asks for: 
              <span className="text-[#BE9B5F]"> soft light</span>, a minimal movement, 
              a second of <span className="italic">intimacy</span> that becomes eternal.
            </p>
          </motion.div>

          {/* Poetic closing - Stacked lines */}
          <motion.div
            variants={fadeUp}
            className="max-w-3xl ml-0 md:ml-20 mb-20"
          >
            <div className="space-y-6 md:space-y-8">
              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl text-[#6B6866] font-light"
              >
                I don't pursue technical perfection as a goal.
              </motion.p>

              <motion.div variants={fadeUp}>
                <p className="text-2xl md:text-4xl text-[#2C2A29] font-light">
                  I pursue something far more valuable:
                </p>
                <p className="mt-2 text-3xl md:text-5xl text-[#BE9B5F] italic font-light">
                  photographs that have soul.
                </p>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-[#5C5856] italic pt-4"
              >
                Images that you can see years later and still feel alive.
              </motion.p>
            </div>
          </motion.div>

          {/* Final intention - Right aligned */}
          <motion.div
            variants={fadeUp}
            className="max-w-xl ml-auto mr-0 text-right mb-20"
          >
            <p className="text-lg md:text-xl text-[#3D3B39] leading-relaxed font-light mb-6">
              My intention is simple: create photos that feel
              <span className="text-[#BE9B5F] font-normal"> elegant</span>,
              <span className="text-[#BE9B5F] font-normal"> honest</span> and
              <span className="text-[#BE9B5F] font-normal"> deeply</span>
              <span className="text-[#BE9B5F] font-bold italic"> yours</span>.
            </p>
            <p className="text-base md:text-lg text-[#7D7873] italic mb-6">
              If our energy combines, everything else flows.
            </p>

            {/* Signature */}
            <motion.div
              className="flex justify-end items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
            </motion.div>
          </motion.div>

          {/* Horizontal divider */}
          <motion.div
            variants={fadeIn}
            className="flex items-center justify-center gap-6 mb-20"
          >
            <div className="h-px w-16 md:w-32 bg-[#BE9B5F]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#BE9B5F]/50" />
            <div className="h-px w-16 md:w-32 bg-[#BE9B5F]/30" />
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}

export default AboutUsSection
