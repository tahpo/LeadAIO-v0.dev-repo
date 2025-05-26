"use client"

import { useRef, useEffect, useState } from "react"
import anime from 'animejs'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ExpertsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const keywordTableRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [chatStep, setChatStep] = useState(0)
  const [typingText, setTypingText] = useState("")
  const [showReactions, setShowReactions] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [thumbsUpVisible, setThumbsUpVisible] = useState(false)
  const [fireVisible, setFireVisible] = useState(false)
  const chatTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const cursorRefs = useRef<HTMLDivElement[]>([])

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
      if (chatTimeoutRef.current) {
        clearTimeout(chatTimeoutRef.current)
      }
    }
  }, [])

  // Chat animation sequence
  useEffect(() => {
    if (!isVisible) return

    const chatMessages = [
      {
        avatar: "/professional-woman-headshot.png",
        name: "Sarah",
        time: "3h ago",
        text: "I found a new keyword opportunity that could increase our client's traffic by 32%. Competitors aren't targeting it yet."
      },
      {
        avatar: "/professional-man-headshot.png",
        name: "Michael",
        time: "Just now",
        text: "We've found a high-value keyword cluster that competitors are missing. Search volume is 8.2K/month with low competition."
      }
    ]

    const resetChat = () => {
      setShowChat(false)
      
      // Wait a bit then restart
      chatTimeoutRef.current = setTimeout(() => {
        setShowChat(true)
        setTypingText("")
        setShowReactions(false)
        setThumbsUpVisible(false)
        setFireVisible(false)
        setChatStep(0)
        
        // Start the first message after a short delay
        chatTimeoutRef.current = setTimeout(() => {
          startChat()
        }, 500)
      }, 3000) // Show the keyword table for 3 seconds
    }

    const startChat = () => {
      // Reset chat state for start
      if (chatStep === 0) {
        // First, animate replacing the placeholder text with real message
        if (messageInputRef.current) {
          const placeholderText = "Type your message..."
          let placeholderIndex = placeholderText.length
          
          // First fade out the placeholder
          const fadePlaceholder = () => {
            if (placeholderIndex > 0) {
              messageInputRef.current!.placeholder = placeholderText.substring(0, placeholderIndex - 1)
              placeholderIndex--
              chatTimeoutRef.current = setTimeout(fadePlaceholder, 20)
            } else {
              // Then start typing the actual message
              setChatStep(1)
              chatTimeoutRef.current = setTimeout(() => {
                let currentIndex = 0
                const message = chatMessages[1].text
                
                const typeNextChar = () => {
                  if (currentIndex < message.length) {
                    setTypingText(message.substring(0, currentIndex + 1))
                    currentIndex++
                    chatTimeoutRef.current = setTimeout(typeNextChar, 25)
                  } else {
                    // Wait a bit then show reactions one by one
                    chatTimeoutRef.current = setTimeout(() => {
                      // Show first reaction
                      setThumbsUpVisible(true)
                      
                      // Then show second reaction after a delay
                      chatTimeoutRef.current = setTimeout(() => {
                        setFireVisible(true)
                        
                        // Wait with reactions, then reset
                        chatTimeoutRef.current = setTimeout(() => {
                          resetChat()
                        }, 2000)
                      }, 500)
                    }, 1000)
                  }
                }
                
                typeNextChar()
              }, 300)
            }
          }
          
          // Start fading out the placeholder
          fadePlaceholder()
        }
      }
    }

    // Start the chat animation
    startChat()

    return () => {
      if (chatTimeoutRef.current) {
        clearTimeout(chatTimeoutRef.current)
      }
    }
  }, [isVisible, chatStep])

  // Create and animate cursors
  useEffect(() => {
    if (!isVisible || !chatContainerRef.current) return
    
    const cursorNames = ["Sarah", "Michael", "Jessica"]
    const cursorColors = ["#A8D9FF", "#FAC666", "#FF9EB3"]
    const cursors: HTMLDivElement[] = []
    
    // Remove any existing cursors first
    cursorRefs.current.forEach(cursor => {
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor)
      }
    })
    
    cursorRefs.current = []
    
    // Create new cursors
    for (let i = 0; i < 3; i++) {
      const cursor = document.createElement('div')
      cursor.className = 'absolute pointer-events-none z-20'
      cursor.innerHTML = `
        <div class="flex items-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2l8 8M2 10L10 2" stroke="${cursorColors[i]}" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <div class="ml-1 px-2 py-0.5 text-[10px] text-white rounded-md" 
               style="background-color: ${cursorColors[i]}; opacity: 0.9">
            ${cursorNames[i]}
          </div>
        </div>
      `
      
      // Initial random position within the dashboard area
      const posX = 40 + Math.random() * 180
      const posY = 40 + Math.random() * 120 // Keep within the visible dashboard area
      
      cursor.style.left = `${posX}px`
      cursor.style.top = `${posY}px`
      cursor.style.position = 'absolute'
      cursor.style.zIndex = '40'
      
      chatContainerRef.current.appendChild(cursor)
      cursors.push(cursor)
      cursorRefs.current.push(cursor)
    }
    
    // Animation function for moving cursors
    let targetPositions = cursors.map(() => ({
      x: 40 + Math.random() * 180,
      y: 40 + Math.random() * 120
    }))
    
    const animateCursors = () => {
      // Occasionally generate new target positions
      if (Math.random() < 0.01) {
        targetPositions = cursors.map(() => ({
          x: 40 + Math.random() * 180,
          y: 40 + Math.random() * 120
        }))
      }
      
      // Move each cursor towards its target
      cursors.forEach((cursor, i) => {
        const currentX = parseFloat(cursor.style.left)
        const currentY = parseFloat(cursor.style.top)
        const targetX = targetPositions[i].x
        const targetY = targetPositions[i].y
        
        // Move gradually toward target
        cursor.style.left = `${currentX + (targetX - currentX) * 0.05}px`
        cursor.style.top = `${currentY + (targetY - currentY) * 0.05}px`
      })
      
      requestAnimationFrame(animateCursors)
    }
    
    // Start animation
    const animFrame = requestAnimationFrame(animateCursors)
    
    return () => {
      cancelAnimationFrame(animFrame)
      
      // Clean up cursor elements
      cursors.forEach(cursor => {
        if (cursor.parentNode) {
          cursor.parentNode.removeChild(cursor)
        }
      })
      
      cursorRefs.current = []
    }
  }, [isVisible])

  return (
    <div ref={sectionRef} className="bg-[#1a1a1a] rounded-3xl p-8 shadow-xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2a2a2a] mb-6">
        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
        <span className="text-gray-300 text-base">24/7 SEO Monitoring</span>
      </div>
      <h3 className="text-4xl font-bold text-white mb-3">Our experts never sleep</h3>
      <p className="text-gray-400 leading-relaxed mb-8">
        Our team constantly analyzes, monitors, and optimizes your rankings to keep you ahead of competitors and future-proof your SEO strategy.
      </p>

      {/* Dashboard and Chat Container */}
      <div 
        ref={chatContainerRef} 
        className="bg-[#222] rounded-2xl relative overflow-hidden h-[400px]"
      >
        {/* Keyword Analysis Dashboard - FULL VERSION with more keywords */}
        <div 
          ref={keywordTableRef} 
          className="bg-[#2a2a2a] p-4 h-full w-full overflow-y-auto transition-all duration-500"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-white text-sm font-medium">Keyword Opportunity Analysis</div>
            <div className="text-xs text-gray-400">Last updated: just now</div>
          </div>
          
          {/* Extended keyword table */}
          <div className="w-full rounded overflow-hidden border border-gray-700 text-xs">
            <div className="grid grid-cols-4 bg-[#333] text-gray-400">
              <div className="p-2">Keyword</div>
              <div className="p-2 text-center">Volume</div>
              <div className="p-2 text-center">Difficulty</div>
              <div className="p-2 text-center">Potential</div>
            </div>
            
            {keywords.map((item, index) => (
              <div 
                key={index}
                className={`grid grid-cols-4 bg-[#2d2d2d] text-white ${index > 0 ? 'border-t border-gray-700' : ''}`}
              >
                <div className="p-2 font-medium">{item.keyword}</div>
                <div className="p-2 text-center">{item.volume}</div>
                <div className="p-2 text-center">{item.difficulty}</div>
                <div className={`p-2 text-center ${
                  item.potential === "High" ? "text-green-400" : "text-yellow-400"
                }`}>
                  {item.potential}
                </div>
              </div>
            ))}
          </div>
          
          {/* User activity indicators */}
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="px-3 py-1 bg-[#333] rounded-full text-xs text-gray-300 flex items-center">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
              <span>3 team members active</span>
            </div>
            <div className="px-3 py-1 bg-[#333] rounded-full text-xs text-gray-300 flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1.5"></div>
              <span>25 opportunities found today</span>
            </div>
            <div className="px-3 py-1 bg-[#333] rounded-full text-xs text-gray-300 flex items-center">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5"></div>
              <span>7 new recommendations</span>
            </div>
          </div>
        </div>
        
        {/* Chat Interface - Conditionally rendered */}
        {showChat && (
          <div 
            className="absolute inset-0 bg-[#2a2a2a] flex flex-col transition-all duration-500 ease-in-out"
            style={{ 
              opacity: showChat ? 1 : 0,
              transform: showChat ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            {/* Chat area - scrollable */}
            <div className="flex-grow p-4 overflow-y-auto flex flex-col justify-end">
              {/* First message */}
              <div className="flex items-start gap-2 mb-4">
                <Avatar className="h-8 w-8 rounded-full border border-gray-700 shrink-0">
                  <AvatarImage src="/professional-woman-headshot.png" alt="Sarah" />
                  <AvatarFallback className="bg-[#A8D9FF]">S</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white text-sm">Sarah</span>
                    <span className="text-gray-500 text-xs">3h ago</span>
                  </div>
                  <p className="text-gray-300 text-sm bg-[#333] rounded-lg px-3 py-2">
                    I found a new keyword opportunity that could increase our client's traffic by 32%. Competitors aren't targeting it yet.
                  </p>
                </div>
              </div>
              
              {/* Second message - typing animation */}
              {chatStep >= 1 && (
                <div className="flex items-start gap-2 mb-2">
                  <Avatar className="h-8 w-8 rounded-full border border-gray-700 shrink-0">
                    <AvatarImage src="/professional-man-headshot.png" alt="Michael" />
                    <AvatarFallback className="bg-[#FAC666]">M</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-sm">Michael</span>
                      <span className="text-gray-500 text-xs">Just now</span>
                    </div>
                    <p className="text-gray-300 text-sm bg-[#333] rounded-lg px-3 py-2">
                      {typingText}
                      {typingText.length > 0 && typingText.length < 83 && (
                        <span className="inline-block h-4 w-[2px] bg-blue-400 ml-[1px] animate-pulse"></span>
                      )}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Reactions */}
              <div className="flex gap-2 ml-10 mt-1 mb-2">
                {thumbsUpVisible && (
                  <div className="bg-[#333] rounded-full px-2 py-0.5 flex items-center gap-1 text-xs transition-all duration-300" 
                       style={{opacity: thumbsUpVisible ? 1 : 0, transform: thumbsUpVisible ? 'scale(1)' : 'scale(0.8)'}}>
                    <span>👍</span>
                    <span className="text-gray-300">1</span>
                  </div>
                )}
                {fireVisible && (
                  <div className="bg-[#333] rounded-full px-2 py-0.5 flex items-center gap-1 text-xs transition-all duration-300"
                       style={{opacity: fireVisible ? 1 : 0, transform: fireVisible ? 'scale(1)' : 'scale(0.8)'}}>
                    <span>🔥</span>
                    <span className="text-gray-300">1</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Input area - fixed at the bottom */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center bg-[#333] rounded-lg border border-gray-700 px-3 py-2">
                <input 
                  ref={messageInputRef}
                  type="text" 
                  placeholder="Type your message..." 
                  className="bg-transparent text-gray-300 text-sm flex-1 focus:outline-none"
                  disabled
                  readOnly
                />
                <button className="text-blue-400 ml-2" disabled>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Floating cursors will be added dynamically in the useEffect */}
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes fadeInScale {
          from { 
            opacity: 0;
            transform: scale(0.8);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-fade-in-scale {
          animation: fadeInScale 0.3s forwards;
        }
      `}</style>
    </div>
  )
}