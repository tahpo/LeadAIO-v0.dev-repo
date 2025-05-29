"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import anime from 'animejs'

export function AIOResults() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [metrics, setMetrics] = useState({
    visitors: 0,
    rankings: 0,
    leads: 0,
    revenue: 0
  })

  useEffect(() => {
    setMounted(true)

    // Animate metrics
    anime({
      targets: metrics,
      visitors: 5000,
      rankings: 85,
      leads: 250,
      revenue: 50000,
      duration: 2000,
      easing: 'easeOutExpo',
      update: () => {
        setMetrics({
          visitors: Math.floor(metrics.visitors),
          rankings: Math.floor(metrics.rankings),
          leads: Math.floor(metrics.leads),
          revenue: Math.floor(metrics.revenue)
        })
      }
    })
  }, [])

  if (!mounted) return null

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium mb-4">
            Results
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">Real Results, Real Growth</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-universal">
            Our AI-powered platform delivers measurable improvements in traffic, rankings, and revenue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="w-12 h-12 bg-blue-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-500 text-2xl">👥</span>
            </div>
            <div className="text-3xl font-garnett mb-2">{metrics.visitors.toLocaleString()}+</div>
            <p className="text-gray-600 font-universal">Monthly Organic Visitors</p>
            <div className="mt-2 text-sm text-green-500 flex items-center">
              <span className="mr-1">↑</span>
              215% Growth
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="w-12 h-12 bg-purple-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-500 text-2xl">📈</span>
            </div>
            <div className="text-3xl font-garnett mb-2">{metrics.rankings}%</div>
            <p className="text-gray-600 font-universal">Ranking Improvement</p>
            <div className="mt-2 text-sm text-green-500 flex items-center">
              <span className="mr-1">↑</span>
              Top 3 Positions
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="w-12 h-12 bg-orange-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-orange-500 text-2xl">🎯</span>
            </div>
            <div className="text-3xl font-garnett mb-2">{metrics.leads.toLocaleString()}+</div>
            <p className="text-gray-600 font-universal">Monthly Qualified Leads</p>
            <div className="mt-2 text-sm text-green-500 flex items-center">
              <span className="mr-1">↑</span>
              150% Increase
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-500 text-2xl">💰</span>
            </div>
            <div className="text-3xl font-garnett mb-2">${metrics.revenue.toLocaleString()}</div>
            <p className="text-gray-600 font-universal">Additional Monthly Revenue</p>
            <div className="mt-2 text-sm text-green-500 flex items-center">
              <span className="mr-1">↑</span>
              180% Growth
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}