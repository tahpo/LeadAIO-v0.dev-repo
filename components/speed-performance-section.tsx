"use client"

import { useRef, useEffect, useState } from "react"
import anime from "animejs"

export function SpeedPerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const speedometerRef = useRef<HTMLDivElement>(null)
  const [speedValue, setSpeedValue] = useState(60)
  const [isVisible, setIsVisible] = useState(false)
  const segmentRefs = useRef<(HTMLElement | null)[]>([])
  const animationFrameRef = useRef<number | null>(null)
  
  // Set up intersection observer to detect when section is visible
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

  // Initialize speedometer segments when visible
  useEffect(() => {
    if (!isVisible || !speedometerRef.current) return

    // Initialize segment references
    segmentRefs.current = Array(12).fill(null)

    // Create the segment elements and initialize anime.js animation
    const speedometer = speedometerRef.current
    speedometer.innerHTML = '' // Clear existing content
    
    // Create segments with proper positioning
    for (let i = 0; i < 12; i++) {
      const rotation = -90 + (i * 180) / 11
      const isRed = i >= 8
      
      const segment = document.createElement('div')
      segment.className = `speedometer-segment ${isRed ? 'red-segment' : 'gray-segment'}`
      segment.style.transform = `rotate(${rotation}deg)`
      
      // Store ref to the segment
      segmentRefs.current[i] = segment
      speedometer.appendChild(segment)
    }
    
    // Initialize all segments as inactive
    anime.set(segmentRefs.current, {
      opacity: 0.15,
      backgroundColor: (el, i) => i >= 8 ? '#8B3E3E' : '#4A4A4A'
    })
    
    // Start the engine redlining animation
    startRedliningAnimation()
  }, [isVisible])
  
  // Redlining animation effect - fills segments based on speed
  const startRedliningAnimation = () => {
    let lastSegmentCount = 0
    
    const updateSegments = () => {
      if (!isVisible || segmentRefs.current.length === 0) return
      
      // Calculate how many segments should be active based on speed
      const normalizedSpeed = Math.min(400, Math.max(60, speedValue))
      let segmentsToFill = Math.floor(((normalizedSpeed - 60) / (400 - 60)) * 12)
      
      // Add "redlining" effect when in red zone
      if (segmentsToFill > 8) {
        // When in red zone, create erratic behavior
        if (Math.random() < 0.4) {
          // Randomly drop 1-2 segments for the redlining effect
          const drop = Math.floor(Math.random() * Math.min(2, segmentsToFill - 8)) + 1
          segmentsToFill -= drop
        }
      }
      
      // Only update if the segment count has changed
      if (lastSegmentCount !== segmentsToFill) {
        // Update active segments
        segmentRefs.current.forEach((segment, index) => {
          if (!segment) return
          
          const isRed = index >= 8
          
          if (index < segmentsToFill) {
            // Activate segment with flickering animation
            if (isRed) {
              // Red segments have more intense flickering
              anime.remove(segment)
              anime({
                targets: segment,
                opacity: [0.7, 1, 0.6, 0.9, 0.8],
                backgroundColor: '#FF3E3E',
                easing: 'steps(5)',
                duration: 200 + Math.random() * 100,
                loop: true
              })
            } else {
              // Gray segments have milder flickering
              anime.remove(segment)
              anime({
                targets: segment,
                opacity: [0.4, 0.7, 0.5, 0.6, 0.45],
                backgroundColor: '#5A5A5A',
                easing: 'steps(5)',
                duration: 300 + Math.random() * 150,
                loop: true
              })
            }
          } else {
            // Deactivate segment
            anime.remove(segment)
            anime({
              targets: segment,
              opacity: 0.15,
              backgroundColor: isRed ? '#8B3E3E' : '#4A4A4A',
              duration: 200,
              easing: 'easeOutQuad'
            })
          }
        })
        
        lastSegmentCount = segmentsToFill
      }
      
      // Update at a rate that increases with speed
      const updateDelay = Math.max(50, 150 - (normalizedSpeed / 400) * 100)
      setTimeout(updateSegments, updateDelay)
    }
    
    updateSegments()
  }

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
                {/* Custom Speedometer using anime.js */}
                <div className="relative mx-auto" style={{ width: '320px', height: '160px' }}>
                  {/* Speedometer base */}
                  <div 
                    ref={speedometerRef}
                    className="speedometer-container"
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Segments will be generated here by anime.js */}
                  </div>

                  {/* Digital display - moved to center of the speedometer */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[10%] text-center">
                    <div className="text-6xl font-mono text-white tracking-wider" style={{ fontFamily: "monospace" }}>
                      {speedValue}
                    </div>
                    <div className="text-orange-400 text-lg font-mono mt-1">LEADS/DAY</div>
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

      {/* CSS for speedometer segments */}
      <style jsx global>{`
        .speedometer-segment {
          position: absolute;
          top: 10px;
          left: 50%;
          width: 30px;
          height: 60px;
          transform-origin: center 75px;
          border-radius: 2px;
          transition: opacity 0.2s ease;
        }
        
        .red-segment {
          background-color: #8B3E3E;
        }
        
        .gray-segment {
          background-color: #4A4A4A;
        }
      `}</style>
    </section>
  )
}