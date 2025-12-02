import React, { useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import type { Variants } from "framer-motion"
import {
  FaHeart,
  FaEnvelope,
  FaInstagram,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaClipboardList,
  FaCamera,
  FaPaperPlane,
  FaRing,
  FaFeatherAlt,
} from "react-icons/fa"
import { GiLovers, GiDiamondRing } from "react-icons/gi"

type FormData = {
  brideFullName: string
  groomFullName: string
  email: string
  instagram: string
  weddingDate: string
  weddingCity: string
  weddingVenue: string
  guestCount: string
  weddingPlanner: string
  budget: string
  weddingDetails: string
  loveStory: string
}

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15])

  const [formData, setFormData] = useState<FormData>({
    brideFullName: "",
    groomFullName: "",
    email: "",
    instagram: "",
    weddingDate: "",
    weddingCity: "",
    weddingVenue: "",
    guestCount: "",
    weddingPlanner: "",
    budget: "",
    weddingDetails: "",
    loveStory: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }


  if (isSubmitted) {
    return (
      <section className="min-h-screen bg-[#F0EBE1] flex items-center justify-center px-4 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl"
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#BE9B5F]/20 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaHeart className="w-12 h-12 text-[#BE9B5F]" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C2A29] mb-6">
            ¡Gracias por escribirme!
          </h2>
          <p className="text-lg text-[#6B7280] mb-8">
            Me emociona mucho conocer su historia. Les responderé muy pronto para comenzar
            a planear juntos este capítulo tan especial de sus vidas.
          </p>
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#BE9B5F]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#F0EBE1] relative overflow-hidden py-32 px-4"
    >
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#BE9B5F]/8 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-[#BE9B5F]/10 blur-3xl"
        style={{ y: y2 }}
      />
      

      {/* Decorative lines */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,200 Q250,100 500,200 T1000,200"
          fill="none"
          stroke="#BE9B5F"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,500 Q250,400 500,500 T1000,500"
          fill="none"
          stroke="#BE9B5F"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,800 Q250,700 500,800 T1000,800"
          fill="none"
          stroke="#BE9B5F"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
        />
      </svg>

      <motion.div
        className="container mx-auto max-w-5xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-12 bg-[#BE9B5F]" />
            <FaHeart className="text-[#BE9B5F] w-4 h-4" />
            <div className="h-px w-12 bg-[#BE9B5F]" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C2A29] mb-8">
            CONTÁCTAME
          </h1>
          
          <motion.div
            className="h-1 w-24 bg-[#BE9B5F] mx-auto rounded-full mb-10"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Personal Message Card */}
        <motion.div
          className="relative mb-16"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl transform rotate-1" style={{ backgroundImage: 'url(/contact-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#E0D9CF] shadow-xl" style={{ backgroundImage: 'url(/contact-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-white/40 rounded-3xl" />
            <motion.div
              className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-[#BE9B5F] flex items-center justify-center z-20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <FaFeatherAlt className="w-5 h-5 text-white" />
            </motion.div>
            
            <div className="relative z-10 text-[#000000] leading-relaxed space-y-4 text-lg">
              <p>
                Me emociona muchísimo que se hayan interesado en mi trabajo, de verdad significa 
                mucho para mí la posibilidad de acompañarlos en un día tan especial. Cada boda 
                es única y mi intención siempre es contar su historia de la forma más auténtica 
                y cercana posible.
              </p>
              <p>
                Para poder conocerlos mejor y tener más claridad sobre lo que esperan de la 
                cobertura, les comparto este cuestionario. Sus respuestas me ayudarán a personalizar 
                la experiencia y asegurar que cada detalle importante quede guardado en recuerdos 
                que duren para siempre.
              </p>
              <p>
                Espero con muchísimas ganas que podamos trabajar juntos y ser parte de este 
                capítulo tan importante en sus vidas.
              </p>
              <p className="text-[#000000] font-medium italic text-xl pt-4">
                Con cariño,<br />
                Fernanda
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-12"
          variants={containerVariants}
        >
          {/* Section: About You */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#BE9B5F]/10 flex items-center justify-center border border-[#BE9B5F]/20">
                <GiLovers className="w-6 h-6 text-[#BE9B5F]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#2C2A29]">Sobre Ustedes</h2>
                <p className="text-sm text-[#6B7280]">Cuéntenme quiénes son</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                icon={<FaRing />}
                label="Nombre completo de la novia"
                name="brideFullName"
                value={formData.brideFullName}
                onChange={handleChange}
                placeholder="Ingresa el nombre de la novia"
                required
              />
              <FormField
                icon={<FaRing />}
                label="Nombre completo del novio"
                name="groomFullName"
                value={formData.groomFullName}
                onChange={handleChange}
                placeholder="Ingresa el nombre del novio"
                required
              />
              <FormField
                icon={<FaEnvelope />}
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                required
              />
              <FormField
                icon={<FaInstagram />}
                label="Instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@usuario"
              />
            </div>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
            className="flex items-center justify-center gap-4"
            variants={itemVariants}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#BE9B5F]/30 to-transparent" />
            <GiDiamondRing className="w-6 h-6 text-[#BE9B5F]/40" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#BE9B5F]/30 to-transparent" />
          </motion.div>

          {/* Section: Wedding Details */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#BE9B5F]/10 flex items-center justify-center border border-[#BE9B5F]/20">
                <FaCalendarAlt className="w-5 h-5 text-[#BE9B5F]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#2C2A29]">Detalles de la Boda</h2>
                <p className="text-sm text-[#6B7280]">La información de su gran día</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormField
                icon={<FaCalendarAlt />}
                label="Fecha de boda"
                name="weddingDate"
                type="date"
                value={formData.weddingDate}
                onChange={handleChange}
                required
              />
              <FormField
                icon={<FaMapMarkerAlt />}
                label="Ciudad de boda"
                name="weddingCity"
                value={formData.weddingCity}
                onChange={handleChange}
                placeholder="Ej: León, Guanajuato"
                required
              />
              <FormField
                icon={<FaMapMarkerAlt />}
                label="Venue de boda"
                name="weddingVenue"
                value={formData.weddingVenue}
                onChange={handleChange}
                placeholder="Nombre del venue"
              />
              <FormField
                icon={<FaUsers />}
                label="Número de invitados"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                placeholder="Ej: 150"
              />
              <FormField
                icon={<FaClipboardList />}
                label="Wedding planner"
                name="weddingPlanner"
                value={formData.weddingPlanner}
                onChange={handleChange}
                placeholder="Nombre del wedding planner (si aplica)"
              />
              <FormField
                icon={<FaCamera />}
                label="Presupuesto estimado"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Para la cobertura fotográfica"
              />
            </div>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
            className="flex items-center justify-center gap-4"
            variants={itemVariants}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#BE9B5F]/30 to-transparent" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#BE9B5F]/30 to-transparent" />
          </motion.div>

          {/* Section: Your Story */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#BE9B5F]/10 flex items-center justify-center border border-[#BE9B5F]/20">
                <FaFeatherAlt className="w-5 h-5 text-[#BE9B5F]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#2C2A29]">Su Historia</h2>
                <p className="text-sm text-[#6B7280]">Me encanta escuchar sus historias</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <TextAreaField
                label="Platícame más sobre tu boda"
                name="weddingDetails"
                value={formData.weddingDetails}
                onChange={handleChange}
                placeholder="¿Durará todo el fin de semana o te centrarás en un solo día? ¿Qué momentos y eventos son los más importantes para ti y que quieres documentar?"
                rows={5}
              />
              <TextAreaField
                label="Cuéntame más sobre su historia"
                name="loveStory"
                value={formData.loveStory}
                onChange={handleChange}
                placeholder="¿Cómo se conocieron? ¿Cómo se comprometieron? ¿Qué les gusta? ¡Me encanta escuchar sus historias!"
                rows={5}
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div 
            className="flex justify-center pt-8"
            variants={itemVariants}
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="group relative px-12 py-5 bg-[#2C2A29] text-white rounded-full font-medium text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#BE9B5F]/20 disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-[#BE9B5F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="relative flex items-center gap-3">
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <FaPaperPlane className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>

          {/* Footer note */}
          <motion.p 
            className="text-center text-sm text-[#6B7280] pt-4"
            variants={itemVariants}
          >
            Te responderé en un plazo de 24-48 horas
          </motion.p>
        </motion.form>
      </motion.div>
    </section>
  )
}

type FormFieldProps = {
  icon: React.ReactNode
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}

const FormField: React.FC<FormFieldProps> = ({
  icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label className="block text-sm font-medium text-[#4B5563] mb-2">
        {label}
        {required && <span className="text-[#BE9B5F] ml-1">*</span>}
      </label>
      <div className="relative">
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
            isFocused ? "text-[#BE9B5F]" : "text-[#9CA3AF]"
          }`}
        >
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 rounded-xl text-[#2C2A29] placeholder:text-[#9CA3AF] transition-all duration-300 focus:outline-none ${
            isFocused
              ? "border-[#BE9B5F] shadow-lg shadow-[#BE9B5F]/10"
              : "border-[#E0D9CF] hover:border-[#BE9B5F]/50"
          }`}
        />
      </div>
    </motion.div>
  )
}

type TextAreaFieldProps = {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  required?: boolean
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label className="block text-sm font-medium text-[#4B5563] mb-2">
        {label}
        {required && <span className="text-[#BE9B5F] ml-1">*</span>}
      </label>
      <div className="relative">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 rounded-xl text-[#2C2A29] placeholder:text-[#9CA3AF] transition-all duration-300 focus:outline-none resize-none ${
            isFocused
              ? "border-[#BE9B5F] shadow-lg shadow-[#BE9B5F]/10"
              : "border-[#E0D9CF] hover:border-[#BE9B5F]/50"
          }`}
        />
      </div>
    </motion.div>
  )
}

export default ContactSection

