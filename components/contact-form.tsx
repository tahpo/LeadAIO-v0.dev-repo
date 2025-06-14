"use client"

import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import styles from '@/app/contact/contact.module.css'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    company: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formRef.current) return
    
    setIsSubmitting(true)
    
    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      
      console.log('Email sent successfully:', result.text)
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        company: "",
        message: ""
      })
      toast.success('Message sent successfully!', {
        description: "We'll get back to you within 24 hours.",
        duration: 5000
      })
    } catch (error) {
      console.error('Failed to send email:', error) 
      toast.error('Failed to send message', {
        description: "Please try again later.",
        duration: 5000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <h2 className="text-2xl md:text-3xl font-garnett mb-2">Send us a message</h2>
      <p className="text-gray-600 mb-8 font-universal">
        Fill out the form below and we'll get back to you within 24 hours.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-universal text-gray-700 mb-2">
              Name
            </label>
            <Input
              id="name"
              name="user_name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-universal text-gray-700 mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              name="user_email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full"
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-universal text-gray-700 mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            name="user_phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full"
            placeholder="+1 (234) 567-890"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-universal text-gray-700 mb-2">
            Company
          </label>
          <Input
            id="company"
            name="user_company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-universal text-gray-700 mb-2">
            Service Interested In
          </label>
          <select
            id="service"
            name="user_service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="">Select a service</option>
            <option value="aio">AI-Powered SEO (AIO)</option>
            <option value="reputation">Reputation Management</option>
            <option value="ppc">Paid Advertising</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-universal text-gray-700 mb-2">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full min-h-[120px]"
            placeholder="Tell us about your project..."
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white h-12 rounded-xl flex items-center justify-center gap-2 font-universal transition-all duration-200 hover:-translate-y-0.5"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}

export { ContactForm }
export default ContactForm