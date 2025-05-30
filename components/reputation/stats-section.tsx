'use client'

import { useRef } from "react"
import { motion } from "framer-motion"
import { AreaChart, Area, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  {
    date: "Jan 2024",
    "Review Score": 4.2,
    "Response Rate": 92,
    "Brand Sentiment": 75,
  },
  {
    date: "Feb 2024",
    "Review Score": 4.4,
    "Response Rate": 88,
    "Brand Sentiment": 82,
  },
  {
    date: "Mar 2024",
    "Review Score": 4.3,
    "Response Rate": 93,
    "Brand Sentiment": 79,
  },
  {
    date: "Apr 2024",
    "Review Score": 4.5,
    "Response Rate": 95,
    "Brand Sentiment": 86,
  },
  {
    date: "May 2024",
    "Review Score": 4.8,
    "Response Rate": 98,
    "Brand Sentiment": 93,
  },
]

const summary = [
  {
    name: "Review Score",
    value: "4.8",
    change: "+0.6",
    percentageChange: "+14.3%",
    changeType: "positive",
  },
  {
    name: "Response Rate",
    value: "98%",
    change: "+6%",
    percentageChange: "+6.5%",
    changeType: "positive",
  },
  {
    name: "Brand Sentiment",
    value: "93%",
    change: "+8%",
    percentageChange: "+9.4%",
    changeType: "positive",
  },
]

export function ReputationStats() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 rounded-full text-sm font-medium mb-4">
            Performance
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            Track Your Growth
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Monitor your reputation metrics and see the impact of your efforts
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {summary.map((item) => {
            const color = item.changeType === "positive" ? "hsl(142.1 76.2% 36.3%)" : "hsl(0 72.2% 50.6%)"

            return (
              <Card key={item.name} className="p-6">
                <div>
                  <h3 className="text-lg font-garnett text-gray-900 mb-2">{item.name}</h3>
                  <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-garnett">{item.value}</p>
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="font-medium text-green-600">{item.change}</span>
                      <span className="text-green-600 font-medium">({item.percentageChange})</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <Area
                        type="monotone"
                        dataKey={item.name}
                        stroke={color}
                        fill={color}
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}