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
  const [cursors, setCursors] = useState([
    { 
      id: 1, 
      name: "Jessica", 
      color: "#4CC9F0",
      x: 180, 
      y: 150,
      targetX: 280,
      targetY: 120,
      width: 62,
      shape: "keyword-rankings",
      transitionMs: 0,
      speed: 1.2
    },
    { 
      id: 2, 
      name: "Michael", 
      color: "#F72585",
      x: 420, 
      y: 220,
      targetX: 180,
      targetY: 180,
      width: 69,
      shape: "traffic-analysis",
      transitionMs: 0,
      speed: 0.8
    },
    { 
      id: 3, 
      name: "Sarah", 
      color: "#FFBE0B",
      x: 320, 
      y: 280,
      targetX: 400,
      targetY: 320,
      width: 56,
      shape: "backlinks",
      transitionMs: 0,
      speed: 1.5
    },
    { 
      id: 4, 
      name: "David", 
      color: "#7209B7",
      x: 520, 
      y: 340,
      targetX: 600,
      targetY: 200,
      width: 82,
      shape: "page-optimization",
      transitionMs: 0,
      speed: 1.0
    }
  ])
  
  const dashboardRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  
  // Set mounted state to true after hydration
  useEffect(() => {
    setMounted(true)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
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

  // Cursor animation effect - only runs client-side after component is mounted
  useEffect(() => {
    if (!mounted) return
    
    // Function to generate random position within dashboard bounds
    const getRandomPosition = () => {
      if (!dashboardRef.current) return { x: 0, y: 0 }
      
      const rect = dashboardRef.current.getBoundingClientRect()
      // Use dashboard dimensions with padding to keep cursors visible
      const padding = 80
      const maxX = rect.width - padding
      const maxY = rect.height - padding
      const minX = padding
      const minY = padding
      
      return {
        x: Math.floor(Math.random() * (maxX - minX) + minX),
        y: Math.floor(Math.random() * (maxY - minY) + minY)
      }
    }
    
    // Update cursor target positions periodically
    const moveInterval = setInterval(() => {
      setCursors(prev => prev.map(cursor => {
        const newPos = getRandomPosition()
        return {
          ...cursor,
          targetX: newPos.x,
          targetY: newPos.y,
          transitionMs: Math.floor(1500 + Math.random() * 1000)
        }
      }))
    }, 3000)
    
    // Animate cursor positions with requestAnimationFrame for smooth movement
    const animateCursors = () => {
      setCursors(prev => prev.map(cursor => {
        const dx = cursor.targetX - cursor.x
        const dy = cursor.targetY - cursor.y
        
        // If very close to target, just snap to it
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
          return cursor
        }
        
        return {
          ...cursor,
          x: cursor.x + dx * 0.05 * cursor.speed,
          y: cursor.y + dy * 0.05 * cursor.speed
        }
      }))
      
      animationFrameRef.current = requestAnimationFrame(animateCursors)
    }
    
    animationFrameRef.current = requestAnimationFrame(animateCursors)
    
    return () => {
      clearInterval(moveInterval)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [mounted])

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
              className="relative rounded-xl overflow-hidden shadow-2xl mx-auto dashboard-preview"
            >
              {/* The SEO Dashboard Image */}
              <div className="relative">
                <div className="bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-lg overflow-hidden p-5">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-6 px-2">
                    <div className="flex items-center space-x-4">
                      <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <span className="font-bold text-lg">L</span>
                      </div>
                      <div className="text-white text-lg font-garnett font-medium">LeadAIO Dashboard</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold font-universal">
                        Live Data
                      </div>
                      <div className="w-8 h-8 bg-gray-700 rounded-full border-2 border-gray-600 overflow-hidden flex-shrink-0">
                        <div className="bg-gradient-to-br from-blue-300 to-indigo-400 w-full h-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashboard Grid */}
                  <div className="grid grid-cols-12 gap-5">
                    {/* Organic Traffic Panel */}
                    <div className="col-span-8 bg-gray-800/80 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-garnett font-medium">Organic Traffic Growth</h3>
                        <div className="flex items-center space-x-2">
                          <div className="text-emerald-400 text-sm font-universal font-medium">+48.3% ↑</div>
                        </div>
                      </div>
                      <div className="h-48 w-full relative">
                        <svg viewBox="0 0 400 150" className="w-full h-full">
                          {/* Grid lines */}
                          <line x1="0" y1="30" x2="400" y2="30" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="0" y1="60" x2="400" y2="60" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="0" y1="90" x2="400" y2="90" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="0" y1="120" x2="400" y2="120" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />
                          
                          {/* Main area chart */}
                          <defs>
                            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
                            </linearGradient>
                            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6"/>
                              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05"/>
                            </linearGradient>
                          </defs>
                          
                          {/* Second dataset (purple) */}
                          <path 
                            d="M0,145 C40,135 80,120 120,130 C160,140 200,130 240,120 C280,110 320,100 400,110 L400,150 L0,150 Z" 
                            fill="url(#purpleGradient)"
                            strokeWidth="2"
                            stroke="#8B5CF6"
                          />
                          
                          {/* First dataset (blue) */}
                          <path 
                            d="M0,120 C40,110 80,90 120,75 C160,60 200,45 240,30 C280,15 320,20 400,25 L400,150 L0,150 Z" 
                            fill="url(#blueGradient)"
                            strokeWidth="0"
                          />
                          <path 
                            d="M0,120 C40,110 80,90 120,75 C160,60 200,45 240,30 C280,15 320,20 400,25" 
                            fill="none"
                            strokeWidth="3"
                            stroke="#3B82F6"
                          />
                          
                          {/* Data points (blue) */}
                          <circle cx="120" cy="75" r="4" fill="#3B82F6" stroke="#111827" strokeWidth="2" />
                          <circle cx="240" cy="30" r="5" fill="#3B82F6" stroke="#111827" strokeWidth="2" />
                          <circle cx="320" cy="20" r="4" fill="#3B82F6" stroke="#111827" strokeWidth="2" />
                        </svg>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex items-center justify-between text-xs mt-2">
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-sm bg-blue-500 mr-2"></div>
                            <span className="text-gray-300">Organic Search</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-sm bg-purple-500 mr-2"></div>
                            <span className="text-gray-300">Direct Traffic</span>
                          </div>
                        </div>
                        <div className="text-gray-400">Last 90 days</div>
                      </div>
                    </div>
                    
                    {/* Keyword Rankings Panel */}
                    <div className="col-span-4 bg-gray-800/80 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50 flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-garnett font-medium">Keyword Rankings</h3>
                        <div className="flex items-center space-x-1">
                          <span className="text-emerald-400 text-sm font-universal">+16</span>
                          <span className="text-emerald-400">↑</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4 flex-grow">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-300">Top 3 positions</span>
                            <span className="text-white font-medium">24</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-500 to-green-400 h-full rounded-full" style={{ width: "75%" }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-300">Top 10 positions</span>
                            <span className="text-white font-medium">52</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full rounded-full" style={{ width: "88%" }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-300">New rankings</span>
                            <span className="text-white font-medium">16</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full" style={{ width: "45%" }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-indigo-500/20 rounded-lg p-2.5 border border-indigo-500/30">
                        <div className="flex items-center text-indigo-300 text-xs">
                          <span className="bg-indigo-500 h-2 w-2 rounded-full mr-2"></span>
                          <span>AI strategy found 8 new high-value keywords</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Site Health Panel */}
                    <div className="col-span-4 bg-gray-800/80 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white font-garnett font-medium">Site Health</h3>
                        <div className="text-gray-400 text-xs font-universal">Updated today</div>
                      </div>
                      
                      <div className="flex items-center justify-center h-32">
                        <div className="relative w-28 h-28">
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
                              strokeDashoffset="56"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-white">80</span>
                            <span className="text-gray-400 text-xs">/ 100</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="bg-gray-700/60 rounded p-2 text-center">
                          <div className="text-emerald-400 text-sm font-medium">28</div>
                          <div className="text-gray-400 text-xs">Fixed</div>
                        </div>
                        <div className="bg-gray-700/60 rounded p-2 text-center">
                          <div className="text-amber-400 text-sm font-medium">12</div>
                          <div className="text-gray-400 text-xs">Warnings</div>
                        </div>
                        <div className="bg-gray-700/60 rounded p-2 text-center">
                          <div className="text-red-400 text-sm font-medium">5</div>
                          <div className="text-gray-400 text-xs">Errors</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Backlink Analysis Panel */}
                    <div className="col-span-8 bg-gray-800/80 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-garnett font-medium">Backlink Profile</h3>
                        <div className="bg-blue-500/20 px-2 py-1 rounded text-blue-300 text-xs font-universal">348 total links</div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-3 border border-gray-600/30">
                          <div className="text-gray-300 text-xs mb-1.5 font-universal">High Authority</div>
                          <div className="text-white text-xl font-medium font-garnett">186</div>
                          <div className="text-emerald-400 text-xs mt-1 flex items-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                            </svg>
                            12.8%
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-3 border border-gray-600/30">
                          <div className="text-gray-300 text-xs mb-1.5 font-universal">Medium</div>
                          <div className="text-white text-xl font-medium font-garnett">104</div>
                          <div className="text-emerald-400 text-xs mt-1 flex items-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                            </svg>
                            5.2%
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-3 border border-gray-600/30">
                          <div className="text-gray-300 text-xs mb-1.5 font-universal">Low Quality</div>
                          <div className="text-white text-xl font-medium font-garnett">42</div>
                          <div className="text-red-400 text-xs mt-1 flex items-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                            3.1%
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-3 border border-gray-600/30">
                          <div className="text-gray-300 text-xs mb-1.5 font-universal">New (7 days)</div>
                          <div className="text-white text-xl font-medium font-garnett">16</div>
                          <div className="text-emerald-400 text-xs mt-1 flex items-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                            </svg>
                            23.5%
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Optimization Panel */}
                    <div className="col-span-12 bg-gray-800/80 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white font-garnett font-medium">Top Optimization Opportunities</h3>
                        <div className="text-gray-400 text-xs font-universal">12 new suggestions</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-1">
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-lg p-3 border border-blue-700/30 hover:border-blue-600/40 transition-colors group cursor-pointer">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center mr-3">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-400">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                              </svg>
                            </div>
                            <h4 className="text-blue-300 text-sm font-medium group-hover:text-blue-200">Content Length</h4>
                          </div>
                          <p className="text-gray-400 text-xs">Increase your homepage content by at least 300 words for better ranking potential.</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-lg p-3 border border-purple-700/30 hover:border-purple-600/40 transition-colors group cursor-pointer">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center mr-3">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-400">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                              </svg>
                            </div>
                            <h4 className="text-purple-300 text-sm font-medium group-hover:text-purple-200">Meta Descriptions</h4>
                          </div>
                          <p className="text-gray-400 text-xs">6 pages missing optimized meta descriptions. AI can generate these for you.</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-lg p-3 border border-green-700/30 hover:border-green-600/40 transition-colors group cursor-pointer">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center mr-3">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                              </svg>
                            </div>
                            <h4 className="text-green-300 text-sm font-medium group-hover:text-green-200">Page Speed</h4>
                          </div>
                          <p className="text-gray-400 text-xs">Optimize image sizes on product pages to improve load time by up to 38%.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Cursor Overlay - Positioned absolutely over the dashboard */}
                <div className="absolute inset-0 pointer-events-none z-30">
                  {mounted && cursors.map((cursor) => (
                    <div 
                      key={cursor.id}
                      className="absolute z-40"
                      style={{
                        transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0px)`,
                        left: 0,
                        top: 0,
                        transition: cursor.transitionMs > 0 ? `transform ${cursor.transitionMs}ms ease` : undefined
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {/* Custom cursor shapes */}
                        <svg 
                          width={cursor.width} 
                          height="30" 
                          viewBox={`0 0 ${cursor.width} 30`} 
                          xmlns="http://www.w3.org/2000/svg"
                          className="drop-shadow-md"
                        >
                          <path 
                            d={`M${cursor.width - 5}.0988 7.09875L${cursor.width - 1}.9013 10.9012C${cursor.width - 0.4}.6044 11.6044 ${cursor.width} 12.5587 ${cursor.width} 13.5525V28.5C${cursor.width} 29.3288 ${cursor.width - 0.6712} 30 ${cursor.width - 1.5} 30H13.5525C12.5587 30 11.6044 29.6044 10.9012 28.9013L7.09875 25.0988C6.39562 24.3956 6 23.4412 6 22.4475V7.5C6 6.67125 6.67125 6 7.49999 6H${cursor.width - 7.5525}C${cursor.width - 6.5587} 6 ${cursor.width - 5.6044} 6.39563 ${cursor.width - 5}.0988 7.09875Z`}
                            fill={cursor.color}
                          />
                          <rect fill={cursor.color} height="6" rx="1" width="6" />
                        </svg>
                        <div 
                          className="px-2 py-1 text-xs text-white rounded-md shadow-md whitespace-nowrap"
                          style={{ backgroundColor: cursor.color, opacity: 0.95 }}
                        >
                          {cursor.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}