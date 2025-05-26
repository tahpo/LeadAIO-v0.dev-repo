"use client"

import { useRef, useEffect, useState } from "react"

export function SpeedPerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [speedValue, setSpeedValue] = useState(60)
  const [isVisible, setIsVisible] = useState(false)
  const [activeSegments, setActiveSegments] = useState<number[]>([])
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Segment filling animation - redlining effect
  useEffect(() => {
    if (!isVisible) return

    // Total number of segments (8 gray + 4 red)
    const totalSegments = 12
    const graySegments = 8 // first 8 segments are gray
    
    const updateSegments = () => {
      // Determine how many segments to show based on current speed
      // At lower speeds, show mostly gray segments
      // At higher speeds, start showing red segments
      const normalizedSpeed = Math.min(400, Math.max(60, speedValue))
      
      // Calculate base number of segments to show (0-12)
      let segmentsToShow = Math.floor((normalizedSpeed - 60) / (400 - 60) * totalSegments)
      
      // When in "redline" territory (showing at least some red segments)
      if (segmentsToShow > graySegments) {
        // Create redlining effect - sometimes drop 1-2 red segments randomly
        // This creates the "jumpy" redlining effect
        const redSegmentsToShow = segmentsToShow - graySegments
        
        // 40% chance to drop 1-2 red segments randomly to create erratic behavior at high speeds
        if (normalizedSpeed > 200 && Math.random() < 0.4) {
          const drop = Math.floor(Math.random() * Math.min(2, redSegmentsToShow)) + 1
          segmentsToShow -= drop
        }
      }
      
      // Generate array of active segment indices
      const segments = Array.from({ length: segmentsToShow }, (_, i) => i)
      setActiveSegments(segments)
      
      // Update faster at higher speeds (50-150ms)
      const updateSpeed = Math.max(50, 150 - (normalizedSpeed / 400) * 100)
      setTimeout(updateSegments, updateSpeed)
    }

    updateSegments()
  }, [isVisible, speedValue])

  // Counter animation
  useEffect(() => {
    if (!isVisible) return

    // Slower initial animation from 60 to 150 (4 seconds)
    let startTime = Date.now()
    let duration = 4000 // 4 seconds
    let startValue = 60
    let endValue = 150

    const animatePhase1 = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const value = Math.floor(startValue + (endValue - startValue) * progress)

      setSpeedValue(value)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animatePhase1)
      } else {
        // Start phase 2 - Slower animation from 150 to 400
        // 5 seconds per increment = 1250 seconds total for 250 increments
        startTime = Date.now()
        duration = 1250000 // 1250 seconds = ~21 minutes (5 seconds per increment)
        startValue = 150
        endValue = 400
        animationFrameRef.current = requestAnimationFrame(animatePhase2)
      }
    }

    const animatePhase2 = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const value = Math.floor(startValue + (endValue - startValue) * progress)

      setSpeedValue(value)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animatePhase2)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animatePhase1)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Box - Speedometer */}
          <div className="bg-[#1a1a1a] rounded-3xl p-8 shadow-xl">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2a2a2a] mb-6">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                <span className="text-gray-300 text-base">Results focus</span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">Built for results</h3>
              <p className="text-gray-400 leading-relaxed">
                Transform your SEO performance into a lead generation machine. Our optimized platform delivers qualified
                prospects directly to your business.
              </p>
            </div>

            {/* Speedometer Container */}
            <div className="flex flex-col items-center justify-center">
              {/* Digital Speedometer */}
              <div className="relative w-full mb-8">
                {/* Speedometer with animation */}
                <div className="relative w-full flex justify-center">
                  {/* Base layer (gray and red segments) */}
                  <div className="relative w-[320px] h-[160px]">
                    <svg width="320" height="160" viewBox="0 0 400 200">
                      {/* Gray and red segments */}
                      {Array.from({ length: 12 }, (_, i) => {
                        const rotation = -90 + (i * 180) / 11
                        const isRed = i >= 8
                        const isActive = activeSegments.includes(i)
                        
                        return (
                          <rect
                            key={i}
                            className={isActive ? (isRed ? "animate-flicker-red" : "animate-flicker-gray") : ""}
                            x="185"
                            y="10"
                            width="30"
                            height="60"
                            rx="2"
                            fill={isRed ? "#8B3E3E" : "#4A4A4A"}
                            opacity={isActive ? (isRed ? "0.9" : "0.6") : "0.15"}
                            transform={`rotate(${rotation}, 200, 200)`}
                          />
                        )
                      })}
                    </svg>

                    {/* Digital display - moved to center of the speedometer */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[10%] text-center">
                      <div className="text-6xl font-mono text-white tracking-wider" style={{ fontFamily: "monospace" }}>
                        {speedValue}
                      </div>
                      <div className="text-orange-400 text-lg font-mono mt-1">LEADS/DAY</div>
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div className="flex justify-between text-gray-500 text-sm font-mono mt-4">
                  <div className="whitespace-nowrap">LEAD POTENTIAL</div>
                  <div className="text-right">LEAD GENERATION RATE</div>
                </div>
              </div>

              {/* SEO Performance Metrics */}
              <div className="w-full mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-400 font-mono">CONVERSION METRICS</div>
                  <div className="text-orange-400 font-mono">HIGH-INTENT</div>
                </div>

                {/* Performance bars */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <div className="text-gray-500 text-xs font-mono">Traffic Quality</div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-gray-500 text-xs font-mono">Conversion Rate</div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-gray-500 text-xs font-mono">Lead Quality</div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Growth Stats - cleaner replacement */}
              <div className="w-full mt-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#222] rounded-lg p-3 border border-gray-800 flex flex-col items-center justify-center">
                    <div className="text-green-400 font-mono text-xl font-bold">+{Math.floor(speedValue * 1.5)}%</div>
                    <div className="text-gray-500 text-xs font-mono text-center mt-1">ORGANIC TRAFFIC</div>
                  </div>
                  <div className="bg-[#222] rounded-lg p-3 border border-gray-800 flex flex-col items-center justify-center">
                    <div className="text-green-400 font-mono text-xl font-bold">+{Math.floor(speedValue * 0.8)}%</div>
                    <div className="text-gray-500 text-xs font-mono text-center mt-1">KEYWORD RANKINGS</div>
                  </div>
                  <div className="bg-[#222] rounded-lg p-3 border border-gray-800 flex flex-col items-center justify-center">
                    <div className="text-green-400 font-mono text-xl font-bold">+{Math.floor(speedValue * 0.5)}%</div>
                    <div className="text-gray-500 text-xs font-mono text-center mt-1">CONVERSION RATE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Box */}
          <div className="bg-[#1a1a1a] rounded-3xl p-8 shadow-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2a2a2a] mb-6">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300 text-base">Analyze together</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-3">Collaborate in real time</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Work together seamlessly regardless of your role in the team. Leverage real-time multiplayer to bring
              everyone together.
            </p>

            <div className="bg-[#222] rounded-2xl p-8 h-80 flex items-center justify-center">
              <span className="text-gray-500 text-lg">Content coming soon...</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes flicker-gray {
          0% { opacity: 0.4; }
          25% { opacity: 0.7; }
          50% { opacity: 0.5; }
          75% { opacity: 0.6; }
          100% { opacity: 0.45; }
        }
        
        @keyframes flicker-red {
          0% { opacity: 0.7; }
          25% { opacity: 1; }
          50% { opacity: 0.6; }
          75% { opacity: 0.9; }
          100% { opacity: 0.8; }
        }
        
        .animate-flicker-gray {
          animation: flicker-gray 0.3s infinite;
        }
        
        .animate-flicker-red {
          animation: flicker-red 0.2s infinite;
        }
      `}</style>
    </section>
  )
}