"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Marketing Director",
    company: "TechFlow",
    content: "LeadAIO's reputation management tools have been a game-changer. We've seen a 215% increase in positive reviews.",
    avatar: "/professional-woman-headshot.png",
    rating: 5,
    metric: "+215% reviews",
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "GrowthLabs",
    content: "The automated review response suggestions save us hours every week. Our response rate has improved significantly.",
    avatar: "/professional-man-headshot.png",
    rating: 5,
    metric: "4h saved/day",
  },
  {
    name: "Jessica Williams",
    role: "Operations Manager",
    company: "Elevate Digital",
    content: "The sentiment analysis helps us catch potential issues before they become problems. Excellent proactive tool.",
    avatar: "/professional-woman-headshot-2.png",
    rating: 5,
    metric: "92% accuracy",
  }
]

export function ReputationTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            See how businesses are transforming their online reputation with our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="mb-6 text-gray-600 leading-relaxed font-universal text-sm">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3 border-2 border-gray-100">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-gray-100 text-gray-800 font-universal text-xs">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-garnett text-gray-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500 font-universal">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-garnett text-green-600">{testimonial.metric}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}