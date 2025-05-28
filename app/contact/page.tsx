'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })

  // Updated with actual tech company logos
  const brands = [
    { name: "Vercel", logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" },
    { name: "Supabase", logo: "https://supabase.com/favicon/favicon-32x32.png" },
    { name: "Prisma", logo: "https://prismalens.vercel.app/header/logo-dark.svg" },
    { name: "Railway", logo: "https://railway.app/brand/logo-light.svg" },
    { name: "Planetscale", logo: "https://planetscale.com/favicon.svg" },
    { name: "Stripe", logo: "https://stripe.com/img/v3/home/social.png" },
    { name: "Algolia", logo: "https://www.algolia.com/algoliaweb-static-favicons/light-mode/favicon-32x32.png" },
    { name: "Cloudflare", logo: "https://www.cloudflare.com/favicon.ico" }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <>
      <Header />
      
      {/* Main content */}
      <main className="flex-grow pt-28">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            {/* Left Column - Title */}
            <div className="lg:pt-12">
              <h1 className="text-4xl md:text-5xl font-garnett mb-6">Let's talk about your project</h1>
              <p className="text-lg text-gray-600 max-w-xl font-universal">
                Ready to take your search rankings to the next level? We're here to help you achieve your SEO goals.
              </p>
              
              {/* Contact Cards - Moved and resized */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto pt-[420px]">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-garnett text-xl mb-2">Email</h3>
                  <p className="text-gray-600">hello@company.com</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-garnett text-xl mb-2">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-garnett text-xl mb-2">Office</h3>
                  <p className="text-gray-600">123 SEO Street, NY</p>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-black focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-black focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-black focus:border-black"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Brands Section */}
          <div className="py-12 bg-white overflow-hidden">
            <div className="flex space-x-12 animate-scroll">
              {[...brands, ...brands].map((brand, i) => (
                <div key={i} className="flex-none grayscale opacity-50 hover:opacity-75 transition-opacity">
                  <img src={brand.logo} alt={brand.name} className="h-8 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}