"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import anime from 'animejs'

export function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const duration = 30000; // 30 seconds for one complete cycle
    const distance = document.querySelector('.workflow-row')?.scrollWidth || 0;

    // Animate first row (right to left)
    anime({
      targets: '.workflow-row-1 .workflow-inner',
      translateX: [-distance, 0],
      duration: duration,
      loop: true,
      easing: 'linear'
    })

    // Animate second row (left to right)
    anime({
      targets: '.workflow-row-2 .workflow-inner',
      translateX: [0, -distance],
      duration: duration,
      loop: true,
      easing: 'linear'
    })
  }, []);

  const workflowItems = [
    { label: "Keyword Research", icon: "🔍", description: "AI-powered keyword discovery" },
    { label: "Content Optimization", icon: "📝", description: "SEO-optimized content" },
    { label: "Technical SEO", icon: "⚡", description: "Site performance boost" },
    { label: "Link Building", icon: "🔗", description: "Quality backlink growth" },
    { label: "Rank Tracking", icon: "📈", description: "Real-time monitoring" },
    { label: "AI Analysis", icon: "🤖", description: "Smart insights" },
    { label: "Performance Reports", icon: "📊", description: "Detailed analytics" },
    { label: "Competitor Analysis", icon: "🎯", description: "Market intelligence" },
    { label: "24/7 Monitoring", icon: "👀", description: "Constant oversight" },
    { label: "Expert Support", icon: "💬", description: "Dedicated assistance" },
  ];

  // Split items into two rows
  const row1 = workflowItems.slice(0, 5);
  const row2 = workflowItems.slice(5);

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-universal text-gray-800 mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4 text-gray-900">Dominate Search Results</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Our comprehensive AI-powered platform combined with expert SEO services gives you everything needed to improve 
            your search rankings and grow your business.
          </p>
        </div>

        <div className="section-panel overflow-hidden">
          <div className="relative">
          <div className="workflow-row-1 flex gap-4 mb-8">
            {row1.map((item, index) => (
              <motion.div
                key={index}
                className="flex-none w-48 bg-white rounded-lg shadow-sm border border-gray-100 p-3 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-garnett text-base">{item.label}</h3>
                </div>
                <p className="text-gray-600 text-xs font-universal">{item.description}</p>
              </motion.div>
            ))}
            {/* Duplicate for seamless loop */}
            {row1.map((item, index) => (
              <motion.div
                key={`dup-${index}`}
                className="flex-none w-48 bg-white rounded-lg shadow-sm border border-gray-100 p-3 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-garnett text-base">{item.label}</h3>
                </div>
                <p className="text-gray-600 text-xs font-universal">{item.description}</p>
              </motion.div>
            ))}
          </div>
          {/* Add fade effect */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#faf9f6] to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#faf9f6] to-transparent"></div>
          </div>

          {/* Second Row - Left to Right */}
          <div className="relative">
          <div className="workflow-row-2 flex gap-4">
            {row2.map((item, index) => (
              <motion.div
                key={index}
                className="flex-none w-48 bg-white rounded-lg shadow-sm border border-gray-100 p-3 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 5) * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-garnett text-base">{item.label}</h3>
                </div>
                <p className="text-gray-600 text-xs font-universal">{item.description}</p>
              </motion.div>
            ))}
            {/* Duplicate for seamless loop */}
            {row2.map((item, index) => (
              <motion.div
                key={`dup-${index}`}
                className="flex-none w-48 bg-white rounded-lg shadow-sm border border-gray-100 p-3 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-garnett text-base">{item.label}</h3>
                </div>
                <p className="text-gray-600 text-xs font-universal">{item.description}</p>
              </motion.div>
            ))}
          </div>
          {/* Add fade effect */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#faf9f6] to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#faf9f6] to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}