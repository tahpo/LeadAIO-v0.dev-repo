"use client"

import React from "react"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import anime from 'animejs'
import { Gauge } from "@/components/ui/gauge"
import { useInView } from "framer-motion"

export function AIOAnalytics() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [gaugeValue, setGaugeValue] = React.useState(0)

  useEffect(() => {
    if (!isInView) return

    // Animate gauge value
    anime({
      targets: { value: 0 },
      value: 92,
      duration: 2000,
      easing: 'easeOutExpo',
      update: (anim) => {
        setGaugeValue(Math.round(anim.progress))
      }
    })

    // Metrics animation
    anime({
      targets: '.metric-value',
      innerHTML: (el) => [0, el.getAttribute('data-value')],
      round: 1,
      duration: 2000,
      easing: 'easeOutExpo',
      delay: anime.stagger(200)
    }).play()

    // Ranking bars animation with vertical movement
    anime({
      targets: '.ranking-bar',
      height: (el) => el.getAttribute('data-height'),
      duration: 1500,
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .5)'
    }).play()

  }, [isInView])

  const rankingData = [
    { label: "Top 10", height: "85%", count: 42 },
    { label: "Top 20", height: "65%", count: 36 },
    { label: "Top 30", height: "45%", count: 28 },
    { label: "Top 40", height: "35%", count: 22 },
    { label: "Top 50", height: "25%", count: 18 }
  ]

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
            
            {/* Gauge */}
            <div className="relative mx-auto mb-16 flex flex-col items-center">
              <Gauge
                value={gaugeValue}
                size={200}
                strokeWidth={12}
                primary={{
                  0: "danger",
                  40: "warning",
                  60: "info",
                  80: "success"
                }}
                secondary={{
                  0: "#e5e7eb"
                }}
                showValue={true}
                className={{
                  textClassName: "font-garnett"
                }}
              />
              <span className="text-sm text-gray-500 mt-4">Performance Score</span>
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
            
            <div className="flex items-end justify-between h-48 mb-8">
              {rankingData.map(({ label, height, count }, i) => (
                <div key={i} className="flex flex-col items-center w-16">
                  <div className="w-12 bg-gray-100 rounded-lg overflow-hidden" style={{ height: "100%" }}>
                    <div 
                      className={`ranking-bar w-full bg-purple-500 opacity-${90 - i * 10} transition-all duration-500`}
                      data-height={height}
                      style={{ height: "0%" }}
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