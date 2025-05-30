"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, BarChart2, Globe, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export function ReputationFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-32 bg-white relative overflow-hidden -mt-16">
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
          {[
            {
              id: "review-monitoring",
              icon: Star,
              title: "Review Monitoring",
              description: "Track and analyze reviews across all major platforms in real-time.",
              color: "bg-yellow-100 text-yellow-600",
              className: "md:col-span-2 md:row-span-2 min-h-[320px]"
            },
            {
              id: "sentiment-analysis",
              icon: BarChart2,
              title: "Sentiment Analysis",
              description: "Advanced AI analysis of customer sentiment and trends.",
              color: "bg-purple-100 text-purple-600",
              className: "md:col-span-2 min-h-[160px]"
            },
            {
              id: "brand-protection",
              icon: Shield,
              title: "Brand Protection",
              description: "Proactive alerts and crisis prevention tools.",
              color: "bg-red-100 text-red-600",
              className: "md:col-span-1 min-h-[160px]"
            },
            {
              id: "web-monitoring",
              icon: Globe,
              title: "Web Monitoring",
              description: "Track mentions and coverage across the entire web.",
              color: "bg-green-100 text-green-600",
              className: "md:col-span-1 min-h-[160px]"
            }
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className={cn(
                  "bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100",
                  feature.className
                )}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${feature.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
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