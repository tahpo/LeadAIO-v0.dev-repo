"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import anime from 'animejs'

export function PPCFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    
    const timeline = anime.timeline({
      easing: 'easeOutExpo'
    })

    timeline
      .add({
        targets: '.metric-value',
        innerHTML: (el) => [0, el.getAttribute('data-value')],
        round: 1,
        duration: 2000,
        delay: anime.stagger(200)
      })
      .add({
        targets: '.progress-bar',
        width: (el) => el.getAttribute('data-progress'),
        duration: 2000,
        delay: anime.stagger(100)
      })
  }, [isInView])

  return (
    <section ref={containerRef} className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
            Smart Optimization
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            AI-Powered Campaign Management
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Our AI continuously optimizes your campaigns for maximum performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Campaign Performance Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-garnett mb-6">Campaign Performance</h3>
            <div className="space-y-6">
              {[
                { label: "Click-Through Rate", value: "85", color: "bg-indigo-500" },
                { label: "Conversion Rate", value: "92", color: "bg-purple-500" },
                { label: "Quality Score", value: "78", color: "bg-blue-500" }
              ].map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{metric.label}</span>
                    <span className="font-medium metric-value" data-value={metric.value}>0</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`progress-bar h-full ${metric.color} transform origin-left`}
                      data-progress={`${metric.value}%`}
                      style={{width: '0%'}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Metrics Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-garnett mb-6">ROI Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Cost per Click", value: "-32%", color: "text-green-500" },
                { label: "Cost per Lead", value: "-45%", color: "text-green-500" },
                { label: "ROAS", value: "+187%", color: "text-green-500" },
                { label: "Lead Quality", value: "+92%", color: "text-green-500" }
              ].map((metric, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                  <div className={`text-2xl font-bold metric-value ${metric.color}`} data-value={metric.value}>
                    0%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}