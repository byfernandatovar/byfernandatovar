import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"

const AboutCta: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ctaRef, { once: true, amount: 0.5 })

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact-section")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    } else {
      // If on a different page, navigate to contact
      window.location.href = "/contact"
    }
  }

  return (
    <motion.div
      ref={ctaRef}
      className="relative pb-24 bg-[#F0EBE1] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">

          {/* Heading */}
          <motion.p
            className="text-xl md:text-2xl text-[#5C5856] font-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Capturing your story, your essence
          </motion.p>

          <motion.h3
            className="text-3xl md:text-4xl lg:text-5xl text-[#2C2A29] font-light leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Let's create <span className="italic text-[#BE9B5F]">together</span>
          </motion.h3>

          {/* CTA Button */}
          <motion.button
            onClick={handleScrollToContact}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#2C2A29] text-white rounded-full overflow-hidden transition-all duration-500 hover:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background hover effect */}
            <span className="absolute inset-0 bg-[#BE9B5F] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            
            <span className="relative z-10 text-base md:text-lg font-light tracking-wide">
              Let's talk
            </span>
            <FaArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutCta

