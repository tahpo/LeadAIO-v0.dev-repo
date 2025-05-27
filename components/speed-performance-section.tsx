"use client"

import { useRef, useEffect } from "react"
import { ResultsSection } from "./results-section"
import { ExpertsSection } from "./experts-section"

export function SpeedPerformanceSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={containerRef} className="relative">
      {/* White background section before wave */}
      <div className="bg-white h-48"></div>
      
      {/* Dark section with waves */}
      <div className="relative bg-[#2d2d2d] py-48">
        {/* Top wave */}
        <div className="absolute -top-48 left-0 right-0 h-48 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-48 rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path fill="#ffffff" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Box - Speedometer */}
              <ResultsSection />

              {/* Right Box - Collaboration Interface */}
              <ExpertsSection />
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute -bottom-48 left-0 right-0 h-48 overflow-hidden">
            <svg
              className="absolute bottom-0 w-full h-48"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path fill="#ffffff" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* White background section after wave */}
      <div className="bg-white h-48"></div>
    </section>
  )
}