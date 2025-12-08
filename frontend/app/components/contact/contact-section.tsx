import React, { useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import type { Variants } from "framer-motion"

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
      className="bg-[#F0EBE1] relative overflow-hidden"
    >
      {/* Hero Section with Image Background */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/contact-bg.jpg)' }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#BE9B5F]/10 blur-3xl"
          style={{ y: y1, rotate: rotate1 }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-[#BE9B5F]/15 blur-3xl"
          style={{ y: y2 }}
        />

        {/* Content Overlay */}
        <motion.div
          className="container mx-auto max-w-5xl relative z-10 px-4 py-32"
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
              
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
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
            className="relative"
            variants={itemVariants}
          >
            <div className="relative bg-transparent rounded-3xl p-8 md:p-12">
              
              <div className="relative z-10 text-white leading-relaxed space-y-4 text-lg drop-shadow-lg">
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
                <p className="text-white font-medium italic text-xl pt-4">
                  Con cariño,<br />
                  Fernanda
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Form Section - Below the image */}
      <div className="bg-[#F0EBE1] relative py-20 px-4">
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
        </svg>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="container mx-auto max-w-5xl space-y-12 relative z-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section: About You */}
          <motion.div variants={itemVariants}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C2A29]">Sobre Ustedes</h2>
              <p className="text-sm text-[#6B7280]">Cuéntenme quiénes son</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Nombre completo de la novia"
                name="brideFullName"
                value={formData.brideFullName}
                onChange={handleChange}
                placeholder="Ingresa el nombre de la novia"
                required
              />
              <FormField
                label="Nombre completo del novio"
                name="groomFullName"
                value={formData.groomFullName}
                onChange={handleChange}
                placeholder="Ingresa el nombre del novio"
                required
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                required
              />
              <FormField
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
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#BE9B5F]/30 to-transparent" />
          </motion.div>

          {/* Section: Wedding Details */}
          <motion.div variants={itemVariants}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C2A29]">Detalles de la Boda</h2>
              <p className="text-sm text-[#6B7280]">La información de su gran día</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormField
                label="Fecha de boda"
                name="weddingDate"
                type="date"
                value={formData.weddingDate}
                onChange={handleChange}
                required
              />
              <FormField
                label="Ciudad de boda"
                name="weddingCity"
                value={formData.weddingCity}
                onChange={handleChange}
                placeholder="Ej: León, Guanajuato"
                required
              />
              <FormField
                label="Venue de boda"
                name="weddingVenue"
                value={formData.weddingVenue}
                onChange={handleChange}
                placeholder="Nombre del venue"
              />
              <FormField
                label="Número de invitados"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                placeholder="Ej: 150"
              />
              <FormField
                label="Wedding planner"
                name="weddingPlanner"
                value={formData.weddingPlanner}
                onChange={handleChange}
                placeholder="Nombre del wedding planner (si aplica)"
              />
              <FormField
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
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C2A29]">Su Historia</h2>
              <p className="text-sm text-[#6B7280]">Me encanta escuchar sus historias</p>
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
      </div>
    </section>
  )
}

type FormFieldProps = {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}

const FormField: React.FC<FormFieldProps> = ({
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
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 rounded-xl text-[#2C2A29] placeholder:text-[#9CA3AF] transition-all duration-300 focus:outline-none ${
          isFocused
            ? "border-[#BE9B5F] shadow-lg shadow-[#BE9B5F]/10"
            : "border-[#E0D9CF] hover:border-[#BE9B5F]/50"
        }`}
      />
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

