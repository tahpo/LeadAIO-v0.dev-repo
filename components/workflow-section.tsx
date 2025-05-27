"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import anime from 'animejs'

export function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate items in opposite directions
    const timeline = anime.timeline({
      easing: 'easeInOutQuad',
      loop: true,
      duration: 20000
    });

    // First row moves right to left
    timeline.add({
      targets: '.workflow-row-1',
      translateX: ['-100%', '0%'],
    });

    // Second row moves left to right
    timeline.add({
      targets: '.workflow-row-2',
      translateX: ['0%', '-100%'],
    }, '-=20000'); // Start at the same time as first animation
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
          {/* First Row - Right to Left */}
          <div className="workflow-row-1 flex gap-4 mb-8">
            {row1.map((item, index) => (
              <motion.div
                key={index}
                className="flex-none w-64 bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-garnett text-lg">{item.label}</h3>
                </div>
                <p className="text-gray-600 text-sm font-universal">{item.description}</p>
              </motion.div>
            ))}
            {/* Duplicate for seamless loop */}
            {row1.map((item, index) => (
              <motion.div
                key={`dup-${index}`}
                className="flex-none w-64 bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-garnett text-lg">{item.label}</h3>
                </div>
                <p className="text-gray-600 text-sm font-universal">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Second Row - Left to Right */}
          <div className="workflow-row-2 flex gap-4">
            {row2.map((item, index) => (
              <motion.div
                key={index}
                className="flex-none w-64 bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 5) * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-garnett text-lg">{item.label}</h3>
                </div>
                <p className="text-gray-600 text-sm font-universal">{item.description}</p>
              </motion.div>
            ))}
            {/* Duplicate for seamless loop */}
            {row2.map((item, index) => (
              <motion.div
                key={`dup-${index}`}
                className="flex-none w-64 bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-garnett text-lg">{item.label}</h3>
                </div>
                <p className="text-gray-600 text-sm font-universal">{item.description}</p>
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