"use client"

import { useRef, useEffect } from "react"
import { ResultsSection } from "./results-section"
import { ExpertsSection } from "./experts-section"

export function SpeedPerformanceSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative bg-white">
      <div className="relative bg-[#2d2d2d] py-24">
        {/* Top wave */}
        <div className="absolute -top-24 left-0 right-0 h-24">
          <svg
            className="absolute bottom-0 w-full h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#2d2d2d"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResultsSection />
              <ExpertsSection />
            </div>
          </div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute -bottom-24 left-0 right-0 h-24">
          <svg
            className="absolute top-0 w-full h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#2d2d2d"
              d="M0,0L48,16C96,32,192,64,288,80C384,96,480,96,576,80C672,64,768,32,864,24C960,16,1056,32,1152,48C1248,64,1344,80,1392,88L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}