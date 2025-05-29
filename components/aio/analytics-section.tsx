"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import anime from 'animejs'

export function AIOAnalytics() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Speedometer animation with proper positioning
    anime({
      targets: '.speedometer-needle',
      rotate: [-45, 135],
      duration: 3000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    })

    // Animate the metrics
    anime({
      targets: '.metric-value',
      innerHTML: (el) => [0, el.getAttribute('data-value')],
      round: 1,
      duration: 2000,
      easing: 'easeOutExpo',
      delay: anime.stagger(200)
    })

    // Chart bar animation with proper values
    anime({
      targets: '.chart-bar',
      scaleY: [0, 1],
      duration: 1500,
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .5)',
      loop: false
    })
  }, [])

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium mb-4">
            Smart Analytics
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            AI-Powered Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-universal">
            Get actionable insights and recommendations powered by advanced AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Metrics */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-garnett mb-6">Site Performance</h3>
            
            {/* Speedometer */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
              <div 
                className="speedometer-needle absolute left-1/2 bottom-0 w-1 h-24 bg-purple-600 origin-bottom transform -translate-x-1/2"
                style={{ transformOrigin: 'bottom center' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-bold">92</div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Page Speed", value: 95 },
                { label: "Mobile Score", value: 88 },
                { label: "Core Web Vitals", value: 92 },
                { label: "SEO Score", value: 94 }
              ].map((metric, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div 
                    className="metric-value text-2xl font-bold mb-1"
                    data-value={metric.value}
                  >0</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-garnett mb-6">Ranking Distribution</h3>
            
            <div className="flex items-end h-64 space-x-6">
              {[
                { label: "Top 10", height: 85, count: 24 },
                { label: "Top 20", height: 65, count: 36 },
                { label: "Top 30", height: 45, count: 42 },
                { label: "Top 40", height: 30, count: 28 },
                { label: "Top 50", height: 20, count: 18 }
              ].map(({ label, height, count }, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden">
                    <div 
                      className="chart-bar w-full bg-purple-500 origin-bottom"
                      style={{ height: `${height}%` }}
                    >
                      <div className="text-white text-sm font-medium text-center mt-2">{count}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-green-600 text-sm mb-1">Improved Rankings</div>
                <div className="text-2xl font-bold text-green-700">+42%</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-blue-600 text-sm mb-1">New Keywords</div>
                <div className="text-2xl font-bold text-blue-700">+156</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}