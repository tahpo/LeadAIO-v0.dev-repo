"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, MessageSquare, BarChart2, Globe, Shield, Users, TrendingUp, Award } from "lucide-react"

const features = [
  {
    icon: Star,
    title: "Review Monitoring",
    description: "Track and analyze reviews across all major platforms in real-time.",
    bgColor: "bg-yellow-50/50",
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100"
  },
  {
    icon: MessageSquare,
    title: "Smart Response",
    description: "AI-powered response suggestions for reviews and mentions.",
    bgColor: "bg-blue-50/50",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100"
  },
  {
    icon: BarChart2,
    title: "Sentiment Analysis",
    description: "Advanced AI analysis of customer sentiment and trends.",
    bgColor: "bg-purple-50/50",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100"
  },
  {
    icon: Globe,
    title: "Web Monitoring",
    description: "Track mentions and coverage across the entire web.",
    bgColor: "bg-green-50/50",
    iconColor: "text-green-600",
    iconBg: "bg-green-100"
  },
  {
    icon: Shield,
    title: "Brand Protection",
    description: "Proactive alerts and crisis management tools.",
    bgColor: "bg-red-50/50",
    iconColor: "text-red-600",
    iconBg: "bg-red-100"
  },
  {
    icon: Users,
    title: "Customer Insights",
    description: "Deep analytics into customer feedback and preferences.",
    bgColor: "bg-orange-50/50",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100"
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Track reputation metrics and growth over time.",
    bgColor: "bg-indigo-50/50", 
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100"
  }
];

export function ReputationFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-24 bg-white relative">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${feature.bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${index === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 ${feature.iconBg} rounded-lg`}>
                  <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-garnett">{feature.title}</h3>
              </div>
              <p className="text-gray-600 font-universal text-sm pb-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}