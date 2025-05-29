"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import anime from 'animejs'

export function AIOAnalytics() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Enhanced speedometer animation with higher arc
    anime({
      targets: '.speedometer-needle',
      rotate: [-45, 135], // Increased range for more realistic movement
      duration: 3000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    })

    // Metrics animation
    anime({
      targets: '.metric-value',
      innerHTML: (el) => [0, el.getAttribute('data-value')],
      round: 1,
      duration: 2000,
      easing: 'easeOutExpo',
      delay: anime.stagger(200)
    })

    // Enhanced ranking bars animation with vertical movement
    anime({
      targets: '.ranking-bar',
      height: (el) => el.getAttribute('data-height'),
      duration: 1500,
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .5)',
      loop: true,
      direction: 'alternate',
      endDelay: 1000
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
            
            {/* Enhanced Speedometer */}
            <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[16px] border-gray-100"></div>
              <div 
                className="absolute inset-0 rounded-full border-[16px] border-red-500 border-t-transparent border-l-transparent"
                style={{ transform: 'rotate(-45deg)' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div 
                    className="speedometer-needle absolute w-1.5 h-24 bg-red-600 rounded-full shadow-lg"
                    style={{ 
                      transformOrigin: 'bottom center',
                      left: 'calc(50% - 0.75px)',
                      bottom: '50%'
                    }}
                  ></div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center mt-8">
                <div className="text-3xl font-bold">92</div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Page Speed", value: 95 },
                { label: "Mobile Score", value: 88 },
                { label: "Core Web Vitals", value: 92 },
                { label: "SEO Score", value: 94, className: "mt-4" }
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
            
            <div className="flex justify-between h-64 mb-8">
              {[
                { label: "Top 20", height: "65%", count: 36, color: "bg-purple-400" },
                { label: "Top 30", height: "50%", count: 42, color: "bg-purple-300" },
                { label: "Top 40", height: "35%", count: 28, color: "bg-purple-200" },
                { label: "Top 50", height: "20%", count: 18, color: "bg-purple-100" },
                { label: "Top 50", height: "20%", count: 18, color: "bg-purple-100" }
              ].map(({ label, height, count, color }, i) => (
                <div key={i} className="flex flex-col items-center w-16">
                  <div className="text-sm text-gray-600 mb-2">{label}</div>
                  <div className="relative w-8 h-full bg-gray-100 rounded-lg overflow-hidden">
                    <div 
                      className={`ranking-bar absolute bottom-0 inset-x-0 ${color}`}
                      style={{ height: '0%' }}
                      data-height={height}
                    >
                      <div className="absolute top-0 inset-x-0 flex items-center justify-center">
                        <div className="text-white text-sm font-medium">{count}</div>
                      </div>
                    </div>
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