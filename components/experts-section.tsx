"use client"

import { useRef, useEffect, useState } from "react"
import anime from 'animejs'

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
  const [cursorPositions, setCursorPositions] = useState([
    { x: 100, y: 100, color: "#A8D9FF", name: "Jessica", targetX: 150, targetY: 150, speed: 1.5 },
    { x: 180, y: 150, color: "#FAC666", name: "Michael", targetX: 220, targetY: 100, speed: 2 },
    { x: 150, y: 80, color: "#FF9EB3", name: "Sarah", targetX: 120, targetY: 120, speed: 1.8 }
  ])

  // Animation message
  const messageToType = "We've found a high-value keyword cluster that competitors are missing. Search volume is 8.2K/month with low competition."
  
  // Keywords for analysis table - added more for the expanded view
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

    return () => observer.disconnect()
  }, [])

  // Animation of chat
  useEffect(() => {
    if (!isVisible) return
    
    // Reset animation state
    setTypingIndex(0)
    setShowThumbsUp(false)
    setShowFire(false)
    setShowChat(true)
    setShowFirstMessage(false)
    setShowSecondMessage(false)
    
    // Start chat animation loop
    const runChatAnimation = () => {
      // Show Sarah's message first with time to view it
      setShowFirstMessage(true)
      
      // After 1.5 seconds, show Michael's message and start typing
      setTimeout(() => {
        setShowSecondMessage(true)
        
        // Start typing animation with a short delay
        setTimeout(() => {
          // Typing animation
          const typingInterval = setInterval(() => {
            setTypingIndex(prev => {
              if (prev < messageToType.length) {
                return prev + 1
              } else {
                clearInterval(typingInterval)
                return prev
              }
            })
          }, 30) // Speed of typing
          
          // After typing, show reactions one by one
          setTimeout(() => {
            // Show first reaction
            setShowThumbsUp(true)
            
            // Show second reaction after delay
            setTimeout(() => {
              setShowFire(true)
              
              // Hide chat after showing reactions
              setTimeout(() => {
                setShowChat(false)
                
                // Reset and restart after showing dashboard
                setTimeout(() => {
                  setTypingIndex(0)
                  setShowThumbsUp(false)
                  setShowFire(false)
                  setShowChat(true)
                  setShowFirstMessage(false)
                  setShowSecondMessage(false)
                  
                  // Restart the animation after delay
                  setTimeout(runChatAnimation, 1000)
                }, 3000) // Time showing dashboard (3 seconds)
              }, 2000) // Time showing chat with reactions
            }, 600) // Delay between reactions
          }, messageToType.length * 30 + 500) // Wait for typing to complete
        }, 200)
      }, 1500) // Increased delay before showing second message
    }
    
    // Start the animation
    runChatAnimation()
    
    return () => {
      // Clear all timeouts
      const highestId = setTimeout(() => {}, 0)
      for (let i = 0; i < highestId; i++) {
        clearTimeout(i)
      }
    }
  }, [isVisible])
  
  // Move cursors around more randomly
  useEffect(() => {
    if (!isVisible) return
    
    // Function to generate a new random target position
    const getNewTarget = (currentX, currentY) => {
      // More dramatic movements - larger range (20-100 pixels)
      const rangeX = 20 + Math.random() * 80;
      const rangeY = 20 + Math.random() * 80;
      
      // Random direction
      const directionX = Math.random() > 0.5 ? 1 : -1;
      const directionY = Math.random() > 0.5 ? 1 : -1;
      
      // New target coordinates
      const newX = currentX + (directionX * rangeX);
      const newY = currentY + (directionY * rangeY);
      
      // Ensure targets stay within bounds (50-300 for X, 50-250 for Y)
      return {
        x: Math.min(Math.max(newX, 50), 300),
        y: Math.min(Math.max(newY, 50), 250)
      };
    };
    
    // Move cursors toward random targets
    const cursorInterval = setInterval(() => {
      setCursorPositions(prev => 
        prev.map(cursor => {
          // If cursor is close to target, generate a new target
          const distToTarget = Math.sqrt(
            Math.pow(cursor.targetX - cursor.x, 2) + 
            Math.pow(cursor.targetY - cursor.y, 2)
          );
          
          if (distToTarget < 5) {
            const newTarget = getNewTarget(cursor.x, cursor.y);
            return {
              ...cursor,
              targetX: newTarget.x,
              targetY: newTarget.y,
              // Randomize speed slightly each time
              speed: 0.8 + Math.random() * 2
            };
          }
          
          // Move toward current target
          const dx = (cursor.targetX - cursor.x) / 20 * cursor.speed;
          const dy = (cursor.targetY - cursor.y) / 20 * cursor.speed;
          
          return {
            ...cursor,
            x: cursor.x + dx,
            y: cursor.y + dy
          };
        })
      );
    }, 50); // Update frequency
    
    return () => clearInterval(cursorInterval);
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="bg-[#1a1a1a] rounded-2xl p-8 shadow-xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2a2a2a] mb-6">
        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
        <span className="text-gray-300 text-base">24/7 SEO Monitoring</span>
      </div>
      <h3 className="text-3xl font-bold text-white mb-3">Our experts never sleep</h3>
      <p className="text-gray-400 leading-relaxed mb-8">
        Our team constantly analyzes, monitors, and optimizes your rankings to keep you ahead of competitors and future-proof your SEO strategy.
      </p>

      {/* Dashboard Container */}
      <div className="relative bg-[#222] rounded-2xl p-6 overflow-hidden h-[400px]">
        {/* Table Area */}
        <div ref={tableRef} className="h-full w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold text-white">Keyword Opportunity Analysis</div>
            <div className="text-sm text-gray-400">Last updated: just now</div>
          </div>

          {/* Keywords table - expanded to fill height */}
          <div className="w-full overflow-hidden border border-gray-700 rounded-lg" style={{ height: "calc(100% - 60px)" }}>
            <div className="grid grid-cols-4 gap-1 px-4 py-2 bg-[#333] text-gray-300 text-sm">
              <div>Keyword</div>
              <div className="text-center">Volume</div>
              <div className="text-center">Difficulty</div>
              <div className="text-center">Potential</div>
            </div>

            <div style={{ height: "calc(100% - 34px)", overflow: "hidden" }}>
              {keywords.map((kw, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-1 px-4 py-3 border-t border-gray-700 text-sm">
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

        {/* Chat Overlay */}
        {showChat && (
          <div 
            ref={chatRef}
            className="absolute bottom-0 left-0 right-0 bg-[#2a2a2a] shadow-2xl rounded-t-xl transition-all duration-500 ease-in-out"
            style={{ 
              height: "180px",
              transform: showChat ? 'translateY(0)' : 'translateY(100%)',
              opacity: showChat ? 1 : 0
            }}
          >
            {/* Chat Header */}
            <div className="p-3 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-white text-sm">SEO Team Chat</span>
              </div>
              <div className="text-xs text-gray-400">Active now</div>
            </div>

            {/* Chat Messages Container */}
            <div className="p-4 h-[calc(100%-50px)] overflow-hidden relative">
              {/* Messages Stack */}
              <div className="h-full flex flex-col justify-end">
                {showFirstMessage && (
                  <div 
                    className="flex gap-3 animate-fade-in mb-4"
                    style={{
                      transition: "transform 0.5s ease-out",
                      transform: showSecondMessage ? 'translateY(-20px)' : 'translateY(0)'
                    }}
                  >
                    <img 
                      src="/professional-woman-headshot.png" 
                      alt="Sarah" 
                      className="w-8 h-8 rounded-full border border-gray-700 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white text-sm">Sarah</span>
                        <span className="text-gray-500 text-xs">Just now</span>
                      </div>
                      <div className="bg-[#333] text-gray-200 p-2 rounded-lg text-sm max-w-[280px]">
                        I can start working on content optimization for these keywords right away!
                      </div>
                    </div>
                  </div>
                )}

                {/* Michael's message (with typing animation) */}
                {showSecondMessage && (
                  <div className="flex gap-3 animate-fade-in mt-auto">
                    <img 
                      src="/professional-man-headshot.png" 
                      alt="Michael" 
                      className="w-8 h-8 rounded-full border border-gray-700 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white text-sm">Michael</span>
                        <span className="text-gray-500 text-xs">Just now</span>
                      </div>
                      <div className="bg-[#333] text-gray-200 p-2 rounded-lg text-sm max-w-[280px]">
                        {messageToType.substring(0, typingIndex)}
                        {typingIndex < messageToType.length && (
                          <span className="inline-block w-[2px] h-4 bg-blue-400 ml-[1px] animate-pulse"></span>
                        )}
                      </div>
                      
                      {/* Reactions directly under this message */}
                      <div className="flex gap-2 mt-2">
                        {showThumbsUp && (
                          <div className="bg-[#333] rounded-full px-2 py-0.5 flex items-center gap-1 animate-fade-in">
                            <span className="text-sm">👍</span>
                            <span className="text-gray-300 text-xs">1</span>
                          </div>
                        )}
                        {showFire && (
                          <div className="bg-[#333] rounded-full px-2 py-0.5 flex items-center gap-1 animate-fade-in">
                            <span className="text-sm">🔥</span>
                            <span className="text-gray-300 text-xs">1</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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