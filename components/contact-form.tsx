"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="bg-[#fdfcfa] rounded-2xl p-8 md:p-12 shadow-sm">
      <h2 className="text-2xl md:text-3xl font-garnett mb-2">Send us a message</h2>
      <p className="text-gray-600 mb-8 font-universal">
        Fill out the form below and we'll get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-universal text-gray-700 mb-2">
              Name
            </label>
            <Input
              id="name"
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-universal text-gray-700 mb-2">
            Company
          </label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-universal text-gray-700 mb-2">
            Message
          </label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full min-h-[120px]"
            placeholder="Tell us about your project..."
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-black hover:bg-gray-800 text-white h-[60px] rounded-xl flex items-center justify-center gap-2 font-universal contact-submit"
        >
          Send Message <ArrowRight className="h-5 w-5" />
        </Button>
      </form>
    </div>
  )
}