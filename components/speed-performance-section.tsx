"use client"

import { useRef, useEffect, useState } from "react"
import anime from 'animejs'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

export function SpeedPerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const speedometerRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const [speedValue, setSpeedValue] = useState(60)
  const [isVisible, setIsVisible] = useState(false)
  const [redSegmentCount, setRedSegmentCount] = useState(0)
  const [chatActive, setChatActive] = useState(false)
  const [chatPhase, setChatPhase] = useState(0)
  const [typingText, setTypingText] = useState("")
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showThumbsUp, setShowThumbsUp] = useState(false)
  const [showFire, setShowFire] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const chatTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const cursorRefs = useRef<HTMLDivElement[]>([])

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
      if (chatTimeoutRef.current) {
        clearTimeout(chatTimeoutRef.current)
      }
    }
  }, [])

  // Red segment length animation
  useEffect(() => {
    if (!isVisible) return

    // Animate the red segments to give growing/shrinking effect
    const updateRedSegments = () => {
      // Random number between 0 and 4 (0-4 red segments)
      const newCount = Math.floor(Math.random() * 5)
      setRedSegmentCount(newCount)

      // Update faster (100-200ms)
      const timeout = 100 + Math.random() * 100
      setTimeout(updateRedSegments, timeout)
    }

    updateRedSegments()
  }, [isVisible])

  // Counter animation
  useEffect(() => {
    if (!isVisible) return

    // Slower initial animation from 60 to 150 (4 seconds)
    let startTime = Date.now()
    let duration = 4000 // 4 seconds
    let startValue = 60
    let endValue = 150

    const animatePhase1 = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const value = Math.floor(startValue + (endValue - startValue) * progress)

      setSpeedValue(value)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animatePhase1)
      } else {
        // Start phase 2 - Slower animation from 150 to 400 (4 seconds per increment)
        startTime = Date.now()
        duration = 1000000 // 4 seconds × 250 increments = very slow increase
        startValue = 150
        endValue = 400
        animationFrameRef.current = requestAnimationFrame(animatePhase2)
      }
    }

    const animatePhase2 = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const value = Math.floor(startValue + (endValue - startValue) * progress)

      setSpeedValue(value)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animatePhase2)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animatePhase1)
  }, [isVisible])

  // Chat animation
  useEffect(() => {
    if (!isVisible || !chatInputRef.current || !sendButtonRef.current) return;
    
    const startChatSequence = () => {
      // Wait 3 seconds before starting the chat sequence
      setTimeout(() => {
        setChatActive(true);
        runChatAnimation();
      }, 3000);
    };
    
    const runChatAnimation = () => {
      setChatPhase(0);
      setTypingText("");
      setShowThumbsUp(false);
      setShowFire(false);
      
      const currentMessage = chatMessages[currentMessageIndex];
      
      // Animation sequence:
      const sequence = async () => {
        // 1. Wait before typing starts
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 2. Type message in input box
        for (let i = 0; i <= currentMessage.text.length; i++) {
          setTypingText(currentMessage.text.substring(0, i));
          await new Promise(resolve => setTimeout(resolve, 25 + Math.random() * 15)); // Random typing speed
        }
        
        // 3. Animate send button press
        anime({
          targets: sendButtonRef.current,
          scale: [1, 0.9, 1],
          duration: 300,
          easing: 'easeInOutBack'
        });
        
        // 4. Add message to chat (immediate)
        await new Promise(resolve => setTimeout(resolve, 300));
        setChatPhase(1);
        setTypingText("");
        
        // 5. Show reactions one by one with bounce
        await new Promise(resolve => setTimeout(resolve, 800));
        setShowThumbsUp(true);
        anime({
          targets: '.thumbs-up-reaction',
          scale: [0, 1.2, 1],
          duration: 400,
          easing: 'spring(1, 80, 10, 0)'
        });
        
        // 6. Show second reaction
        await new Promise(resolve => setTimeout(resolve, 400));
        setShowFire(true);
        anime({
          targets: '.fire-reaction',
          scale: [0, 1.2, 1],
          duration: 400,
          easing: 'spring(1, 80, 10, 0)'
        });
        
        // 7. Wait with message displayed
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 8. Clear chat
        setChatPhase(0);
        setChatActive(false);
        
        // 9. Prepare next message
        setCurrentMessageIndex((currentMessageIndex + 1) % chatMessages.length);
        
        // 10. Start over after delay
        setTimeout(startChatSequence, 3000);
      };
      
      sequence();
    };
    
    startChatSequence();
    
    return () => {
      if (chatTimeoutRef.current) {
        clearTimeout(chatTimeoutRef.current);
      }
    };
  }, [isVisible, currentMessageIndex, chatMessages]);

  // Cursor animations
  useEffect(() => {
    if (!isVisible || !chatContainerRef.current) return;
    
    // Create animated cursors
    const tableArea = chatContainerRef.current.querySelector('.keyword-table');
    if (!tableArea) return;
    
    const cursorData = [
      { name: "Sarah", color: "#A8D9FF" },
      { name: "Michael", color: "#FAC666" },
      { name: "Jessica", color: "#FF9EB3" }
    ];
    
    // Remove any existing cursors
    cursorRefs.current.forEach(cursor => {
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    });
    
    cursorRefs.current = [];
    
    // Create cursors
    cursorData.forEach(({ name, color }) => {
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
      
      // Random initial positions within table bounds
      const tableRect = tableArea.getBoundingClientRect();
      const containerRect = chatContainerRef.current.getBoundingClientRect();
      
      // Position relative to container
      const x = Math.random() * tableRect.width * 0.8 + tableRect.width * 0.1;
      const y = Math.random() * tableRect.height * 0.8 + tableRect.height * 0.1;
      
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      
      tableArea.appendChild(cursor);
      cursorRefs.current.push(cursor);
    });
    
    // Animate cursors
    const animateCursors = () => {
      cursorRefs.current.forEach(cursor => {
        // Get table bounds
        const tableRect = tableArea.getBoundingClientRect();
        
        // Random movements within table
        const newX = Math.random() * tableRect.width * 0.8 + tableRect.width * 0.1;
        const newY = Math.random() * tableRect.height * 0.7 + 30; // Keep away from the top header
        
        // Random timing for natural movement
        const delay = Math.random() * 4000 + 2000;
        const duration = Math.random() * 1500 + 500;
        
        setTimeout(() => {
          cursor.style.transition = `all ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
          cursor.style.left = `${newX}px`;
          cursor.style.top = `${newY}px`;
        }, delay);
      });
      
      // Loop animation
      setTimeout(animateCursors, 5000);
    };
    
    // Start cursor animations
    animateCursors();
    
    return () => {
      // Clean up
      cursorRefs.current.forEach(cursor => {
        if (cursor && cursor.parentNode) {
          cursor.parentNode.removeChild(cursor);
        }
      });
    };
  }, [isVisible]);

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
                <div ref={speedometerRef} className="relative w-full flex justify-center">
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
              <span className="text-gray-300 text-base">Team collaboration</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-3">Our experts never sleep</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Our team constantly analyzes, monitors, and optimizes your rankings to keep you ahead of competitors and future-proof your SEO strategy.
            </p>

            {/* Dashboard and Chat Interface */}
            <div 
              ref={chatContainerRef} 
              className="relative rounded-2xl overflow-hidden h-96 shadow-inner"
            >
              {/* Main Dashboard */}
              <div className="h-full w-full bg-[#222] relative">
                {/* SEO Analytics Dashboard */}
                <div className="p-4 keyword-table">
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
                      {/* Position indicator for Jessica */}
                      <div className="absolute -right-4 -top-4 bg-pink-400 px-2 py-0.5 rounded-md text-white text-[10px] opacity-70 transform scale-75">
                        Jessica
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 p-2 text-xs text-white border-b border-gray-700 relative">
                      <div className="font-medium">ai keyword research</div>
                      <div className="text-center">3,800</div>
                      <div className="text-center">41/100</div>
                      <div className="text-center text-green-400">High</div>
                      {/* Position indicators for Michael and Sarah */}
                      <div className="absolute -right-4 top-2 bg-yellow-400 px-2 py-0.5 rounded-md text-white text-[10px] opacity-70 transform scale-75">
                        Michael
                      </div>
                      <div className="absolute left-12 top-2 bg-blue-400 px-2 py-0.5 rounded-md text-white text-[10px] opacity-70 transform scale-75">
                        Sarah
                      </div>
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
                              height: `${20 + Math.sin(i / 2) * 10 + Math.random() * 5}px`,
                              opacity: 0.5 + Math.random() * 0.5
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
              </div>
              
              {/* Chat Overlay */}
              <div className="absolute bottom-0 right-0 w-full max-w-md">
                {/* Message container */}
                <div className="bg-[#333] shadow-xl rounded-t-lg overflow-hidden">
                  {chatPhase >= 1 && (
                    <div className="p-3 max-h-60 overflow-y-auto">
                      {currentMessageIndex === 0 ? (
                        /* First message */
                        <div className="flex items-start gap-2 mb-3">
                          <Avatar className="h-8 w-8 rounded-full border border-gray-700 shrink-0">
                            <AvatarImage src={chatMessages[currentMessageIndex].avatar} alt={chatMessages[currentMessageIndex].name} />
                            <AvatarFallback className="bg-[#A8D9FF]">{chatMessages[currentMessageIndex].name[0]}</AvatarFallback>
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
                      ) : (
                        <div className="flex items-start gap-2 mb-3">
                          <Avatar className="h-8 w-8 rounded-full border border-gray-700 shrink-0">
                            <AvatarImage src={chatMessages[currentMessageIndex].avatar} alt={chatMessages[currentMessageIndex].name} />
                            <AvatarFallback className="bg-[#FAC666]">{chatMessages[currentMessageIndex].name[0]}</AvatarFallback>
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
                      )}
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
                      className="bg-blue-500 text-white rounded-md p-2 flex items-center justify-center"
                      disabled
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Notification bubble */}
              <div className={`absolute top-4 right-4 bg-[#333] p-2 rounded-full transition-all duration-300 ${chatActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 6.33325C17.5 4.6764 16.1569 3.33325 14.5 3.33325H5.5C3.84315 3.33325 2.5 4.6764 2.5 6.33325V16.6666L4.98875 15.4222C5.54417 15.1445 6.15662 14.9999 6.77761 14.9999H14.5C16.1569 14.9999 17.5 13.6568 17.5 11.9999V6.33325Z" 
                        fill="#37322F" stroke="#D6CFC2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
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
        
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-flicker-gray {
          animation: flicker-gray 0.2s infinite;
        }
        
        .animate-flicker-red {
          animation: flicker-red 0.15s infinite;
        }
        
        .cursor-blink {
          animation: cursor-blink 0.8s infinite;
        }
      `}</style>
    </section>
  )
}