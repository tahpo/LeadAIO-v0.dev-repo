"use client"

import { useRef, useEffect, useState } from "react"

export function SpeedPerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [speedValue, setSpeedValue] = useState(60)
  const [isVisible, setIsVisible] = useState(false)
  const [redSegments, setRedSegments] = useState([false, false, false, false])
  const [graySegmentOpacities, setGraySegmentOpacities] = useState(Array(8).fill(0.5))
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Advanced flickering for gray segments
  useEffect(() => {
    if (!isVisible) return
    
    // Function to update gray segment opacities for subtle flickering
    const updateGraySegments = () => {
      setGraySegmentOpacities(prev => 
        prev.map(() => 0.3 + Math.random() * 0.4) // Values between 0.3 and 0.7
      )
      setTimeout(updateGraySegments, 200) // Update every 200ms
    }
    
    updateGraySegments()
  }, [isVisible])

  // Red segment animation - more erratic
  useEffect(() => {
    if (!isVisible) return
    
    // Function to randomly show/hide red segments to simulate redlining
    const updateRedSegments = () => {
      // Calculate how many red segments should be active based on speed
      // As speed increases, more red segments become active, but flicker more erratically
      const normalizedSpeed = Math.min(400, Math.max(60, speedValue))
      const redlineThreshold = 250 // When speed starts to enter red zone
      
      if (normalizedSpeed < redlineThreshold) {
        // Below redline - no red segments
        setRedSegments([false, false, false, false])
      } else {
        // Above redline - calculate active segments with randomness
        const segmentPercentage = (normalizedSpeed - redlineThreshold) / (400 - redlineThreshold)
        const baseActiveCount = Math.floor(segmentPercentage * 4)
        
        // Add randomness for the redlining effect
        let newRedSegments = [false, false, false, false]
        
        // Always activate the segments up to baseActiveCount
        for (let i = 0; i < baseActiveCount; i++) {
          newRedSegments[i] = true
        }
        
        // Add random flickering for higher segments
        if (baseActiveCount < 4) {
          for (let i = baseActiveCount; i < 4; i++) {
            // Higher chance of flickering as speed increases
            const flickerChance = segmentPercentage * 0.8
            newRedSegments[i] = Math.random() < flickerChance
          }
        }
        
        // Shuffle the array to make flickering more erratic
        if (baseActiveCount > 0 && baseActiveCount < 4) {
          for (let i = 0; i < 3; i++) {
            const idx1 = Math.floor(Math.random() * 4)
            const idx2 = Math.floor(Math.random() * 4)
            if (idx1 !== idx2) {
              const temp = newRedSegments[idx1]
              newRedSegments[idx1] = newRedSegments[idx2]
              newRedSegments[idx2] = temp
            }
          }
        }
        
        setRedSegments(newRedSegments)
      }
      
      // Update faster as speed increases
      const updateRate = Math.max(50, 200 - (normalizedSpeed / 400) * 150)
      setTimeout(updateRedSegments, updateRate)
    }
    
    updateRedSegments()
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
                      {/* Gray segments */}
                      {Array.from({ length: 8 }, (_, i) => {
                        const rotation = -90 + (i * 180) / 11
                        
                        return (
                          <rect
                            key={`gray-${i}`}
                            className="gray-segment"
                            x="185"
                            y="10"
                            width="30"
                            height="60"
                            rx="2"
                            fill="#4A4A4A"
                            opacity={graySegmentOpacities[i]}
                            transform={`rotate(${rotation}, 200, 200)`}
                          />
                        )
                      })}
                      
                      {/* Red segments */}
                      {Array.from({ length: 4 }, (_, i) => {
                        const rotation = -90 + ((i + 8) * 180) / 11
                        
                        return (
                          <rect
                            key={`red-${i}`}
                            className="red-segment"
                            x="185"
                            y="10"
                            width="30"
                            height="60"
                            rx="2"
                            fill={redSegments[i] ? "#FF3E3E" : "#8B3E3E"}
                            opacity={redSegments[i] ? 0.9 : 0.15}
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
    </section>
  )
}