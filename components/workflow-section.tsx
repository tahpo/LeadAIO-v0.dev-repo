"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const workflowItems = [
    { label: "Keyword Research", icon: "🔍" },
    { label: "Content Optimization", icon: "📝" },
    { label: "Technical SEO", icon: "⚡" },
    { label: "Link Building", icon: "🔗" },
    { label: "Rank Tracking", icon: "📈" },
    { label: "AI Analysis", icon: "🤖" },
    { label: "Performance Reports", icon: "📊" },
    { label: "Competitor Analysis", icon: "🎯" },
    { label: "24/7 Monitoring", icon: "👀" },
    { label: "Expert Support", icon: "💬" },
  ]

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-universal text-gray-800 mb-4">
            Comprehensive Services
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4 text-gray-900">Everything you need to dominate search</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Our comprehensive AI-powered platform combined with expert SEO services gives you everything needed to improve 
            your search rankings and grow your business.
          </p>
        </div>

        <div className="section-panel">
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {workflowItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-3 flex items-center gap-3 hover-lift"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-garnett">{item.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="/signup" className="index-button index-button-primary inline-flex items-center gap-2">
              Get started with LeadAIO
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
