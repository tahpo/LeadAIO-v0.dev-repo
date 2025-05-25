"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, BarChart3, Search, Target } from "lucide-react"

type StatProps = {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  delay: number
  color: string
}

function Stat({ icon, value, suffix, label, delay, color }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const startTime = Date.now()
      const endValue = value

      const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        setCount(Math.floor(progress * endValue))

        if (progress === 1) {
          clearInterval(timer)
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className={`mb-4 p-3 ${color} rounded-full`}>{icon}</div>
      <div className="text-3xl md:text-4xl font-bold mb-2 flex items-center font-jakarta">
        {count.toLocaleString()}
        <span>{suffix}</span>
        <svg className="ml-2 h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414l-3.293 3.293a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </motion.div>
  )
}

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern dark:bg-dot-pattern-dark"></div>
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-jakarta">Leading the way in AI-powered SEO</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform has helped thousands of businesses transform their online presence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat
            icon={<Users className="h-6 w-6 text-purple-600" />}
            value={5000}
            suffix="+"
            label="Businesses empowered"
            delay={0}
            color="bg-purple-100 dark:bg-purple-900/30"
          />
          <Stat
            icon={<BarChart3 className="h-6 w-6 text-violet-600" />}
            value={127}
            suffix="%"
            label="Average traffic increase"
            delay={0.2}
            color="bg-violet-100 dark:bg-violet-900/30"
          />
          <Stat
            icon={<Search className="h-6 w-6 text-indigo-600" />}
            value={1500000}
            suffix="+"
            label="Keywords optimized"
            delay={0.4}
            color="bg-indigo-100 dark:bg-indigo-900/30"
          />
          <Stat
            icon={<Target className="h-6 w-6 text-fuchsia-600" />}
            value={89}
            suffix="%"
            label="Conversion improvement"
            delay={0.6}
            color="bg-fuchsia-100 dark:bg-fuchsia-900/30"
          />
        </div>
      </div>
    </section>
  )
}
