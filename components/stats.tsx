"use client"

import { useEffect, useState } from "react"

const stats = [
  { number: 5000, suffix: "+", label: "Businesses growing" },
  { number: 127, suffix: "%", label: "Average traffic increase" },
  { number: 1.5, suffix: "M+", label: "Keywords tracked" },
  { number: 89, suffix: "%", label: "Customer satisfaction" },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [target])

  return (
    <span className="text-4xl md:text-5xl font-bold text-indigo-600">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-4">Trusted by thousands of businesses</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the companies that are already seeing incredible results with LeadAIO
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <AnimatedNumber target={stat.number} suffix={stat.suffix} />
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
