"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function HeroSection() {
  const [currentWord1, setCurrentWord1] = useState(0)
  const [currentWord2, setCurrentWord2] = useState(0)
  const words1 = ["business", "startup", "agency", "brand", "expert"]
  const words2 = ["rankings", "results", "traffic", "dominance", "growth"]
  const [mounted, setMounted] = useState(false)
  const [cursorPositions, setCursorPositions] = useState([
    { 
      id: 1, 
      name: "Jessica", 
      color: "#A8D9FF", 
      x: 180, 
      y: 150, 
      targetX: 300, 
      targetY: 180,
      speed: 2.5
    },
    { 
      id: 2, 
      name: "Michael", 
      color: "#FAC666", 
      x: 400, 
      y: 220, 
      targetX: 200, 
      targetY: 300,
      speed: 2.0
    },
    { 
      id: 3, 
      name: "Sarah", 
      color: "#FF9EB3", 
      x: 320, 
      y: 280, 
      targetX: 450, 
      targetY: 200,
      speed: 1.8
    },
    { 
      id: 4, 
      name: "David", 
      color: "#8DECA6", 
      x: 520, 
      y: 340, 
      targetX: 580, 
      targetY: 260,
      speed: 2.2
    }
  ])
  
  const dashboardRef = useRef<HTMLDivElement>(null)
  const animationFrameId = useRef<number | null>(null)
  
  // Set mounted state to true after hydration
  useEffect(() => {
    setMounted(true)
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  // Word carousel effect
  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentWord1((prev) => (prev + 1) % words1.length)
    }, 3000)

    const interval2 = setInterval(() => {
      setCurrentWord2((prev) => (prev + 1) % words2.length)
    }, 3000)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
    }
  }, [])

  // Cursor animation effect - client-side only
  useEffect(() => {
    if (!mounted || !dashboardRef.current) return
    
    const getRandomPosition = () => {
      const rect = dashboardRef.current?.getBoundingClientRect()
      if (!rect) return { x: 0, y: 0 }
      
      // Keep cursors within dashboard bounds with padding
      const padding = 60
      const minX = padding
      const maxX = rect.width - padding
      const minY = padding
      const maxY = rect.height - padding
      
      return {
        x: Math.floor(minX + Math.random() * (maxX - minX)),
        y: Math.floor(minY + Math.random() * (maxY - minY))
      }
    }
    
    // Function to smoothly animate cursors
    const moveCursors = () => {
      setCursorPositions(prevPositions => {
        return prevPositions.map(cursor => {
          // Calculate distance to target
          const dx = cursor.targetX - cursor.x
          const dy = cursor.targetY - cursor.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // If close to target, set new target
          if (distance < 5) {
            const newTarget = getRandomPosition()
            return {
              ...cursor,
              targetX: newTarget.x,
              targetY: newTarget.y
            }
          }
          
          // Otherwise, move toward target
          return {
            ...cursor,
            x: cursor.x + (dx / distance) * cursor.speed,
            y: cursor.y + (dy / distance) * cursor.speed
          }
        })
      })
      
      animationFrameId.current = requestAnimationFrame(moveCursors)
    }
    
    // Start animation
    animationFrameId.current = requestAnimationFrame(moveCursors)
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [mounted])

  // Find the longest word in each array to set fixed widths
  const longestWord1 = words1.reduce((a, b) => (a.length > b.length ? a : b), "")
  const longestWord2 = words2.reduce((a, b) => (a.length > b.length ? a : b), "")

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-white">
      <div className="section-container relative z-10">
        <div className="section-panel bg-cream">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl mb-6 leading-tight text-gray-900 font-garnett">
              The SEO that every{" "}
              <span
                className="relative inline-block overflow-hidden"
                style={{
                  minWidth: `${longestWord1.length * 0.7}em`, 
                  height: "1.2em",
                  verticalAlign: "bottom",
                }}
              >
                {/* Static underline that always stays */}
                <span
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    backgroundColor: "#ff4d00",
                    height: "4px",
                  }}
                />
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={words1[currentWord1]}
                    className="absolute inset-0 flex items-center justify-center font-garnett"
                    style={{
                      color: "#ff4d00",
                    }}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {words1[currentWord1]}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              needs for winning{" "}
              <span
                className="relative inline-block overflow-hidden"
                style={{
                  minWidth: `${longestWord2.length * 0.7}em`,
                  height: "1.2em",
                  verticalAlign: "bottom",
                }}
              >
                {/* Static underline that always stays */}
                <span
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    backgroundColor: "#ff4d00",
                    height: "4px",
                  }}
                />
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={words2[currentWord2]}
                    className="absolute inset-0 flex items-center justify-center font-garnett"
                    style={{
                      color: "#ff4d00",
                    }}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {words2[currentWord2]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-universal">
              Stop guessing what works. LeadAIO uses advanced AI to optimize your search presence, generate quality
              leads, and grow your business automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="/signup" className="index-button index-button-primary flex items-center justify-center gap-2">
                Get started <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Dashboard Preview - REDUCED HEIGHT by limiting max-height */}
          <div className="relative w-full max-w-6xl mx-auto mt-6">
            <motion.div
              ref={dashboardRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-xl overflow-hidden shadow-2xl mx-auto"
              style={{ maxHeight: "450px" }} // Reduced height here
            >
              {/* Dashboard UI */}
              <div className="bg-gradient-to-br from-[#0F1724] to-[#1a202c] rounded-xl p-5 relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white shadow-md">
                      <span className="font-bold">L</span>
                    </div>
                    <div className="text-white text-lg font-garnett ml-3">LeadAIO</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-semibold">
                      Live Data
                    </div>
                    <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
                      <span className="text-gray-300 text-xs font-medium">JS</span>
                    </div>
                  </div>
                </div>
                
                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Traffic Chart */}
                  <div className="col-span-8 bg-gradient-to-br from-[#151c28] to-[#1c2330] rounded-lg p-4 shadow-lg border border-gray-800/50">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white text-sm font-garnett">Organic Traffic Growth</h3>
                      <div className="bg-emerald-500/20 px-2 py-1 rounded text-emerald-300 text-xs">
                        +58% ↑
                      </div>
                    </div>
                    
                    <div className="h-[140px]"> {/* Reduced height here */}
                      <svg className="w-full h-full" viewBox="0 0 400 150">
                        {/* Grid Lines */}
                        <line x1="0" y1="25" x2="400" y2="25" stroke="#2D3748" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="50" x2="400" y2="50" stroke="#2D3748" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="75" x2="400" y2="75" stroke="#2D3748" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="100" x2="400" y2="100" stroke="#2D3748" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="125" x2="400" y2="125" stroke="#2D3748" strokeWidth="1" strokeDasharray="4" />
                        
                        {/* Area Chart Gradients */}
                        <defs>
                          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#4361EE" stopOpacity="0.6"/>
                            <stop offset="100%" stopColor="#4361EE" stopOpacity="0.1"/>
                          </linearGradient>
                          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#7209B7" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#7209B7" stopOpacity="0.02"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Direct Traffic (Purple) */}
                        <path 
                          d="M0,140 C30,135 70,130 120,125 S200,120 240,115 S350,110 400,105 V150 H0 Z" 
                          fill="url(#purpleGradient)" 
                        />
                        <path 
                          d="M0,140 C30,135 70,130 120,125 S200,120 240,115 S350,110 400,105" 
                          fill="none" 
                          stroke="#7209B7" 
                          strokeWidth="2"
                        />
                        
                        {/* Organic Traffic (Blue) */}
                        <path 
                          d="M0,110 C40,100 80,80 120,60 S180,30 240,25 S320,20 400,30 V150 H0 Z" 
                          fill="url(#blueGradient)" 
                        />
                        <path 
                          d="M0,110 C40,100 80,80 120,60 S180,30 240,25 S320,20 400,30" 
                          fill="none" 
                          stroke="#4361EE" 
                          strokeWidth="2.5"
                        />
                        
                        {/* Data Points */}
                        <circle cx="120" cy="60" r="4" fill="#4361EE" stroke="#0F172A" strokeWidth="1.5" />
                        <circle cx="240" cy="25" r="4" fill="#4361EE" stroke="#0F172A" strokeWidth="1.5" />
                        <circle cx="340" cy="27" r="4" fill="#4361EE" stroke="#0F172A" strokeWidth="1.5" />
                      </svg>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs mt-2">
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 bg-[#4361EE] rounded-sm mr-1.5"></div>
                          <span className="text-blue-300">Organic Search</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 bg-[#7209B7] rounded-sm mr-1.5"></div>
                          <span className="text-purple-300">Direct Traffic</span>
                        </div>
                      </div>
                      <div className="text-gray-400">Last 90 days</div>
                    </div>
                  </div>
                  
                  {/* Keyword Rankings */}
                  <div className="col-span-4 bg-gradient-to-br from-[#151c28] to-[#1c2330] rounded-lg p-4 shadow-lg border border-gray-800/50">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white text-sm font-garnett">Keyword Rankings</h3>
                      <div className="text-emerald-400 text-xs font-medium">
                        +12 ↑
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Top 3 positions</span>
                          <span className="text-white font-medium">18</span>
                        </div>
                        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{width: "65%"}}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Top 10 positions</span>
                          <span className="text-white font-medium">42</span>
                        </div>
                        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#4361EE] to-[#4CC9F0] rounded-full" style={{width: "78%"}}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Position improvements</span>
                          <span className="text-white font-medium">+21</span>
                        </div>
                        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#F72585] to-[#FF9E00] rounded-full" style={{width: "45%"}}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* AI Insight */}
                    <div className="mt-3 bg-[#4361EE]/10 border border-[#4361EE]/20 rounded p-2 text-xs text-blue-300">
                      <div className="flex items-start">
                        <div className="h-4 w-4 rounded-full bg-[#4361EE]/20 flex items-center justify-center mt-0.5 mr-2">
                          <span className="text-blue-400 text-[10px]">AI</span>
                        </div>
                        <span>8 new high-value keyword opportunities identified</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Backlink Profile - Compact with no wasted space */}
                  <div className="col-span-7 bg-gradient-to-br from-[#151c28] to-[#1c2330] rounded-lg p-4 shadow-lg border border-gray-800/50">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white text-sm font-garnett">Backlink Profile</h3>
                      <div className="text-xs text-blue-300 bg-[#4361EE]/20 px-2 py-0.5 rounded-full">
                        372 total links
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3">
                      <div className="bg-[#1a2234]/60 p-2 rounded border border-gray-800/50">
                        <div className="text-xs text-gray-400 mb-1">High Authority</div>
                        <div className="text-white font-medium">204</div>
                        <div className="text-emerald-400 text-xs mt-1">+9.2% ↑</div>
                      </div>
                      
                      <div className="bg-[#1a2234]/60 p-2 rounded border border-gray-800/50">
                        <div className="text-xs text-gray-400 mb-1">Medium</div>
                        <div className="text-white font-medium">108</div>
                        <div className="text-emerald-400 text-xs mt-1">+4.5% ↑</div>
                      </div>
                      
                      <div className="bg-[#1a2234]/60 p-2 rounded border border-gray-800/50">
                        <div className="text-xs text-gray-400 mb-1">Low Quality</div>
                        <div className="text-white font-medium">38</div>
                        <div className="text-red-400 text-xs mt-1">-2.3% ↓</div>
                      </div>
                      
                      <div className="bg-[#1a2234]/60 p-2 rounded border border-gray-800/50">
                        <div className="text-xs text-gray-400 mb-1">New (7d)</div>
                        <div className="text-white font-medium">22</div>
                        <div className="text-emerald-400 text-xs mt-1">+24% ↑</div>
                      </div>
                    </div>
                    
                    {/* Domain stats - Fills the empty space */}
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div className="flex items-center bg-[#1a2234]/40 rounded p-2">
                        <div className="h-8 w-8 rounded-full bg-[#4361EE]/20 flex items-center justify-center mr-2">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#4361EE]" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Domain Authority</div>
                          <div className="text-white font-medium text-sm">62 / 100</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-[#1a2234]/40 rounded p-2">
                        <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Trust Score</div>
                          <div className="text-white font-medium text-sm">78 / 100</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-[#1a2234]/40 rounded p-2">
                        <div className="h-8 w-8 rounded-full bg-[#F72585]/20 flex items-center justify-center mr-2">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#F72585]" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Avg. Link Age</div>
                          <div className="text-white font-medium text-sm">9.2 months</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Site Health */}
                  <div className="col-span-5 bg-gradient-to-br from-[#151c28] to-[#1c2330] rounded-lg p-4 shadow-lg border border-gray-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-white text-sm font-garnett">Site Health</h3>
                      <div className="text-gray-400 text-xs">Updated today</div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <div className="relative h-20 w-20"> {/* Reduced size here */}
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {/* Background circle */}
                          <circle 
                            cx="50" cy="50" r="40" 
                            fill="none" 
                            stroke="#2D3748" 
                            strokeWidth="8"
                          />
                          {/* Progress circle */}
                          <circle 
                            cx="50" cy="50" r="40" 
                            fill="none" 
                            stroke="#10B981" 
                            strokeWidth="8"
                            strokeDasharray="251.2"
                            strokeDashoffset="50.24"
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-white">80</span>
                          <span className="text-gray-400 text-xs">/ 100</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="bg-[#1a2234]/40 rounded p-2 text-center">
                        <div className="text-emerald-400 text-sm font-medium">24</div>
                        <div className="text-gray-400 text-xs">Fixed</div>
                      </div>
                      <div className="bg-[#1a2234]/40 rounded p-2 text-center">
                        <div className="text-amber-400 text-sm font-medium">8</div>
                        <div className="text-gray-400 text-xs">Warnings</div>
                      </div>
                      <div className="bg-[#1a2234]/40 rounded p-2 text-center">
                        <div className="text-red-400 text-sm font-medium">3</div>
                        <div className="text-gray-400 text-xs">Errors</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Platform Ranking Scores (replaced content optimization) - CHANGED BACKGROUND */}
                  <div className="col-span-12 bg-[#111827] rounded-lg p-4 shadow-lg border border-gray-800/50">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white text-sm font-garnett">AI Platform Ranking Scores</h3>
                      <div className="text-gray-400 text-xs">Last updated: 3 hours ago</div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-3">
                      <div className="bg-[#131b2c] border border-[#4361EE]/30 rounded p-3 hover:border-[#4361EE]/40 transition-colors">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 bg-[#4361EE]/30 rounded-full flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#4361EE]" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <span className="text-xs text-[#4361EE] font-medium">Google</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-lg font-bold text-white">92</div>
                          <div className="text-xs text-emerald-400">+4 ↑</div>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                          <div className="h-full bg-[#4361EE] rounded-full" style={{width: "92%"}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-[#131b2c] border border-[#7209B7]/30 rounded p-3 hover:border-[#7209B7]/40 transition-colors">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 bg-[#7209B7]/30 rounded-full flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#7209B7]" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-xs text-[#7209B7] font-medium">ChatGPT</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-lg font-bold text-white">85</div>
                          <div className="text-xs text-emerald-400">+7 ↑</div>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                          <div className="h-full bg-[#7209B7] rounded-full" style={{width: "85%"}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-[#131b2c] border border-[#F72585]/30 rounded p-3 hover:border-[#F72585]/40 transition-colors">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 bg-[#F72585]/30 rounded-full flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#F72585]" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          </div>
                          <span className="text-xs text-[#F72585] font-medium">Gemini</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-lg font-bold text-white">78</div>
                          <div className="text-xs text-emerald-400">+3 ↑</div>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                          <div className="h-full bg-[#F72585] rounded-full" style={{width: "78%"}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-[#131b2c] border border-[#4CC9F0]/30 rounded p-3 hover:border-[#4CC9F0]/40 transition-colors">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 bg-[#4CC9F0]/30 rounded-full flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#4CC9F0]" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-xs text-[#4CC9F0] font-medium">Anthropic</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-lg font-bold text-white">81</div>
                          <div className="text-xs text-emerald-400">+5 ↑</div>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                          <div className="h-full bg-[#4CC9F0] rounded-full" style={{width: "81%"}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-[#131b2c] border border-[#FB8B24]/30 rounded p-3 hover:border-[#FB8B24]/40 transition-colors">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 bg-[#FB8B24]/30 rounded-full flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#FB8B24]" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <span className="text-xs text-[#FB8B24] font-medium">DeepSeek</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-lg font-bold text-white">73</div>
                          <div className="text-xs text-emerald-400">+9 ↑</div>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                          <div className="h-full bg-[#FB8B24] rounded-full" style={{width: "73%"}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cursor overlay - Client-side only */}
              {mounted && (
                <div className="absolute inset-0 pointer-events-none">
                  {cursorPositions.map((cursor) => (
                    <div 
                      key={cursor.id}
                      className="cursors-item absolute z-20 pointer-events-none"
                      style={{
                        left: 0,
                        top: 0,
                        transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0px)`,
                        transition: 'all 0.1s linear'
                      }}
                    >
                      <div className="flex items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 3L13 13M3 13L13 3" stroke={cursor.color} strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <div 
                          className="ml-1 px-2 py-1 text-xs text-white rounded-md"
                          style={{ backgroundColor: cursor.color }}
                        >
                          {cursor.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}