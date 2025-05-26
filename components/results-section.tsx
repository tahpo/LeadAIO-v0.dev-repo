"use client"

import { useRef, useEffect, useState } from "react"
import anime from "animejs"

export function ResultsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [speedValue, setSpeedValue] = useState(60)
  const [isVisible, setIsVisible] = useState(false)
  const [redSegmentCount, setRedSegmentCount] = useState(0)
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

  // Red segment length animation
  useEffect(() => {
    if (!isVisible) return

    // Animate the red segments to give growing/shrinking effect
    const redSegmentAnimation = anime({
      targets: { count: 0 },
      count: 4,
      easing: 'easeInOutSine',
      duration: 2000,
      loop: true,
      direction: 'alternate',
      update: (anim) => {
        const newCount = Math.floor(anim.animations[0].currentValue)
        setRedSegmentCount(newCount)
      }
    })

    return () => {
      redSegmentAnimation.pause()
    }
  }, [isVisible])

  // Counter animation
  useEffect(() => {
    if (!isVisible) return

    // First phase: Quick animation from 60 to 150
    const phase1 = anime({
      targets: { value: 60 },
      value: 150,
      duration: 4000,
      easing: 'easeOutExpo',
      update: (anim) => {
        setSpeedValue(Math.floor(anim.animations[0].currentValue))
      },
      complete: () => {
        // Second phase: Slower animation from 150 to 400
        anime({
          targets: { value: 150 },
          value: 400,
          duration: 20000,
          easing: 'easeOutSine',
          update: (anim) => {
            setSpeedValue(Math.floor(anim.animations[0].currentValue))
          }
        })
      }
    })

    return () => {
      phase1.pause()
    }
  }, [isVisible])

  return (
    <div ref={sectionRef} className="bg-[#1a1a1a] rounded-3xl p-8 shadow-xl">
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

                  // Always show gray segments, conditionally show red ones
                  const isVisible = !isRed || i < 8 + redSegmentCount

                  return (
                    <rect
                      key={i}
                      className={isRed ? "animate-flicker-red" : "animate-flicker-gray"}
                      x="185"
                      y="10"
                      width="30"
                      height="60"
                      rx="2"
                      fill={isRed ? "#8B3E3E" : "#4A4A4A"}
                      opacity={isVisible ? "1" : "0"}
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

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes flicker-gray {
          0%, 100% { opacity: 0.4; }
          25% { opacity: 0.6; }
          50% { opacity: 0.3; }
          75% { opacity: 0.5; }
        }
        
        @keyframes flicker-red {
          0%, 100% { opacity: 0.6; }
          25% { opacity: 0.9; }
          50% { opacity: 0.5; }
          75% { opacity: 0.8; }
        }
        
        .animate-flicker-gray {
          animation: flicker-gray 1.2s infinite;
        }
        
        .animate-flicker-red {
          animation: flicker-red 0.8s infinite;
        }
      `}</style>
    </div>
  )
}