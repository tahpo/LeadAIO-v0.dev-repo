"use client"

import * as React from "react"
import { useRef, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import anime from 'animejs'
import { Gauge } from "@/components/ui/gauge"
import { useInView } from "framer-motion"
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const rankingData = [
  { position: "Top 10", keywords: 42 },
  { position: "Top 20", keywords: 36 },
  { position: "Top 30", keywords: 28 },
  { position: "Top 40", keywords: 22 },
  { position: "Top 50", keywords: 18 }
]

const chartConfig = {
  keywords: {
    label: "Keywords",
    color: "#a855f7"
  }
} 

export function AIOAnalytics() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [gaugeValue, setGaugeValue] = React.useState(0)
  const [hoveredBar, setHoveredBar] = React.useState<number | null>(null)

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

  }, [isInView])

  const chartData = useMemo(() => {
    return rankingData.map(item => ({
      position: item.position,
      keywords: item.keywords
    }))
  }, [])

  return (
    <section ref={containerRef} className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium mb-4">
            Smart Analytics
          </span>
          <h2 className="text-2xl md:text-3xl font-garnett mb-3">
            AI-Powered Insights
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto font-universal">
            Get actionable insights and recommendations powered by advanced AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Metrics */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-garnett mb-8">Site Performance</h3>
            
            {/* Gauge */}
            <div className="relative mx-auto mb-8 flex flex-col items-center">
              <Gauge
                value={gaugeValue}
                size={160}
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
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Page Speed", value: 95 },
                { label: "Mobile Score", value: 88 },
                { label: "Core Web Vitals", value: 92 },
                { label: "SEO Score", value: 94 }
              ].map((metric, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
                  <div 
                    className="metric-value text-2xl font-bold mb-1"
                    data-value={metric.value}
                  >0</div>
                  <div className="text-xs text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-garnett mb-8">Ranking Distribution</h3>
            <div className="h-[180px] w-full mb-4">
              <ChartContainer config={chartConfig}>
                <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" opacity={0.5} />
                  <XAxis 
                    dataKey="position"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'Universal Sans' }}
                    dy={8}
                  />
                  <ChartTooltip
                    cursor={{ fill: 'rgba(168, 85, 247, 0.1)' }}
                    content={
                      <ChartTooltipContent
                        className="bg-white shadow-lg border border-gray-100"
                        labelFormatter={(value) => `${value}`}
                        formatter={(value) => [`${value} Keywords`, '']}
                      />
                    }
                  />
                  <Bar
                    dataKey="keywords"
                    fill="#a855f7"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                    onMouseEnter={(data, index) => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="transition-all duration-200"
                    style={{
                      opacity: hoveredBar !== null ? (hoveredBar === hoveredBar ? '1' : '0.7') : '1'
                    }}
                  />
                </BarChart>
              </ChartContainer>
            </div>

            <div className="grid grid-cols-2 gap-3">
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