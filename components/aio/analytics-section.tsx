"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import anime from 'animejs'

export function AIOAnalytics() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    // Simulate speedometer effect
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 7)
    }, 2000)

    // Metrics animation
    anime({
      targets: '.metric-value',
      innerHTML: (el) => [0, el.getAttribute('data-value')],
      round: 1,
      duration: 2000,
      easing: 'easeOutExpo',
      delay: anime.stagger(200)
    })

    // Ranking bars animation with vertical movement
    anime({
      targets: '.ranking-bar',
      scaleY: [0, 1],
      duration: 1500,
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .5)',
      loop: true,
      direction: 'alternate',
      endDelay: 1000
    })

    return () => clearInterval(interval)
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
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-garnett mb-8">Site Performance</h3>
            
            {/* Speedometer from home page */}
            <div className="relative h-[200px] w-[200px] mx-auto mb-12">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full border-[20px] border-gray-200"></div>
              
              {/* Progress circle */}
              <div
                className="absolute inset-0 rounded-full border-[20px] border-transparent"
                style={{
                  borderTopColor: "#4361EE",
                  borderRightColor: "#4361EE",
                  borderLeftColor: activeIndex >= 4 ? "#4361EE" : "transparent",
                  transform: `rotate(${45 + activeIndex * 40}deg)`,
                  transition: "transform 0.5s ease-out"
                }}
              ></div>
              
              {/* Center and value */}
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold mb-2">{85 + activeIndex * 2}</span>
                <span className="text-sm text-gray-500">/ 100</span>
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
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-garnett mb-8">Ranking Distribution</h3>
            
            <div className="flex items-end justify-between h-64 mb-8">
              {[
                { label: "Top 10", height: "85%", count: 42, color: "bg-purple-500" },
                { label: "Top 20", height: "65%", count: 36, color: "bg-purple-400" },
                { label: "Top 30", height: "45%", count: 28, color: "bg-purple-300" },
                { label: "Top 40", height: "35%", count: 22, color: "bg-purple-200" },
                { label: "Top 50", height: "25%", count: 18, color: "bg-purple-100" }
              ].map(({ label, height, count, color }, i) => (
                <div key={i} className="flex flex-col items-center w-16">
                  <div className="w-12 h-full bg-gray-100 rounded-lg overflow-hidden">
                    <div 
                      className={`ranking-bar w-full ${color} transform origin-bottom`}
                      style={{ height }}
                    >
                      <div className="h-full flex items-center justify-center">
                        <div className="text-white text-sm font-medium">{count}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">{label}</div>
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