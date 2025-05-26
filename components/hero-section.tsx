"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function HeroSection() {
  const [currentWord1, setCurrentWord1] = useState(0)
  const [currentWord2, setCurrentWord2] = useState(0)
  const words1 = ["business", "startup", "agency", "brand", "expert"]
  const words2 = ["rankings", "results", "traffic", "dominance", "growth"]
  const [cursors, setCursors] = useState([
    { 
      id: 1, 
      name: "Alex", 
      color: "#A8D9FF",
      x: 180, 
      y: 150,
      targetX: 320,
      targetY: 170,
      width: 62,
      shape: "keyword-rankings"
    },
    { 
      id: 2, 
      name: "Maria", 
      color: "#EC4B4B",
      x: 420, 
      y: 220,
      targetX: 600,
      targetY: 190,
      width: 69,
      shape: "traffic-analysis"
    },
    { 
      id: 3, 
      name: "James", 
      color: "#FAC666",
      x: 320, 
      y: 280,
      targetX: 150,
      targetY: 340,
      width: 56,
      shape: "backlinks"
    },
    { 
      id: 4, 
      name: "Sophie", 
      color: "#B5B5FF",
      x: 520, 
      y: 340,
      targetX: 480,
      targetY: 400,
      width: 82,
      shape: "page-optimization"
    }
  ])
  
  const dashboardRef = useRef<HTMLDivElement>(null)
  
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

  // Cursor animation effect
  useEffect(() => {
    if (!dashboardRef.current) return
    
    // Function to generate random position within dashboard bounds
    const getRandomPosition = () => {
      const dashboardRect = dashboardRef.current?.getBoundingClientRect()
      if (!dashboardRect) return { x: 0, y: 0 }
      
      // Use dashboard dimensions with padding to keep cursors visible
      const padding = 80
      const maxX = dashboardRect.width - padding
      const maxY = dashboardRect.height - padding
      const minX = padding
      const minY = padding
      
      return {
        x: Math.random() * (maxX - minX) + minX,
        y: Math.random() * (maxY - minY) + minY
      }
    }
    
    // Update cursor positions periodically
    const interval = setInterval(() => {
      setCursors(prevCursors => 
        prevCursors.map(cursor => {
          const { x, y } = getRandomPosition()
          return {
            ...cursor,
            targetX: x,
            targetY: y
          }
        })
      )
    }, 5000)
    
    // Animation loop for smooth cursor movement
    let animationFrameId: number
    const animate = () => {
      setCursors(prevCursors => 
        prevCursors.map(cursor => {
          // Calculate distance to target
          const dx = cursor.targetX - cursor.x
          const dy = cursor.targetY - cursor.y
          
          // If very close to target, don't update to avoid jitter
          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
            return cursor
          }
          
          // Move towards target with easing
          const speed = 0.02
          return {
            ...cursor,
            x: cursor.x + dx * speed,
            y: cursor.y + dy * speed
          }
        })
      )
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate()
    
    // Cleanup
    return () => {
      clearInterval(interval)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Find the longest word in each array to set fixed widths - increased multiplier for better spacing
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
                {/* Static underline that always stays - made slightly thicker */}
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
                {/* Static underline that always stays - made slightly thicker */}
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href="/signup" className="index-button index-button-primary flex items-center justify-center gap-2">
                Get started <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Dashboard Preview with Cursors */}
          <div className="relative w-full max-w-6xl mx-auto mt-12">
            <motion.div
              ref={dashboardRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-xl overflow-hidden shadow-2xl mx-auto"
            >
              {/* The SEO Dashboard Image */}
              <div className="relative">
                <div className="bg-[#1a1a1f] rounded-lg overflow-hidden">
                  {/* Dashboard Content */}
                  <div className="p-6">
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                          <span className="font-bold">L</span>
                        </div>
                        <div className="text-white text-lg font-garnett">LeadAIO Dashboard</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-universal">
                          Real-time data
                        </div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Organic Traffic Panel */}
                      <div className="col-span-2 bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-white text-sm font-garnett">Organic Traffic</h3>
                          <div className="flex items-center space-x-2">
                            <div className="text-green-400 text-sm font-universal">+34% ↑</div>
                          </div>
                        </div>
                        <div className="h-40 w-full relative">
                          <svg viewBox="0 0 400 150" className="w-full h-full">
                            {/* Blue gradient area chart */}
                            <defs>
                              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
                              </linearGradient>
                            </defs>
                            <path 
                              d="M0,120 C30,100 60,80 100,75 C140,70 180,90 220,65 C260,40 300,20 400,30 L400,150 L0,150 Z" 
                              fill="url(#areaGradient)"
                              strokeWidth="2"
                              stroke="#3B82F6"
                            />
                            <path 
                              d="M0,120 C30,100 60,80 100,75 C140,70 180,90 220,65 C260,40 300,20 400,30" 
                              fill="none"
                              strokeWidth="2"
                              stroke="#3B82F6"
                            />
                            <g>
                              <circle cx="100" cy="75" r="4" fill="#3B82F6" />
                              <circle cx="220" cy="65" r="4" fill="#3B82F6" />
                              <circle cx="300" cy="20" r="4" fill="#3B82F6" />
                            </g>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Keyword Rankings Panel */}
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-white text-sm font-garnett">Keyword Rankings</h3>
                          <div className="text-green-400 text-sm font-universal">+12 ↑</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Top 3 positions</span>
                            <span className="text-white">18</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                          <div className="flex justify-between text-xs mt-3">
                            <span className="text-gray-400">Top 10 positions</span>
                            <span className="text-white">42</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                          <div className="flex justify-between text-xs mt-3">
                            <span className="text-gray-400">New rankings</span>
                            <span className="text-white">7</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: "35%" }}></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Site Health Panel */}
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-white text-sm font-garnett">Site Health</h3>
                        </div>
                        <div className="flex items-center justify-center h-24">
                          <div className="relative w-24 h-24">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="8" />
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="45" 
                                fill="none" 
                                stroke="#10B981" 
                                strokeWidth="8"
                                strokeDasharray="283"
                                strokeDashoffset="57"
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold text-white">80%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs mt-2">
                          <span className="text-green-400 flex items-center">
                            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                            Fixed
                          </span>
                          <span className="text-orange-400 flex items-center">
                            <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mr-1"></span>
                            In progress
                          </span>
                        </div>
                      </div>
                      
                      {/* Backlink Analysis Panel */}
                      <div className="bg-gray-800 rounded-lg p-4 col-span-2">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-white text-sm font-garnett">Backlink Analysis</h3>
                          <div className="text-blue-400 text-sm font-universal">240 total</div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="bg-gray-700 rounded-md p-3">
                            <div className="text-gray-400 text-xs mb-1">High quality</div>
                            <div className="text-white text-lg font-garnett">126</div>
                            <div className="text-green-400 text-xs">+8%</div>
                          </div>
                          <div className="bg-gray-700 rounded-md p-3">
                            <div className="text-gray-400 text-xs mb-1">Medium</div>
                            <div className="text-white text-lg font-garnett">84</div>
                            <div className="text-green-400 text-xs">+4%</div>
                          </div>
                          <div className="bg-gray-700 rounded-md p-3">
                            <div className="text-gray-400 text-xs mb-1">Low quality</div>
                            <div className="text-white text-lg font-garnett">30</div>
                            <div className="text-red-400 text-xs">-2%</div>
                          </div>
                          <div className="bg-gray-700 rounded-md p-3">
                            <div className="text-gray-400 text-xs mb-1">New links</div>
                            <div className="text-white text-lg font-garnett">14</div>
                            <div className="text-green-400 text-xs">+12%</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Optimization Panel */}
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-white text-sm font-garnett">Content Optimization</h3>
                        </div>
                        <div className="space-y-3 mt-2">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <div className="text-xs text-gray-300">Optimized pages</div>
                            <div className="ml-auto text-white text-xs">24</div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <div className="text-xs text-gray-300">Needs improvement</div>
                            <div className="ml-auto text-white text-xs">16</div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                            <div className="text-xs text-gray-300">Critical issues</div>
                            <div className="ml-auto text-white text-xs">5</div>
                          </div>
                          <div className="mt-3 bg-blue-500/20 rounded-md p-2">
                            <div className="text-blue-300 text-xs">AI content suggestions ready</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Moving Cursors */}
                {cursors.map((cursor) => (
                  <div 
                    key={cursor.id}
                    className="cursors-item absolute z-20 pointer-events-none"
                    style={{
                      transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0px)`,
                      transition: `transform ${Math.random() * 1000 + 1500}ms`
                    }}
                  >
                    {/* Custom cursor shapes based on SEO context */}
                    <svg 
                      fill="none" 
                      height="30" 
                      viewBox={`0 0 ${cursor.width} 30`} 
                      width={cursor.width} 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d={`M${cursor.width - 5}.0988 7.09875L${cursor.width - 1}.9013 10.9012C${cursor.width - 0.4}.6044 11.6044 ${cursor.width} 12.5587 ${cursor.width} 13.5525V28.5C${cursor.width} 29.3288 ${cursor.width - 0.6712} 30 ${cursor.width - 1.5} 30H13.5525C12.5587 30 11.6044 29.6044 10.9012 28.9013L7.09875 25.0988C6.39562 24.3956 6 23.4412 6 22.4475V7.5C6 6.67125 6.67125 6 7.49999 6H${cursor.width - 7.5525}C${cursor.width - 6.5587} 6 ${cursor.width - 5.6044} 6.39563 ${cursor.width - 5}.0988 7.09875Z`}
                        fill={cursor.color}
                      ></path>
                      <rect fill={cursor.color} height="6" rx="1" width="6"></rect>
                    </svg>
                    <span className="ml-2 text-xs bg-gray-900/80 text-white rounded px-2 py-0.5 whitespace-nowrap">{cursor.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}