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
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar mensaje de error al escribir
    if (errorMessage) setErrorMessage("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")
    
    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setIsSubmitted(true)
      } else {
        setErrorMessage(result.error || 'Error sending the form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrorMessage('Connection error. Please check your internet and try again.')
    } finally {
      setIsSubmitting(false)
    }
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
            Thank you for reaching out!
          </h2>
          <p className="text-lg text-[#6B7280] mb-8">
            I'm thrilled to learn your story. I'll get back to you very soon to start
            planning together this special chapter of your lives.
          </p>
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
          style={{ backgroundImage: 'url(/contact-bg.webp)' }}
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
              CONTACT ME
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
                I’m truly excited that you’re interested in my work. Every wedding is unique, 
                and my intention is to tell your story in an authentic and heartfelt way.
                </p>
                <p>
                To get to know you better and understand what you’re looking for, I’m sharing this questionnaire.
                Your answers will help me personalize the experience and make sure the important moments are captured with intention..
                </p>
                <p>
                Looking forward to connecting with you.
                </p>
                <p className="text-white font-medium italic text-xl pt-4">
                  Warmly,<br />
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
              <h2 className="text-2xl font-bold text-[#2C2A29]">About You</h2>
              <p className="text-sm text-[#6B7280]">Tell me about yourselves</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Bride's Full Name"
                name="brideFullName"
                value={formData.brideFullName}
                onChange={handleChange}
                placeholder="Enter the bride's name"
                required
              />
              <FormField
                label="Groom's Full Name"
                name="groomFullName"
                value={formData.groomFullName}
                onChange={handleChange}
                placeholder="Enter the groom's name"
                required
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
              <FormField
                label="Instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@username"
                required
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
              <h2 className="text-2xl font-bold text-[#2C2A29]">Wedding Details</h2>
              <p className="text-sm text-[#6B7280]">Information about your big day</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormField
                label="Wedding Date"
                name="weddingDate"
                type="date"
                value={formData.weddingDate}
                onChange={handleChange}
                required
              />
              <FormField
                label="Wedding City"
                name="weddingCity"
                value={formData.weddingCity}
                onChange={handleChange}
                placeholder="E.g: León, Guanajuato"
                required
              />
              <FormField
                label="Wedding Venue"
                name="weddingVenue"
                value={formData.weddingVenue}
                onChange={handleChange}
                placeholder="Venue name"
                required
              />
              <FormField
                label="Number of Guests"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                placeholder="E.g: 150"
                required
              />
              <FormField
                label="Wedding Planner"
                name="weddingPlanner"
                value={formData.weddingPlanner}
                onChange={handleChange}
                placeholder="Wedding planner name (if applicable)"
                required
              />
              <FormField
                label="Estimated Budget (MXN)"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="For the photography coverage"
                prefix="$"
                required
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
              <h2 className="text-2xl font-bold text-[#2C2A29]">Your Story</h2>
              <p className="text-sm text-[#6B7280]">I love hearing your stories</p>
            </div>
            
            <div className="space-y-6">
              <TextAreaField
                label="Tell me more about your wedding"
                name="weddingDetails"
                value={formData.weddingDetails}
                onChange={handleChange}
                placeholder="Will it last the whole weekend or will you focus on just one day? What moments and events are most important to you and which ones do you want documented?"
                rows={5}
                required
              />
              <TextAreaField
                label="Tell me more about your story"
                name="loveStory"
                value={formData.loveStory}
                onChange={handleChange}
                placeholder="How did you meet? How did you get engaged? What do you like? I love hearing your stories!"
                rows={5}
                required
              />
            </div>
          </motion.div>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center"
              variants={itemVariants}
            >
              <p className="text-red-600 font-medium">{errorMessage}</p>
            </motion.div>
          )}

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
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
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
            I'll get back to you within 24-48 hours
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
  prefix?: string
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  prefix,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const dateInputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Evitar que se pueda escribir manualmente en el campo de fecha
    if (type === "date" && e.key !== "Tab") {
      e.preventDefault()
    }
  }

  const handleDateClick = () => {
    if (type === 'date' && dateInputRef.current) {
      dateInputRef.current.showPicker?.()
    }
  }

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
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C2A29] font-medium z-10">
            {prefix}
          </span>
        )}
        <input
          ref={type === 'date' ? dateInputRef : undefined}
          type={type}
          name={name}
          inputMode={type === 'date' ? 'none' : undefined}
          value={value}
          onChange={onChange}
          onFocus={() => {
            setIsFocused(true)
            if (type === 'date' && dateInputRef.current) {
              dateInputRef.current.showPicker?.()
            }
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          onClick={type === 'date' ? handleDateClick : undefined}
          placeholder={placeholder}
          required={required}
          className={`w-full ${prefix ? 'pl-8' : 'pl-4'} ${type === 'date' ? 'pr-12' : 'pr-4'} py-4 bg-white/80 ${type === 'date' ? 'bg-white' : 'backdrop-blur-sm'} border-2 rounded-xl text-[#2C2A29] placeholder:text-[#9CA3AF] transition-all duration-300 focus:outline-none ${
            type === 'date' ? 'cursor-pointer select-none' : ''
          } ${
            isFocused
              ? "border-[#BE9B5F] shadow-lg shadow-[#BE9B5F]/10"
              : "border-[#E0D9CF] hover:border-[#BE9B5F]/50"
          }`}
        />
        {type === 'date' && (
          <div 
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10"
          >
            <svg 
              className="w-5 h-5 text-[#6B7280]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
        )}
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

