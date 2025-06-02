"use client"

import { useRef, useEffect, useState } from "react"
import anime from 'animejs'

export function ResultsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const speedometerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [speedValue, setSpeedValue] = useState(60)
  const [isVisible, setIsVisible] = useState(false)
  const [totalSegments, setTotalSegments] = useState(8)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Total number of segments in the speedometer
  const TOTAL_SEGMENTS = 12;
  // Number of gray segments (rest are red)
  const GRAY_SEGMENTS = 8;

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
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])
  
  // Redline flickering animation using Anime.js
  useEffect(() => {
    if (!isVisible || !speedometerRef.current) return

    // Function to update the speedometer display with faster animations
    const updateSpeedometer = () => {
      const segments = speedometerRef.current?.querySelectorAll('.segment');
      if (!segments) return;

      // Randomly determine active segments (8-12 range)
      const segmentCount = Math.floor(Math.random() * 5) + 8;
      setTotalSegments(segmentCount);

      // Super fast animation for segments
      anime({
        targets: Array.from(segments),
        opacity: (el, i) => {
          if (i < GRAY_SEGMENTS) return [0.6, 0.7];
          return i < segmentCount ? [0.15, 0.9] : [0.9, 0.15];
        },
        fill: (el, i) => {
          if (i < GRAY_SEGMENTS) return '#4A4A4A';
          return i < segmentCount ? ['#8B3E3E', '#FF3E3E'] : ['#FF3E3E', '#8B3E3E'];
        },
        duration: 200,
        easing: 'easeInOutQuad',
        loop: true
      });
    };

    // Start the animation
    updateSpeedometer();
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isVisible]);

  // Counter animation with faster second phase (4 seconds per unit)
  useEffect(() => {
    if (!isVisible) return
    
    // Keep the same counter animation speed
    const animation = anime({
      targets: { value: speedValue },
      value: [60, 400],
      duration: 60000, // 1 minute total duration
      easing: 'easeInOutQuad',
      update: (anim) => {
        setSpeedValue(Math.round(anim.progress * 3.4 + 60));
      },
      loop: true
    });
    
    return () => {
      animation.pause();
    };
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="bg-[#1a1a1a] rounded-2xl p-8 shadow-xl">
      {/* Header */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2a2a2a] mb-6">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          <span className="text-gray-300 text-base">Results focus</span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">Built for results</h3>
        <p className="text-gray-400 leading-relaxed">
          Transform your SEO performance into a lead generation machine. Our optimized platform delivers qualified
          prospects directly to your business.
        </p>
      </div>

      {/* Speedometer Container */}
      <div className="flex flex-col items-center justify-center">
        {/* Digital Speedometer */}
        <div className="relative w-full mb-6">
          {/* Speedometer with animation */}
          <div ref={speedometerRef} className="relative w-full flex justify-center">
            {/* Base layer (gray and red segments) */}
            <div className="relative w-[360px] h-[140px]">
              <svg viewBox="0 0 120 60" className="w-full h-full">
                {/* All 12 segments with spacing */}
                {Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
                  // Slightly adjusted rotation to create spacing
                  const rotation = -90 + (i * 180) / (TOTAL_SEGMENTS - 1);
                  const isRed = i >= GRAY_SEGMENTS;
                  const isActive = i < totalSegments;
                  
                  return (
                    <rect
                      key={i}
                      className="segment"
                      x="54"
                      y="4"
                      width="12"
                      height="24"
                      rx="2"
                      fill={isRed ? (isActive ? "#FF3E3E" : "#8B3E3E") : "#4A4A4A"}
                      opacity={isActive ? (isRed ? 0.9 : 0.7) : 0.15}
                      transform={`rotate(${rotation}, 60, 60)`}
                      // Add spacing between segments
                      strokeWidth="0.5"
                      stroke="#111111"
                    />
                  );
                })}
              </svg>

              {/* Digital display - moved to center of the speedometer */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[10%] text-center">
                <div 
                  data-speed-counter 
                  className="text-5xl font-mono text-white tracking-wider" 
                  style={{ fontFamily: "monospace" }}
                >
                  {speedValue}
                </div>
                <div className="text-orange-400 text-lg font-mono mt-1">LEADS/DAY</div>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between text-gray-500 text-sm font-mono mt-2">
            <div className="whitespace-nowrap">LEAD POTENTIAL</div>
            <div className="text-right">LEAD GENERATION RATE</div>
          </div>
        </div>

        {/* SEO Performance Metrics - moved up with reduced margin */}
        <div className="w-full mb-4 mt-6">
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

        {/* Monthly Growth Stats - kept close to conversion metrics */}
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
      <style jsx>{`
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
          animation: flicker-gray 0.2s infinite;
        }
        
        .animate-flicker-red {
          animation: flicker-red 0.15s infinite;
        }
      `}</style>
    </div>
  )
}