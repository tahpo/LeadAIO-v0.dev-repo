"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import anime from 'animejs'

export function AIOWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const duration = 20000 // 20 seconds for one complete cycle
    const distance = 1000 // Fixed distance for consistent animation

    // Animate first row (right to left)
    anime({
      targets: '.workflow-row-1 .workflow-inner',
      translateX: [0, -distance],
      duration: duration,
      loop: true,
      easing: 'linear'
    })

    // Animate second row (left to right)
    anime({
      targets: '.workflow-row-2 .workflow-inner',
      translateX: [-distance, 0],
      duration: duration,
      loop: true,
      easing: 'linear'
    })
  }, [])

  const workflowItems = [
    { label: "Keyword Analysis", icon: "🔍", description: "AI-powered research" },
    { label: "Content Audit", icon: "📝", description: "Smart optimization" },
    { label: "Technical Check", icon: "⚡", description: "Site performance" },
    { label: "Backlink Review", icon: "🔗", description: "Link quality check" },
    { label: "Rank Tracking", icon: "📈", description: "Position monitoring" },
    { label: "AI Insights", icon: "🤖", description: "Smart suggestions" },
    { label: "Performance", icon: "📊", description: "Analytics review" },
    { label: "Competition", icon: "🎯", description: "Market analysis" },
    { label: "Monitoring", icon: "👀", description: "24/7 oversight" },
    { label: "Support", icon: "💬", description: "Expert assistance" },
  ]

  // Split items into two rows
  const row1 = workflowItems.slice(0, 5)
  const row2 = workflowItems.slice(5)

  return (
    <section ref={containerRef} className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">AI-Powered SEO Workflow</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-universal">
            Our AI continuously analyzes your site and makes real-time optimizations to improve your search rankings
          </p>
        </div>

        <div className="relative">
          <div className="workflow-row-1 relative mb-8 overflow-hidden">
            <div className="workflow-inner flex gap-4" style={{ width: "fit-content" }}>
              {[...row1, ...row1, ...row1].map((item, index) => (
                <div
                  key={index}
                  className="flex-none w-48 h-24 bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-garnett text-sm">{item.label}</h3>
                  </div>
                  <p className="text-gray-600 text-xs font-universal">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 via-gray-50 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 via-gray-50 to-transparent z-10"></div>
          </div>

          <div className="workflow-row-2 relative overflow-hidden">
            <div className="workflow-inner flex gap-4" style={{ width: "fit-content" }}>
              {[...row2, ...row2, ...row2].map((item, index) => (
                <div
                  key={index}
                  className="flex-none w-48 h-24 bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-garnett text-sm">{item.label}</h3>
                  </div>
                  <p className="text-gray-600 text-xs font-universal">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 via-gray-50 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 via-gray-50 to-transparent z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}