"use client"

import { useRef, useEffect, useState } from "react"

export function SpeedPerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [speedValue, setSpeedValue] = useState(60)
  const [isVisible, setIsVisible] = useState(false)
  const [redSegmentCount, setRedSegmentCount] = useState(0)
  const [segmentLengths, setSegmentLengths] = useState<number[]>([])
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

  // Initialize segment lengths
  useEffect(() => {
    // Initialize with random lengths for all 12 segments
    setSegmentLengths(Array(12).fill(0).map(() => Math.random() * 0.5 + 0.5)) // Between 0.5 and 1
  }, [])

  // Red segment length animation
  useEffect(() => {
    if (!isVisible) return

    // Animate the red segments to give growing/shrinking effect
    const updateRedSegments = () => {
      // Random number between 0 and 4 (0-4 red segments)
      const newCount = Math.floor(Math.random() * 5)
      setRedSegmentCount(newCount)
      
      // Update segment lengths with more dynamic values
      setSegmentLengths(prev => {
        return prev.map((length, i) => {
          // Make red segments (last 4) more volatile
          if (i >= 8) {
            // More dramatic fluctuations for red segments
            return Math.random() * 0.7 + 0.3; // Between 0.3 and 1
          } else {
            // More subtle fluctuations for gray segments
            return Math.max(0.3, Math.min(1, length + (Math.random() - 0.5) * 0.2));
          }
        });
      });

      // Update faster (100-200ms) for more dynamic effect
      const timeout = 80 + Math.random() * 120
      setTimeout(updateRedSegments, timeout)
    }

    updateRedSegments()
  }, [isVisible])

  // Counter animation
  useEffect(() => {
    if (!isVisible) return

    // Slower initial animation from 60 to 150 (4 seconds)
    let startTime = Date.now()
    let duration = 4000 // Changed from 2000 to 4000 (4 seconds)
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
                        const segmentLength = segmentLengths[i] || 0.75 // Fallback value

                        // Calculate different heights for segments
                        const baseHeight = isRed ? 70 : 60
                        const height = baseHeight * segmentLength

                        // Always show gray segments, conditionally show red ones
                        const isVisible = !isRed || i < 8 + redSegmentCount

                        return (
                          <rect
                            key={i}
                            className={isRed ? "animate-flicker-red" : "animate-flicker-gray"}
                            x="185"
                            y={10 + (60 - height)}
                            width="30"
                            height={height}
                            rx="2"
                            fill={isRed ? "#8B3E3E" : "#4A4A4A"}
                            opacity={isVisible ? (isRed ? "0.8" : "0.6") : "0"}
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
          0%, 100% { opacity: 0.3; }
          25% { opacity: 0.5; }
          50% { opacity: 0.25; }
          75% { opacity: 0.45; }
        }
        
        @keyframes flicker-red {
          0% { opacity: 0.5; }
          25% { opacity: 0.9; }
          50% { opacity: 0.4; }
          75% { opacity: 0.8; }
          100% { opacity: 0.6; }
        }
        
        .animate-flicker-gray {
          animation: flicker-gray 0.4s infinite;
        }
        
        .animate-flicker-red {
          animation: flicker-red 0.25s infinite;
        }
      `}</style>
    </section>
  )
}