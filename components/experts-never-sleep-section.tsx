"use client"

import { useRef, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import anime from "animejs/lib/anime.es.js"

export function ExpertsNeverSleepSection() {
  // Refs for DOM elements
  const containerRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const reactionsRef = useRef<HTMLDivElement>(null)
  const thumbsUpRef = useRef<HTMLDivElement>(null)
  const fireRef = useRef<HTMLDivElement>(null)
  
  // State management
  const [isMounted, setIsMounted] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [messageVisible, setMessageVisible] = useState(false)
  const [showReactions, setShowReactions] = useState({ thumbsUp: false, fire: false })
  
  // Animation cleanup refs
  const animationsRef = useRef<anime.AnimeInstance[]>([])
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const intervalsRef = useRef<NodeJS.Timeout[]>([])
  
  // Chat messages data
  const chatMessages = [
    {
      avatar: "/professional-woman-headshot.png",
      name: "Sarah",
      time: "Just now",
      text: "I found a new keyword opportunity that could increase our client's traffic by 32%. Competitors aren't targeting it yet."
    },
    {
      avatar: "/professional-man-headshot.png",
      name: "Michael",
      time: "Just now",
      text: "We've found a high-value keyword cluster that competitors are missing. Search volume is 8.2K/month with low competition."
    },
    {
      avatar: "/professional-woman-headshot-2.png",
      name: "Jessica",
      time: "Just now",
      text: "I can start working on content optimization for these keywords right away!"
    }
  ]

  // Set isMounted on client-side
  useEffect(() => {
    setIsMounted(true)
    return () => {
      // Cleanup animations and timeouts
      animationsRef.current.forEach(anim => anim.pause())
      timeoutsRef.current.forEach(clearTimeout)
      intervalsRef.current.forEach(clearInterval)
    }
  }, [])

  // Chat animation sequence
  useEffect(() => {
    if (!isMounted || !chatInputRef.current || !sendButtonRef.current) return
    
    // Animation sequence for each message
    const startMessageSequence = () => {
      // Reset states
      setMessageVisible(false)
      setShowReactions({ thumbsUp: false, fire: false })
      setTypedText("")
      
      // Wait before starting typing animation
      const initialDelay = setTimeout(() => {
        // Start typing animation
        typeMessage()
      }, 2500)
      
      timeoutsRef.current.push(initialDelay)
    }
    
    // Typing animation
    const typeMessage = () => {
      const message = chatMessages[currentMessageIndex].text
      let charIndex = 0
      
      // Clear previous typing
      setTypedText("")
      
      const typingInterval = setInterval(() => {
        if (charIndex < message.length) {
          setTypedText(prev => prev + message[charIndex])
          charIndex++
        } else {
          clearInterval(typingInterval)
          
          // Animate send button
          const sendAnimation = anime({
            targets: sendButtonRef.current,
            scale: [1, 1.2, 1],
            duration: 400,
            easing: 'easeInOutQuad',
            complete: sendMessage
          })
          
          animationsRef.current.push(sendAnimation)
        }
      }, 30) // Typing speed
      
      intervalsRef.current.push(typingInterval)
    }
    
    // Send message animation
    const sendMessage = () => {
      // Reset input
      setTypedText("")
      
      // Show message
      setMessageVisible(true)
      
      if (chatBoxRef.current) {
        // Fade in message
        const messageAnimation = anime({
          targets: chatBoxRef.current,
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 300,
          easing: 'easeOutQuad'
        })
        
        animationsRef.current.push(messageAnimation)
      }
      
      // Show reactions after a delay
      const reactionDelay = setTimeout(() => {
        showThumbsUpReaction()
      }, 800)
      
      timeoutsRef.current.push(reactionDelay)
    }
    
    // Reaction animations
    const showThumbsUpReaction = () => {
      setShowReactions(prev => ({ ...prev, thumbsUp: true }))
      
      if (thumbsUpRef.current) {
        const thumbsAnimation = anime({
          targets: thumbsUpRef.current,
          scale: [0, 1.2, 1],
          opacity: [0, 1],
          duration: 400,
          easing: 'spring(1, 80, 10, 0)'
        })
        
        animationsRef.current.push(thumbsAnimation)
      }
      
      // Add fire reaction after a delay
      const fireDelay = setTimeout(() => {
        showFireReaction()
      }, 400)
      
      timeoutsRef.current.push(fireDelay)
    }
    
    const showFireReaction = () => {
      setShowReactions(prev => ({ ...prev, fire: true }))
      
      if (fireRef.current) {
        const fireAnimation = anime({
          targets: fireRef.current,
          scale: [0, 1.2, 1],
          opacity: [0, 1],
          duration: 400,
          easing: 'spring(1, 80, 10, 0)'
        })
        
        animationsRef.current.push(fireAnimation)
      }
      
      // Reset after showing message and reactions
      const resetDelay = setTimeout(() => {
        // Fade out message and reactions
        if (chatBoxRef.current) {
          const fadeOutAnimation = anime({
            targets: chatBoxRef.current,
            opacity: [1, 0],
            translateY: [0, -10],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
              setMessageVisible(false)
              setShowReactions({ thumbsUp: false, fire: false })
              
              // Move to next message after a pause
              const nextMessageDelay = setTimeout(() => {
                setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % chatMessages.length)
                startMessageSequence()
              }, 1500)
              
              timeoutsRef.current.push(nextMessageDelay)
            }
          })
          
          animationsRef.current.push(fadeOutAnimation)
        }
      }, 3000)
      
      timeoutsRef.current.push(resetDelay)
    }
    
    // Start the animation sequence
    startMessageSequence()
    
    return () => {
      // Cleanup
      animationsRef.current.forEach(anim => anim.pause())
      timeoutsRef.current.forEach(clearTimeout)
      intervalsRef.current.forEach(clearInterval)
    }
  }, [isMounted, currentMessageIndex, chatMessages])

  // Add cursor animations
  useEffect(() => {
    if (!isMounted || !containerRef.current) return
    
    // Define user cursors that will move around the keyword table
    const users = [
      { name: "Jessica", color: "#ff9eb3" },
      { name: "Michael", color: "#fac666" },
      { name: "Sarah", color: "#a8d9ff" }
    ]
    
    const cursorElements: HTMLElement[] = []
    
    // Create cursors
    users.forEach(user => {
      const cursor = document.createElement('div')
      cursor.className = 'absolute pointer-events-none z-50 transition-all duration-1000'
      cursor.innerHTML = `
        <div class="flex flex-col items-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M1 11L11 1" stroke="${user.color}" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <div class="px-2 py-0.5 text-xs font-medium text-white rounded-full mt-1" style="background-color: ${user.color}">
            ${user.name}
          </div>
        </div>
      `
      
      // Add to DOM
      const keywordTable = containerRef.current?.querySelector('.keyword-table')
      if (keywordTable) {
        keywordTable.appendChild(cursor)
        cursorElements.push(cursor)
        
        // Position initially
        cursor.style.left = `${100 + Math.floor(user.name.length * 10)}px`
        cursor.style.top = `${50 + Math.floor(user.name.length * 5)}px`
      }
    })
    
    // Animate cursors to move around the keyword table
    const moveCursors = () => {
      cursorElements.forEach((cursor, index) => {
        const keywordTable = containerRef.current?.querySelector('.keyword-table')
        if (!keywordTable) return
        
        const tableRect = keywordTable.getBoundingClientRect()
        const maxWidth = tableRect.width - 50
        const maxHeight = tableRect.height - 50
        
        // Create predefined paths instead of random
        const paths = [
          [{ x: 100, y: 60 }, { x: 200, y: 120 }, { x: 150, y: 180 }],
          [{ x: 180, y: 80 }, { x: 120, y: 140 }, { x: 220, y: 100 }],
          [{ x: 80, y: 120 }, { x: 160, y: 60 }, { x: 120, y: 160 }],
        ]
        
        // Get position from path array
        const timeOffset = Date.now() + index * 2000
        const pathIndex = Math.floor((timeOffset / 5000) % 3)
        const position = paths[pathIndex][index % 3]
        
        // Use anime.js for cursor movement
        anime({
          targets: cursor,
          left: position.x,
          top: position.y,
          duration: 2000,
          easing: 'easeInOutQuad'
        })
      })
    }
    
    // Move cursors periodically
    const cursorInterval = setInterval(moveCursors, 3000)
    intervalsRef.current.push(cursorInterval)
    
    // Start first movement
    moveCursors()
    
    return () => {
      // Remove cursor elements
      cursorElements.forEach(cursor => {
        if (cursor.parentElement) {
          cursor.parentElement.removeChild(cursor)
        }
      })
      
      intervalsRef.current.forEach(clearInterval)
    }
  }, [isMounted])

  return (
    <div ref={containerRef} className="bg-[#1a1a1a] rounded-3xl p-8 shadow-xl h-full">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2a2a2a] mb-6">
        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
        <span className="text-gray-300 text-base">24/7 SEO Monitoring</span>
      </div>
      <h3 className="text-4xl font-bold text-white mb-3">Our experts never sleep</h3>
      <p className="text-gray-400 leading-relaxed mb-8">
        Our team constantly analyzes, monitors, and optimizes your rankings to keep you ahead of competitors and future-proof your SEO strategy.
      </p>

      {/* Dashboard and Chat Interface */}
      <div ref={chatContainerRef} className="relative bg-[#222] rounded-2xl overflow-hidden h-[300px]">
        {/* Main Dashboard / Keyword Table */}
        <div className="keyword-table p-4">
          <div className="mb-3 flex justify-between items-center">
            <div className="text-white text-sm font-semibold">Keyword Opportunity Analysis</div>
            <div className="text-gray-400 text-xs">Last updated: just now</div>
          </div>
          
          <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 overflow-hidden">
            <div className="grid grid-cols-4 bg-[#333] p-2 text-xs text-gray-400 font-medium">
              <div>Keyword</div>
              <div className="text-center">Volume</div>
              <div className="text-center">Difficulty</div>
              <div className="text-center">Potential</div>
            </div>
            
            <div className="grid grid-cols-4 p-2 text-xs text-white border-b border-gray-700 relative">
              <div className="font-medium">ai seo tools</div>
              <div className="text-center">5,200</div>
              <div className="text-center">32/100</div>
              <div className="text-center text-green-400">High</div>
            </div>
            
            <div className="grid grid-cols-4 p-2 text-xs text-white border-b border-gray-700">
              <div className="font-medium">ai keyword research</div>
              <div className="text-center">3,800</div>
              <div className="text-center">41/100</div>
              <div className="text-center text-green-400">High</div>
            </div>
            
            <div className="grid grid-cols-4 p-2 text-xs text-white border-b border-gray-700">
              <div className="font-medium">best ai for seo</div>
              <div className="text-center">2,100</div>
              <div className="text-center">28/100</div>
              <div className="text-center text-green-400">High</div>
            </div>
            
            <div className="grid grid-cols-4 p-2 text-xs text-white border-b border-gray-700">
              <div className="font-medium">seo ai assistant</div>
              <div className="text-center">1,850</div>
              <div className="text-center">35/100</div>
              <div className="text-center text-green-400">High</div>
            </div>
            
            <div className="grid grid-cols-4 p-2 text-xs text-white">
              <div className="font-medium">ai content for seo</div>
              <div className="text-center">4,300</div>
              <div className="text-center">45/100</div>
              <div className="text-center text-green-400">High</div>
            </div>
          </div>
        </div>
        
        {/* Chat UI - Only rendered on client side */}
        {isMounted && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Message Container */}
            {messageVisible && (
              <div 
                ref={chatBoxRef} 
                className="absolute bottom-16 left-0 right-0 px-4"
              >
                <div className="bg-[#2a2a2a] rounded-lg shadow-lg p-3">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8 rounded-full border border-gray-700 shrink-0">
                      <AvatarImage 
                        src={chatMessages[currentMessageIndex].avatar} 
                        alt={chatMessages[currentMessageIndex].name} 
                      />
                      <AvatarFallback 
                        className="bg-blue-400"
                      >
                        {chatMessages[currentMessageIndex].name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white text-sm">
                          {chatMessages[currentMessageIndex].name}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {chatMessages[currentMessageIndex].time}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        {chatMessages[currentMessageIndex].text}
                      </p>
                      
                      {/* Reactions */}
                      <div className="flex gap-2 mt-2">
                        {showReactions.thumbsUp && (
                          <div 
                            ref={thumbsUpRef}
                            className="bg-[#444] rounded-full px-2 py-0.5 flex items-center gap-1 text-xs"
                          >
                            <span>👍</span>
                            <span className="text-gray-300">1</span>
                          </div>
                        )}
                        {showReactions.fire && (
                          <div 
                            ref={fireRef}
                            className="bg-[#444] rounded-full px-2 py-0.5 flex items-center gap-1 text-xs"
                          >
                            <span>🔥</span>
                            <span className="text-gray-300">1</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Chat Input */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 bg-[#1e1e1e] p-3 flex items-center gap-2">
              <input 
                ref={chatInputRef}
                type="text" 
                placeholder="Type your message..."
                className="bg-[#333] text-gray-300 text-sm flex-1 px-3 py-2 rounded-md border border-gray-600 focus:outline-none"
                value={typedText}
                readOnly
              />
              <button 
                ref={sendButtonRef}
                className={`bg-blue-500 text-white rounded-md p-2 flex items-center justify-center ${typedText ? 'opacity-100' : 'opacity-70'}`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}