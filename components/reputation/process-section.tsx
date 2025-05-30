"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Search, BarChart2, MessageSquare, Shield } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Monitor",
    description: "Continuous monitoring across all review platforms and web mentions",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: BarChart2,
    title: "Analyze",
    description: "AI-powered sentiment analysis and trend identification",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: MessageSquare,
    title: "Respond",
    description: "Smart response suggestions and automated review management",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Shield,
    title: "Protect",
    description: "Proactive brand protection and crisis prevention",
    color: "bg-red-100 text-red-600",
  },
]

export function ReputationProcess() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-white to-indigo-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Our comprehensive approach to reputation management
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/4 right-0 w-full h-[2px] bg-gray-200">
                      <div className="absolute top-0 left-0 h-full bg-indigo-500 w-0 animate-progress"></div>
                    </div>
                  )}
                  
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative z-10">
                    <div className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-garnett mb-2">{step.title}</h3>
                    <p className="text-gray-600 font-universal text-sm">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}