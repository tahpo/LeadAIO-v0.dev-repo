"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechFlow",
    content:
      "LeadAIO increased our organic traffic by 215% in just 3 months. The AI recommendations are incredibly accurate.",
    avatar: "/professional-woman-headshot.png",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "SEO Specialist",
    company: "GrowthLabs",
    content: "Finally, an SEO tool that actually works. We're now ranking #1 for our most important keywords.",
    avatar: "/professional-man-headshot.png",
    rating: 5,
  },
  {
    name: "Jessica Williams",
    role: "Content Manager",
    company: "Elevate Digital",
    content: "The content optimization features are game-changing. Our blog posts now rank consistently in the top 3.",
    avatar: "/professional-woman-headshot-2.png",
    rating: 5,
  },
  {
    name: "David Rodriguez",
    role: "CTO",
    company: "SaaS Solutions",
    content: "The technical SEO audit found issues we didn't even know existed. Traffic increased 87% after fixes.",
    avatar: "/professional-man-headshot-2.png",
    rating: 5,
  },
  {
    name: "Emily Thompson",
    role: "E-commerce Manager",
    company: "StyleHub",
    content: "Our product pages are finally ranking! Organic revenue increased by 143% thanks to LeadAIO.",
    avatar: "/professional-woman-headshot-3.png",
    rating: 5,
  },
  {
    name: "Robert Kim",
    role: "Marketing VP",
    company: "Urban Eats",
    content: "Local SEO was always a mystery to us. Now we dominate Google Maps results in all our locations.",
    avatar: "/professional-man-headshot-3.png",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-4">Loved by thousands of businesses</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about their results with LeadAIO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
