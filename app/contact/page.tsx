"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
            {/* Left Column - Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-garnett mb-6">Let's talk about your project</h1>
              <p className="text-lg text-gray-600 max-w-xl font-universal">
                Ready to take your search rankings to the next level? We're here to help you achieve your SEO goals.
              </p>
            </div>

            {/* Right Column - Contact Form */}
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

                <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white py-6 rounded-xl flex items-center justify-center gap-2 font-universal">
                  Send Message <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-garnett mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-4 font-universal">Drop us a line anytime</p>
              <a href="mailto:hello@leadaio.com" className="text-blue-600 hover:text-blue-700 font-universal">
                hello@leadaio.com
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-garnett mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4 font-universal">Chat with our team</p>
              <button className="text-green-600 hover:text-green-700 font-universal">
                Start a conversation
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-garnett mb-2">Phone</h3>
              <p className="text-gray-600 text-sm mb-4 font-universal">Mon-Fri from 8am to 5pm</p>
              <a href="tel:+1234567890" className="text-purple-600 hover:text-purple-700 font-universal">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for header */}
      <div className="h-24"></div>

      <FooterSection />
    </main>
  )
}