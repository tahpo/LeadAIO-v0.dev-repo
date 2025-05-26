"use client"

import { useRef, useEffect } from "react"
import { ResultsSection } from "./results-section"
import { ExpertsSection } from "./experts-section"

export function SpeedPerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Box - Speedometer */}
          <ResultsSection />

          {/* Right Box - Collaboration Interface */}
          <ExpertsSection />
        </div>
      </div>
    </section>
  )
}