"use client"

import { useRef, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

export function SpeedPerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  
  // Client-side only state initialization with stable initial values
  const [speedValue, setSpeedValue] = useState(60)
  const [isVisible, setIsVisible] = useState(false)
  const [redSegmentCount, setRedSegmentCount] = useState(0)
  const [chatActive, setChatActive] = useState(false)
  const [chatPhase, setChatPhase] = useState(0)
  const [typingText, setTypingText] = useState("")
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showThumbsUp, setShowThumbsUp] = useState(false)
  const [showFire, setShowFire] = useState(false)
  
  // Use refs for animation handles to ensure proper cleanup
  const animationFrameRef = useRef<number | null>(null)
  const chatTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationTimeoutsRef = useRef<NodeJS.Timeout[]>([])
  const cursorRefs = useRef<HTMLDivElement[]>([])
  const [isMounted, setIsMounted] = useState(false)

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
  ];

  // Set isMounted to true after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return;
    
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
      if (chatTimeoutRef.current) {
        clearTimeout(chatTimeoutRef.current)
      }
      animationTimeoutsRef.current.forEach(clearTimeout)
    }
  }, [isMounted])

  // Red segment length animation - client-side only
  useEffect(() => {
    if (!isVisible || !isMounted) return

    const updateRedSegments = () => {
      // Consistent value generation pattern
      const timestamp = Date.now()
      const newCount = Math.floor((timestamp % 5000) / 1000)
      setRedSegmentCount(newCount)

      const timeoutId = setTimeout(updateRedSegments, 150)
      animationTimeoutsRef.current.push(timeoutId)
    }

    updateRedSegments()
    
    return () => {
      animationTimeoutsRef.current.forEach(clearTimeout)
      animationTimeoutsRef.current = []
    }
  }, [isVisible, isMounted])

  // Counter animation - client-side only
  useEffect(() => {
    if (!isVisible || !isMounted) return

    let startTime = Date.now()
    const duration = 4000 // 4 seconds
    const startValue = 60
    const endValue = 150
    const targetRate = 0.25 // 4 seconds per increment = 0.25 increments/second

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      
      if (elapsed < duration) {
        // Phase 1: Quick ramp up to 150
        const progress = elapsed / duration
        const value = Math.floor(startValue + (endValue - startValue) * progress)
        setSpeedValue(value)
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        // Phase 2: Slow, steady increase
        const timeAfterInitial = currentTime - (startTime + duration)
        const additionalIncrements = Math.floor(timeAfterInitial / 1000 * targetRate)
        const newValue = Math.min(endValue + additionalIncrements, 400)
        setSpeedValue(newValue)
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isVisible, isMounted])

  // Chat animation - client-side only
  useEffect(() => {
    if (!isVisible || !isMounted || !chatInputRef.current || !sendButtonRef.current) return;
    
    const startChatSequence = () => {
      // Initial delay
      const timeoutId = setTimeout(() => {
        setChatActive(true);
        runChatAnimation();
      }, 3000);
      
      animationTimeoutsRef.current.push(timeoutId);
    };
    
    const runChatAnimation = () => {
      setChatPhase(0);
      setTypingText("");
      setShowThumbsUp(false);
      setShowFire(false);
      
      const currentMessage = chatMessages[currentMessageIndex];
      let timeoutId: NodeJS.Timeout;
      
      // Animation sequence
      const sequence = async () => {
        // 1. Wait before typing starts
        await new Promise(resolve => {
          timeoutId = setTimeout(resolve, 1500);
          animationTimeoutsRef.current.push(timeoutId);
        });
        
        // 2. Type message
        for (let i = 0; i <= currentMessage.text.length; i++) {
          await new Promise<void>(resolve => {
            timeoutId = setTimeout(() => {
              setTypingText(currentMessage.text.substring(0, i));
              resolve();
            }, 30);
            animationTimeoutsRef.current.push(timeoutId);
          });
        }
        
        // 3. Send button animation (simplified for hydration compatibility)
        await new Promise(resolve => {
          timeoutId = setTimeout(resolve, 300);
          animationTimeoutsRef.current.push(timeoutId);
        });
        
        // 4. Show message
        setChatPhase(1);
        setTypingText("");
        
        // 5. Show reactions
        await new Promise(resolve => {
          timeoutId = setTimeout(() => {
            setShowThumbsUp(true);
            resolve();
          }, 800);
          animationTimeoutsRef.current.push(timeoutId);
        });
        
        await new Promise(resolve => {
          timeoutId = setTimeout(() => {
            setShowFire(true);
            resolve();
          }, 400);
          animationTimeoutsRef.current.push(timeoutId);
        });
        
        // 6. Wait with message displayed
        await new Promise(resolve => {
          timeoutId = setTimeout(resolve, 2000);
          animationTimeoutsRef.current.push(timeoutId);
        });
        
        // 7. Reset for next message
        setChatPhase(0);
        setChatActive(false);
        setCurrentMessageIndex((currentMessageIndex + 1) % chatMessages.length);
        
        // 8. Start again
        timeoutId = setTimeout(startChatSequence, 3000);
        animationTimeoutsRef.current.push(timeoutId);
      };
      
      sequence();
    };
    
    startChatSequence();
    
    return () => {
      animationTimeoutsRef.current.forEach(clearTimeout);
      animationTimeoutsRef.current = [];
    };
  }, [isVisible, isMounted, currentMessageIndex, chatMessages]);

  // Cursor animations - only initialize on client
  useEffect(() => {
    if (!isVisible || !isMounted || !chatContainerRef.current) return;
    
    const createCursors = () => {
      // Create animated cursors
      const tableArea = chatContainerRef.current?.querySelector('.keyword-table');
      if (!tableArea) return;
      
      // Define cursor data with stable positions instead of random
      const cursorData = [
        { name: "Sarah", color: "#A8D9FF", x: 40, y: 40 },
        { name: "Michael", color: "#FAC666", x: 70, y: 70 },
        { name: "Jessica", color: "#FF9EB3", x: 100, y: 100 }
      ];
      
      // Clean up existing cursors
      cursorRefs.current.forEach(cursor => {
        if (cursor && cursor.parentNode) {
          cursor.parentNode.removeChild(cursor);
        }
      });
      
      cursorRefs.current = [];
      
      // Create cursors
      cursorData.forEach(({ name, color, x, y }) => {
        const cursor = document.createElement('div');
        cursor.className = 'absolute z-50 pointer-events-none transition-all duration-300 ease-out';
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.innerHTML = `
          <div class="flex flex-col items-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33334 3.33334L13.3333 13.3333M3.33334 13.3333L13.3333 3.33334" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <div class="mt-1 px-2 py-0.5 text-xs font-semibold text-white rounded-full" style="background-color: ${color}">
              ${name}
            </div>
          </div>
        `;
        
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        
        tableArea.appendChild(cursor);
        cursorRefs.current.push(cursor);
      });
    };
    
    const moveTimeoutId = setTimeout(createCursors, 1000);
    animationTimeoutsRef.current.push(moveTimeoutId);
    
    // Move cursors periodically to predefined positions (not random)
    const positions = [
      [{ x: 100, y: 50 }, { x: 150, y: 100 }, { x: 200, y: 80 }],
      [{ x: 50, y: 120 }, { x: 200, y: 50 }, { x: 100, y: 150 }],
      [{ x: 180, y: 100 }, { x: 80, y: 80 }, { x: 140, y: 120 }],
    ];
    
    let positionIndex = 0;
    
    const animateCursors = () => {
      if (cursorRefs.current.length === 3) {
        const currentPositions = positions[positionIndex];
        
        cursorRefs.current.forEach((cursor, i) => {
          const { x, y } = currentPositions[i];
          cursor.style.transition = 'all 1000ms cubic-bezier(0.34, 1.56, 0.64, 1)';
          cursor.style.left = `${x}px`;
          cursor.style.top = `${y}px`;
        });
        
        positionIndex = (positionIndex + 1) % positions.length;
      }
      
      const timeoutId = setTimeout(animateCursors, 5000);
      animationTimeoutsRef.current.push(timeoutId);
    };
    
    const initialTimeoutId = setTimeout(animateCursors, 2000);
    animationTimeoutsRef.current.push(initialTimeoutId);
    
    return () => {
      // Clean up
      cursorRefs.current.forEach(cursor => {
        if (cursor && cursor.parentNode) {
          cursor.parentNode.removeChild(cursor);
        }
      });
    };
  }, [isVisible, isMounted]);

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
                {/* Speedometer with animation */}
                <div className="relative w-full flex justify-center">
                  {/* Base layer (gray and red segments) */}
                  <div className="relative w-[320px] h-[160px]">
                    <svg width="320" height="160" viewBox="0 0 400 200">
                      {/* Gray segments */}
                      {Array.from({ length: 12 }, (_, i) => {
                        const rotation = -90 + (i * 180) / 11;
                        const isRed = i >= 8;
                        
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
                            opacity={isRed ? (i < 8 + redSegmentCount ? "1" : "0") : "1"}
                            transform={`rotate(${rotation}, 200, 200)`}
                          />
                        );
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

              {/* Monthly Growth Stats */}
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

          {/* Right Box - Collaboration Area */}
          <div className="bg-[#1a1a1a] rounded-3xl p-8 shadow-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2a2a2a] mb-6">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300 text-base">24/7 SEO Monitoring</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-3">Our experts never sleep</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Our team constantly analyzes, monitors, and optimizes your rankings to keep you ahead of competitors and future-proof your SEO strategy.
            </p>

            {/* Dashboard and Chat Interface */}
            <div 
              ref={chatContainerRef} 
              className="relative bg-[#222] rounded-2xl overflow-hidden h-[400px] shadow-inner"
            >
              {/* Main Dashboard */}
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
                  
                  <div className="grid grid-cols-4 p-2 text-xs text-white">
                    <div className="font-medium">best ai for seo</div>
                    <div className="text-center">2,100</div>
                    <div className="text-center">28/100</div>
                    <div className="text-center text-green-400">High</div>
                  </div>
                </div>
                
                {/* Additional analytics element */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-[#2a2a2a] p-3 rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-400 mb-2">Keyword difficulty trend</div>
                    <div className="h-12 flex items-end space-x-1">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-blue-500 w-full" 
                          style={{ 
                            height: `${20 + Math.sin(i / 2) * 10}px`,
                            opacity: 0.5 + (i % 10) / 10
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#2a2a2a] p-3 rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-400 mb-2">Competitor ranking</div>
                    <div className="h-12 flex items-center justify-between">
                      <div className="h-8 w-8 rounded-full bg-blue-500 opacity-80"></div>
                      <div className="h-6 w-6 rounded-full bg-green-500 opacity-60"></div>
                      <div className="h-10 w-10 rounded-full bg-purple-500 opacity-70"></div>
                      <div className="h-4 w-4 rounded-full bg-yellow-500 opacity-50"></div>
                      <div className="h-5 w-5 rounded-full bg-pink-500 opacity-60"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat Overlay - Only show after client-side mounted */}
              {isMounted && (
                <div className="absolute bottom-0 left-0 right-0">
                  {/* Message container */}
                  <div className="bg-[#333] shadow-xl rounded-t-lg overflow-hidden">
                    {chatPhase >= 1 && (
                      <div className="p-3 max-h-60 overflow-y-auto">
                        <div className="flex items-start gap-2 mb-3">
                          <Avatar className="h-8 w-8 rounded-full border border-gray-700 shrink-0">
                            <AvatarImage src={chatMessages[currentMessageIndex].avatar} alt={chatMessages[currentMessageIndex].name} />
                            <AvatarFallback className="bg-blue-400">{chatMessages[currentMessageIndex].name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-white text-sm">{chatMessages[currentMessageIndex].name}</span>
                              <span className="text-gray-500 text-xs">{chatMessages[currentMessageIndex].time}</span>
                            </div>
                            <p className="text-gray-300 text-sm">
                              {chatMessages[currentMessageIndex].text}
                            </p>
                            
                            {/* Reactions */}
                            {(showThumbsUp || showFire) && (
                              <div className="flex gap-2 mt-1 mb-0">
                                {showThumbsUp && (
                                  <div className="thumbs-up-reaction bg-[#444] rounded-full px-2 py-0.5 flex items-center gap-1 text-xs">
                                    <span>👍</span>
                                    <span className="text-gray-300">1</span>
                                  </div>
                                )}
                                {showFire && (
                                  <div className="fire-reaction bg-[#444] rounded-full px-2 py-0.5 flex items-center gap-1 text-xs">
                                    <span>🔥</span>
                                    <span className="text-gray-300">1</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Input area */}
                    <div className="border-t border-gray-600 p-3 bg-[#2a2a2a] flex items-center gap-2">
                      <input 
                        ref={chatInputRef}
                        type="text" 
                        placeholder="Type your message..."
                        className="bg-[#333] text-gray-300 text-sm flex-1 px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
                        value={typingText}
                        readOnly
                      />
                      <button 
                        ref={sendButtonRef}
                        className="bg-blue-500 text-white rounded-md p-2 flex items-center justify-center transform transition-transform"
                        disabled
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notification bubble - Only show after client-side mounted */}
              {isMounted && (
                <div className={`absolute top-4 right-4 bg-[#333] p-2 rounded-full transition-all duration-300 ${chatActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 6.33325C17.5 4.6764 16.1569 3.33325 14.5 3.33325H5.5C3.84315 3.33325 2.5 4.6764 2.5 6.33325V16.6666L4.98875 15.4222C5.54417 15.1445 6.15662 14.9999 6.77761 14.9999H14.5C16.1569 14.9999 17.5 13.6568 17.5 11.9999V6.33325Z" 
                          fill="#37322F" stroke="#D6CFC2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
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
          animation: flicker-gray 0.2s infinite;
        }
        
        .animate-flicker-red {
          animation: flicker-red 0.15s infinite;
        }
      `}</style>
    </section>
  )
}