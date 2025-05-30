"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, MessageSquare, BarChart2, Globe, Shield, Users, TrendingUp, Award } from "lucide-react"

const features = [
  {
    icon: Star, 
    title: "Review Monitoring", 
    description: "Track and analyze reviews across all major platforms in real-time.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100",
  },
  {
    icon: MessageSquare,
    title: "Smart Response",
    description: "AI-powered response suggestions for reviews and mentions.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100",
  },
  {
    icon: BarChart2,
    title: "Sentiment Analysis",
    description: "Advanced AI analysis of customer sentiment and trends.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100",
  },
  {
    icon: Globe,
    title: "Web Monitoring",
    description: "Track mentions and coverage across the entire web.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100",
  },
  {
    icon: Shield,
    title: "Brand Protection",
    description: "Proactive alerts and crisis management tools.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100",
  },
  {
    icon: Users,
    title: "Customer Insights",
    description: "Deep analytics into customer feedback and preferences.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100",
  },
]

export function ReputationFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden mb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-full text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            Complete Reputation Management Suite
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Everything you need to build, monitor, and maintain your online reputation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`${feature.className} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="h-6 w-6 text-gray-700" />
                  <h3 className="text-xl font-garnett">{feature.title}</h3>
                </div>
                <p className="text-gray-600 font-universal">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}