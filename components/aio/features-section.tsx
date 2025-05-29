"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, BarChart2, Zap, Target, Globe, FileText } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Smart Keyword Research",
    description: "AI-powered keyword discovery that finds opportunities your competitors miss.",
    color: "bg-blue-500",
  },
  {
    icon: BarChart2,
    title: "Real-time Rank Tracking",
    description: "Monitor your search positions across all major search engines with precision.",
    color: "bg-purple-500",
  },
  {
    icon: FileText,
    title: "Content Optimization",
    description: "Create SEO-optimized content that ranks higher and converts better.",
    color: "bg-pink-500",
  },
  {
    icon: Zap,
    title: "Technical SEO Audits",
    description: "Identify and fix technical issues that are holding back your rankings.",
    color: "bg-orange-500",
  },
  {
    icon: Globe,
    title: "Local SEO",
    description: "Dominate local search results and attract nearby customers.",
    color: "bg-green-500",
  },
  {
    icon: Target,
    title: "Competitor Analysis",
    description: "Spy on your competitors and steal their best SEO strategies.",
    color: "bg-red-500",
  },
]

export function AIOFeatures() {
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-garnett mb-4">
              Everything you need to dominate search
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-universal">
              Our comprehensive AI-powered platform gives you all the tools to improve your search rankings and grow
              your business.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className={`w-12 h-12 ${feature.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${feature.color.replace('bg-', 'text-')}`} />
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