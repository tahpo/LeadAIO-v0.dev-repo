"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, MessageSquare, BarChart2, Globe, Shield, Users } from "lucide-react"

const features = [
  {
    icon: Star,
    title: "Review Monitoring",
    description: "Track and analyze reviews across all major platforms in real-time.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: MessageSquare,
    title: "Smart Response",
    description: "AI-powered response suggestions for reviews and mentions.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: BarChart2,
    title: "Sentiment Analysis",
    description: "Advanced AI analysis of customer sentiment and trends.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Globe,
    title: "Web Monitoring",
    description: "Track mentions and coverage across the entire web.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Shield,
    title: "Brand Protection",
    description: "Proactive alerts and crisis management tools.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Users,
    title: "Customer Insights",
    description: "Deep analytics into customer feedback and preferences.",
    color: "bg-orange-100 text-orange-600",
  },
]

export function ReputationFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            Complete Reputation Management Suite
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Everything you need to build, monitor, and maintain your online reputation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-garnett mb-2">{feature.title}</h3>
                <p className="text-gray-600 font-universal">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}