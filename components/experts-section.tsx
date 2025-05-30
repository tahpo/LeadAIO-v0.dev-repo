"use client"

import { useRef, useEffect, useState } from "react"
import anime from 'animejs'
import { User } from 'lucide-react'

export function ExpertsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [typingIndex, setTypingIndex] = useState(0)
  const [showThumbsUp, setShowThumbsUp] = useState(false)
  const [showFire, setShowFire] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [showFirstMessage, setShowFirstMessage] = useState(false)
  const [showSecondMessage, setShowSecondMessage] = useState(false)
  const timeoutsRef = useRef<Array<NodeJS.Timeout>>([])
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [cursorPositions, setCursorPositions] = useState([
    { x: 100, y: 100, color: "#A8D9FF", name: "Jessica", targetX: 150, targetY: 150, speed: 1.5 },
    { x: 180, y: 150, color: "#FAC666", name: "Michael", targetX: 220, targetY: 100, speed: 2 },
    { x: 150, y: 80, color: "#FF9EB3", name: "Sarah", targetX: 120, targetY: 120, speed: 1.8 }
  ])

  // Animation message
  const messageToType = "We've found a high-value keyword cluster that competitors are missing. Search volume is 8.2K/month with low competition."
  
  // Keywords for analysis table
  const keywords = [
    { keyword: "ai seo tools", volume: "5,200", difficulty: "32/100", potential: "High" },
    { keyword: "ai keyword research", volume: "3,800", difficulty: "41/100", potential: "High" },
    { keyword: "best ai for seo", volume: "2,100", difficulty: "28/100", potential: "High" },
    { keyword: "ai content optimization", volume: "1,800", difficulty: "38/100", potential: "Medium" },
    { keyword: "seo automation tools", volume: "3,500", difficulty: "45/100", potential: "High" },
    { keyword: "gpt-4 for seo", volume: "2,400", difficulty: "22/100", potential: "High" },
    { keyword: "semantic search ai", volume: "1,600", difficulty: "37/100", potential: "Medium" },
    { keyword: "backlink analysis ai", volume: "1,200", difficulty: "42/100", potential: "Medium" },
    { keyword: "ai writing for seo", volume: "4,100", difficulty: "39/100", potential: "High" },
    { keyword: "ai competitor analysis", volume: "2,300", difficulty: "33/100", potential: "High" },
    { keyword: "ai seo auditing", volume: "1,900", difficulty: "35/100", potential: "High" },
    { keyword: "chatgpt for seo", volume: "3,100", difficulty: "30/100", potential: "High" },
    { keyword: "machine learning seo", volume: "950", difficulty: "47/100", potential: "Medium" },
    { keyword: "ai meta descriptions", volume: "1,400", difficulty: "25/100", potential: "High" },
    { keyword: "ai title tag generator", volume: "1,600", difficulty: "27/100", potential: "High" },
  ]

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
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current)
      }
    }
  }, [])

  // Animation of chat
  useEffect(() => {
    if (!isVisible) return
    
    // Clear any existing timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    timeoutsRef.current = []
    
    // Reset animation state
    setTypingIndex(0)
    setShowThumbsUp(false)
    setShowFire(false)
    setShowChat(true)
    setShowFirstMessage(false)
    setShowSecondMessage(false)
    
    // Start chat animation loop
    const runChatAnimation = () => {
      // Show Sarah's message first
      timeoutsRef.current.push(setTimeout(() => {
        setShowFirstMessage(true)
        
        // Show Michael's message and start typing
        timeoutsRef.current.push(setTimeout(() => {
          setShowSecondMessage(true)
          
          // Start typing animation
          timeoutsRef.current.push(setTimeout(() => {
            const typingInterval = setInterval(() => {
              setTypingIndex(prev => {
                if (prev < messageToType.length) {
                  return prev + 1
                } else {
                  clearInterval(typingInterval)
                  return prev
                }
              })
            }, 30)
            
            timeoutsRef.current.push(setTimeout(() => {
              clearInterval(typingInterval)
              
              // Show reactions
              timeoutsRef.current.push(setTimeout(() => {
                setShowThumbsUp(true)
                
                timeoutsRef.current.push(setTimeout(() => {
                  setShowFire(true)
                  
                  timeoutsRef.current.push(setTimeout(() => {
                    setShowChat(false)
                    
                    timeoutsRef.current.push(setTimeout(() => {
                      setTypingIndex(0)
                      setShowThumbsUp(false)
                      setShowFire(false)
                      setShowChat(true)
                      setShowFirstMessage(false)
                      setShowSecondMessage(false)
                      
                      timeoutsRef.current.push(setTimeout(runChatAnimation, 1000))
                    }, 3000))
                  }, 2000))
                }, 600))
              }, messageToType.length * 30 + 500))
            }, messageToType.length * 30))
          }, 200))
        }, 1500))
      }, 100))
    }
    
    runChatAnimation()
    
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      timeoutsRef.current = []
    }
  }, [isVisible])
  
  // Move cursors around
  useEffect(() => {
    if (!isVisible) return
    
    const getNewTarget = (currentX, currentY) => {
      const rangeX = 20 + Math.random() * 80
      const rangeY = 20 + Math.random() * 80
      const directionX = Math.random() > 0.5 ? 1 : -1
      const directionY = Math.random() > 0.5 ? 1 : -1
      const newX = currentX + (directionX * rangeX)
      const newY = currentY + (directionY * rangeY)
      
      return {
        x: Math.min(Math.max(newX, 50), 300),
        y: Math.min(Math.max(newY, 50), 250)
      }
    }
    
    cursorIntervalRef.current = setInterval(() => {
      setCursorPositions(prev => 
        prev.map(cursor => {
          const distToTarget = Math.sqrt(
            Math.pow(cursor.targetX - cursor.x, 2) + 
            Math.pow(cursor.targetY - cursor.y, 2)
          )
          
          if (distToTarget < 5) {
            const newTarget = getNewTarget(cursor.x, cursor.y)
            return {
              ...cursor,
              targetX: newTarget.x,
              targetY: newTarget.y,
              speed: 0.8 + Math.random() * 2
            }
          }
          
          const dx = (cursor.targetX - cursor.x) / 20 * cursor.speed
          const dy = (cursor.targetY - cursor.y) / 20 * cursor.speed
          
          return {
            ...cursor,
            x: cursor.x + dx,
            y: cursor.y + dy
          }
        })
      )
    }, 50)
    
    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current)
      }
    }
  }, [isVisible])

  return (
    <div ref={sectionRef} className="bg-[#1a1a1a] rounded-2xl p-8 shadow-xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2a2a2a] mb-6">
        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
        <span className="text-gray-300 text-base">24/7 SEO Monitoring</span>
      </div>
      <h3 className="text-3xl font-bold text-white mb-3">Our experts never sleep</h3>
      <p className="text-gray-400 leading-relaxed mb-6">
        Our team constantly analyzes, monitors, and optimizes your rankings to keep you ahead of competitors and future-proof your SEO strategy.
      </p>

      {/* Dashboard Container */}
      <div className="relative bg-[#222] rounded-2xl p-5 overflow-hidden h-[370px]">
        {/* Table Area */}
        <div ref={tableRef} className="h-full w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold text-white">Keyword Opportunity Analysis</div>
            <div className="text-sm text-gray-400">Last updated: just now</div>
          </div>

          {/* Keywords table */}
          <div className="w-full overflow-hidden border border-gray-700 rounded-lg" style={{ height: "calc(100% - 50px)" }}>
            <div className="grid grid-cols-4 gap-1 px-4 py-2 bg-[#333] text-gray-300 text-sm">
              <div>Keyword</div>
              <div className="text-center">Volume</div>
              <div className="text-center">Difficulty</div>
              <div className="text-center">Potential</div>
            </div>

            <div style={{ height: "calc(100% - 34px)", overflow: "hidden" }}>
              {keywords.map((kw, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-1 px-4 py-2 border-t border-gray-700 text-sm">
                  <div className="text-white font-medium">{kw.keyword}</div>
                  <div className="text-gray-300 text-center">{kw.volume}</div>
                  <div className="text-gray-300 text-center">{kw.difficulty}</div>
                  <div className={`text-center ${kw.potential === "High" ? "text-green-400" : "text-yellow-400"}`}>
                    {kw.potential}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Moving cursors */}
        {cursorPositions.map((cursor, index) => (
          <div
            key={index}
            className="absolute z-20 pointer-events-none cursors-item"
            style={{
              left: `${cursor.x}px`,
              top: `${cursor.y}px`,
              transition: 'all 0.1s linear'
            }}
          >
            <div className="flex items-center">
              <User className="h-4 w-4" style={{ color: cursor.color }} />
              <div 
                className="ml-1 px-2 py-1 text-xs text-white rounded-md"
                style={{ backgroundColor: cursor.color }}
              >
                {cursor.name}
              </div>
            </div>
          </div>
        ))}

        <div 
          ref={chatRef}
          className="absolute bottom-0 left-0 right-0 bg-[#2a2a2a] shadow-2xl rounded-t-xl transition-all duration-500 ease-in-out"
          style={{ 
            height: "160px",
            transform: showChat ? 'translateY(0)' : 'translateY(100%)',
            opacity: showChat ? 1 : 0
          }}
        >
          {/* Chat Header */}
          <div className="p-2 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-white text-sm">SEO Team Chat</span>
            </div>
            <div className="text-xs text-gray-400">Active now</div>
          </div>

          {/* Chat Messages Container */}
          <div className="p-3 h-[calc(100%-40px)] overflow-hidden relative">
            {/* Messages Stack */}
            <div className="h-full flex flex-col justify-end">
              {showFirstMessage && (
                <div 
                  className="flex gap-3 animate-fade-in mb-3"
                  style={{
                    transition: "transform 0.5s ease-out",
                    transform: showSecondMessage ? 'translateY(-20px)' : 'translateY(0)'
                  }}
                >
                  <div className="w-7 h-7 rounded-full border border-gray-700 flex-shrink-0 flex items-center justify-center bg-gray-800">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-xs">Sarah</span>
                      <span className="text-gray-500 text-[10px]">Just now</span>
                    </div>
                    <div className="bg-[#333] text-gray-200 p-1.5 rounded-lg text-xs max-w-[280px]">
                      I can start working on content optimization for these keywords right away!
                    </div>
                  </div>
                </div>
              )}

              {/* Michael's message (with typing animation) */}
              {showSecondMessage && (
                <div className="flex gap-3 animate-fade-in mt-auto">
                  <div className="w-7 h-7 rounded-full border border-gray-700 flex-shrink-0 flex items-center justify-center bg-gray-800">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-xs">Michael</span>
                      <span className="text-gray-500 text-[10px]">Just now</span>
                    </div>
                    <div className="bg-[#333] text-gray-200 p-1.5 rounded-lg text-xs max-w-[280px]">
                      {messageToType.substring(0, typingIndex)}
                      {typingIndex < messageToType.length && (
                        <span className="inline-block w-[2px] h-3.5 bg-blue-400 ml-[1px] animate-pulse"></span>
                      )}
                    </div>
                    
                    {/* Reactions directly under this message */}
                    <div className="flex gap-2 mt-1">
                      {showThumbsUp && (
                        <div className="bg-[#333] rounded-full px-1.5 py-0.5 flex items-center gap-1 animate-fade-in">
                          <span className="text-xs">👍</span>
                          <span className="text-gray-300 text-[10px]">1</span>
                        </div>
                      )}
                      {showFire && (
                        <div className="bg-[#333] rounded-full px-1.5 py-0.5 flex items-center gap-1 animate-fade-in">
                          <span className="text-xs">🔥</span>
                          <span className="text-gray-300 text-[10px]">1</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s forwards;
        }
        
        .animate-pulse {
          animation: pulse 0.8s infinite;
        }
      `}</style>
    </div>
  )
}