// Remove client directive since this component uses SSR

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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
    metric: "+215% traffic",
  },
  {
    name: "Michael Chen",
    role: "SEO Specialist",
    company: "GrowthLabs",
    content: "Finally, an SEO tool that actually works. We're now ranking #1 for our most important keywords.",
    avatar: "/professional-man-headshot.png",
    rating: 5,
    metric: "#1 rankings",
  },
  {
    name: "Jessica Williams",
    role: "Content Manager",
    company: "Elevate Digital",
    content: "The content optimization features are game-changing. Our blog posts now rank consistently in the top 3.",
    avatar: "/professional-woman-headshot-2.png",
    rating: 5,
    metric: "Top 3 positions",
  },
  {
    name: "David Rodriguez",
    role: "CTO",
    company: "SaaS Solutions",
    content: "The technical SEO audit found issues we didn't even know existed. Traffic increased 87% after fixes.",
    avatar: "/professional-man-headshot-2.png",
    rating: 5,
    metric: "+87% traffic",
  },
  {
    name: "Emily Thompson",
    role: "E-commerce Manager",
    company: "StyleHub",
    content: "Our product pages are finally ranking! Organic revenue increased by 143% thanks to LeadAIO.",
    avatar: "/professional-woman-headshot-3.png",
    rating: 5,
    metric: "+143% revenue",
  },
  {
    name: "Robert Kim",
    role: "Marketing VP",
    company: "Urban Eats",
    content: "Local SEO was always a mystery to us. Now we dominate Google Maps results in all our locations.",
    avatar: "/professional-man-headshot-3.png",
    rating: 5,
    metric: "95% local growth",
  },
]

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // MUCH FASTER SPEED - increased from 1500px to 2500px
  const leftColumnY = useTransform(scrollYProgress, [0, 1], [0, -2500]) // Goes UP faster
  const rightColumnY = useTransform(scrollYProgress, [0, 1], [-2000, 500]) // Starts higher, more content above

  // Split testimonials into two columns
  const leftColumn = testimonials.filter((_, i) => i % 2 === 0)
  const rightColumn = testimonials.filter((_, i) => i % 2 === 1)

  // EVEN MORE MASSIVE duplication for seamless looping above and below
  const massiveLeftColumn = [
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
    ...leftColumn,
  ]
  const massiveRightColumn = [
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
    ...rightColumn,
  ]

  return (
    <section id="testimonials" ref={containerRef} className="py-20 bg-white relative">
      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-universal text-gray-800 mb-4">
            Customer stories
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4 text-gray-900">Loved by thousands of businesses</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            See what our customers are saying about their results with LeadAIO
          </p>
        </div>

        <div className="section-panel bg-cream overflow-hidden relative" style={{ height: "800px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto relative h-full">
            {/* Left Column - moves UP (negative direction) */}
            <div className="relative overflow-hidden h-full">
              <motion.div style={{ y: leftColumnY }} className="space-y-6">
                {massiveLeftColumn.map((testimonial, index) => (
                  <Card key={`left-${index}`} className="bg-white shadow-sm hover-lift border border-gray-100">
                    <CardContent className="p-5 relative">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <p className="mb-4 text-gray-600 leading-relaxed font-universal text-sm">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3 border-2 border-gray-100">
                            <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
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
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>

            {/* Right Column - moves DOWN (positive direction) */}
            <div className="relative overflow-hidden h-full">
              <motion.div style={{ y: rightColumnY }} className="space-y-6">
                {massiveRightColumn.map((testimonial, index) => (
                  <Card key={`right-${index}`} className="bg-white shadow-sm hover-lift border border-gray-100">
                    <CardContent className="p-5 relative">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <p className="mb-4 text-gray-600 leading-relaxed font-universal text-sm">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3 border-2 border-gray-100">
                            <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
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
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
