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
    { label: "Rename board", icon: "📝" },
    { label: "Change theme: Dark", icon: "🌙" },
    { label: "Command bar", icon: "⌨️" },
    { label: "Invite to board", icon: "👥" },
    { label: "Archive board", icon: "📦" },
    { label: "Create block", icon: "➕" },
    { label: "Copy board link", icon: "🔗" },
    { label: "Change chart type", icon: "📊" },
    { label: "Go to board", icon: "🚀" },
    { label: "Contact support", icon: "💬" },
  ]

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-universal text-gray-800 mb-4">
            Effortless workflows
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4 text-gray-900">Every action at your fingertips</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Stay in flow and improve your workflow with our command bar, providing easy access to all features through
            just a few keystrokes.
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

          <div className="mt-16 text-center">
            <div className="inline-block bg-gray-100 rounded-lg px-4 py-2 text-sm font-universal">
              Press <kbd className="px-2 py-1 bg-white rounded border border-gray-300 mx-1 font-universal">⌘</kbd> +{" "}
              <kbd className="px-2 py-1 bg-white rounded border border-gray-300 mx-1 font-universal">K</kbd> to open
              command bar
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
