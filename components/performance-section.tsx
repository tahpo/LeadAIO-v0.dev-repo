"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function PerformanceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [speedValue, setSpeedValue] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  // Generate speedometer marks
  const marks = Array.from({ length: 21 }, (_, i) => {
    const rotation = -90 + (i * 180) / 20
    const isLarge = i % 5 === 0
    return (
      <div
        key={i}
        className="speedometer-mark"
        style={{
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          height: isLarge ? "15px" : "10px",
          background: i > 15 ? "rgba(255, 69, 0, 0.7)" : "rgba(255, 255, 255, 0.5)",
        }}
      ></div>
    )
  })

  // Animate speedometer when in view
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (value > 0.2 && value < 0.8) {
        const progress = (value - 0.2) / 0.6 // Normalize to 0-1 within our active range
        const targetSpeed = Math.floor(progress * 100)
        setSpeedValue(targetSpeed)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  // Calculate needle rotation based on speed value
  const needleRotation = -90 + (speedValue * 180) / 100

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 subtle-grid"></div>

      <motion.div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10" style={{ opacity, scale }}>
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 mb-4">
            Performance focus
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-dm-sans mb-4 text-gray-900">Built for speed</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay in flow and get to insights faster with interactions that feel instantaneous
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="speedometer">
              <div className="speedometer-dial"></div>
              <div className="speedometer-marks">{marks}</div>
              <div
                className="speedometer-needle"
                style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
              ></div>
              <div className="speedometer-center"></div>
              <div className="speedometer-value">{speedValue}</div>
            </div>
            <div className="text-center mt-4 text-gray-500">SEO PERFORMANCE SCORE</div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm hover-card border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 font-dm-sans">Instant keyword analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes thousands of keywords in seconds, identifying the most valuable opportunities for your
                business.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover-card border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 font-dm-sans">Real-time rank tracking</h3>
              <p className="text-gray-600">
                Monitor your search positions as they change, with instant alerts when you move up or down.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover-card border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 font-dm-sans">Lightning-fast audits</h3>
              <p className="text-gray-600">
                Complete technical SEO audits in minutes, not hours, with prioritized recommendations.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
