"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import emailjs from '@emailjs/browser'
import styles from '@/app/contact/contact.module.css'

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [messageStatus, setMessageStatus] = useState<'success' | 'error' | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    company: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    
    setIsSubmitting(true)
    setMessageStatus(null)
    
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      
      setMessageStatus('success')
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        company: "",
        message: ""
      })
    } catch (error) {
      setMessageStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setMessageStatus(null), 5000)
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
              name="name"
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
              name="email"
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
            name="phone"
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
            name="company"
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
            name="service"
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

        {messageStatus && (
          <div className={`rounded-lg p-4 text-sm ${
            messageStatus === 'success' 
              ? 'bg-green-50 text-green-800' 
              : 'bg-red-50 text-red-800'
          }`}>
            {messageStatus === 'success' 
              ? 'Message sent successfully! We\'ll get back to you soon.' 
              : 'There was an error sending your message. Please try again.'}
          </div>
        )}

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black hover:bg-gray-800 text-white h-12 rounded-xl flex items-center justify-center gap-2 font-universal transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (<>Send Message <ArrowRight className="h-5 w-5" /></>)}
        </button>
      </div>
    </form> 
  )
}

export { ContactForm }
export default ContactForm