"use client"

import { useRef, useEffect, useState } from "react"
import anime from 'animejs'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SpeedPerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const speedometerRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [speedValue, setSpeedValue] = useState(60)
  const [isVisible, setIsVisible] = useState(false)
  const [totalSegments, setTotalSegments] = useState(8)
  const [chatStep, setChatStep] = useState(0)
  const [typingText, setTypingText] = useState("")
  const [showReactions, setShowReactions] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const chatTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const cursorRefs = useRef<HTMLDivElement[]>([])
  
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
      { threshold: 0.25 }
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
  
  // Redline flickering animation using Anime.js
  useEffect(() => {
    if (!isVisible || !speedometerRef.current) return
    
    // Function to update the speedometer display
    const updateSpeedometer = () => {
      // Randomly determine how many segments should be lit (8-12)
      const segmentCount = Math.floor(Math.random() * 5) + 8; // 8-12 range
      setTotalSegments(segmentCount);
      
      // Get all segment elements
      const segments = speedometerRef.current?.querySelectorAll('.segment');
      
      if (segments) {
        // Reset all segments
        segments.forEach((segment, i) => {
          // Gray segments
          if (i < GRAY_SEGMENTS) {
            (segment as HTMLElement).style.opacity = '0.7';
            (segment as HTMLElement).style.fill = '#4A4A4A';
          } 
          // Red segments
          else {
            // If this segment should be lit based on the random count
            if (i < segmentCount) {
              (segment as HTMLElement).style.opacity = '0.9';
              (segment as HTMLElement).style.fill = '#FF3E3E';
            } else {
              (segment as HTMLElement).style.opacity = '0.15';
              (segment as HTMLElement).style.fill = '#8B3E3E';
            }
          }
        });
      }
      
      // Flicker rapidly - between 70-120ms
      const flickerRate = 70 + Math.random() * 50;
      setTimeout(updateSpeedometer, flickerRate);
    };
    
    // Start the speedometer animation
    updateSpeedometer();
    
    return () => {
      // Cleanup any remaining timers
      clearTimeout(updateSpeedometer as unknown as number);
    };
  }, [isVisible]);

  // Counter animation with faster second phase (4 seconds per unit)
  useEffect(() => {
    if (!isVisible) return

    // Phase 1: Moderate increase to 150 in 4 seconds
    anime({
      targets: {value: 60},
      value: 150,
      duration: 4000,
      easing: 'easeInOutQuad',
      round: 1,
      update: (anim) => {
        setSpeedValue(Math.round(anim.animations[0].currentValue));
      },
      complete: () => {
        // Phase 2: Slower increase from 150 to 400
        // 4 seconds per unit × 250 units = 1,000,000 milliseconds
        anime({
          targets: {value: 150},
          value: 400,
          duration: 1000000, // ~16.7 minutes (4 seconds per unit)
          easing: 'linear', // Linear to make it consistently slow
          round: 1,
          update: (anim) => {
            setSpeedValue(Math.round(anim.animations[0].currentValue));
          }
        });
      }
    });
    
    return () => {
      anime.remove('[data-speed-counter]');
    };
  }, [isVisible]);

  // Chat animation sequence
  useEffect(() => {
    if (!isVisible) return;

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
    ];

    const chatLoop = () => {
      // Reset chat state
      if (chatStep === 0) {
        setTypingText("");
        setShowReactions(false);
        setChatStep(1);
        chatTimeoutRef.current = setTimeout(chatLoop, 1500);
      } 
      // Start typing second message
      else if (chatStep === 1) {
        const message = chatMessages[1].text;
        let currentIndex = 0;
        
        const typeNextChar = () => {
          if (currentIndex < message.length) {
            setTypingText(message.substring(0, currentIndex + 1));
            currentIndex++;
            chatTimeoutRef.current = setTimeout(typeNextChar, 25); // Speed of typing
          } else {
            // Finished typing, wait a moment then show reactions
            chatTimeoutRef.current = setTimeout(() => {
              setShowReactions(true);
              
              // Wait with reactions, then reset
              chatTimeoutRef.current = setTimeout(() => {
                setChatStep(0); // Reset to beginning
              }, 3000);
            }, 1000);
          }
        };
        
        typeNextChar();
      }
    };

    // Start the chat loop
    chatLoop();

    return () => {
      if (chatTimeoutRef.current) {
        clearTimeout(chatTimeoutRef.current);
      }
    };
  }, [isVisible, chatStep]);

  // Create and animate cursors
  useEffect(() => {
    if (!isVisible || !chatContainerRef.current) return;
    
    const cursorNames = ["Sarah", "Michael", "Jessica"];
    const cursorColors = ["#A8D9FF", "#FAC666", "#FF9EB3"];
    const cursors: HTMLDivElement[] = [];
    
    // Remove any existing cursors first
    cursorRefs.current.forEach(cursor => {
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    });
    
    cursorRefs.current = [];
    
    // Create new cursors
    for (let i = 0; i < 3; i++) {
      const cursor = document.createElement('div');
      cursor.className = 'absolute pointer-events-none z-20';
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
      `;
      
      // Initial random position within the dashboard area
      const posX = 40 + Math.random() * 180;
      const posY = 40 + Math.random() * 120; // Keep within the visible dashboard area
      
      cursor.style.left = `${posX}px`;
      cursor.style.top = `${posY}px`;
      cursor.style.position = 'absolute';
      cursor.style.zIndex = '40';
      
      chatContainerRef.current.appendChild(cursor);
      cursors.push(cursor);
      cursorRefs.current.push(cursor);
    }
    
    // Animation function for moving cursors
    let targetPositions = cursors.map(() => ({
      x: 40 + Math.random() * 180,
      y: 40 + Math.random() * 120
    }));
    
    const animateCursors = () => {
      // Occasionally generate new target positions
      if (Math.random() < 0.01) {
        targetPositions = cursors.map(() => ({
          x: 40 + Math.random() * 180,
          y: 40 + Math.random() * 120
        }));
      }
      
      // Move each cursor towards its target
      cursors.forEach((cursor, i) => {
        const currentX = parseFloat(cursor.style.left);
        const currentY = parseFloat(cursor.style.top);
        const targetX = targetPositions[i].x;
        const targetY = targetPositions[i].y;
        
        // Move gradually toward target
        cursor.style.left = `${currentX + (targetX - currentX) * 0.05}px`;
        cursor.style.top = `${currentY + (targetY - currentY) * 0.05}px`;
      });
      
      animationFrameRef.current = requestAnimationFrame(animateCursors);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animateCursors);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Clean up cursor elements
      cursors.forEach(cursor => {
        if (cursor.parentNode) {
          cursor.parentNode.removeChild(cursor);
        }
      });
      
      cursorRefs.current = [];
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
                      {/* All 12 segments */}
                      {Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
                        const rotation = -90 + (i * 180) / 11;
                        const isRed = i >= GRAY_SEGMENTS;
                        const isActive = i < totalSegments;
                        
                        return (
                          <rect
                            key={i}
                            className="segment"
                            x="185"
                            y="10"
                            width="30"
                            height="60"
                            rx="2"
                            fill={isRed ? (isActive ? "#FF3E3E" : "#8B3E3E") : "#4A4A4A"}
                            opacity={isActive ? (isRed ? 0.9 : 0.7) : 0.15}
                            transform={`rotate(${rotation}, 200, 200)`}
                          />
                        );
                      })}
                    </svg>

                    {/* Digital display - moved to center of the speedometer */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[10%] text-center">
                      <div 
                        data-speed-counter 
                        className="text-6xl font-mono text-white tracking-wider" 
                        style={{ fontFamily: "monospace" }}
                      >
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

              {/* Monthly Growth Stats - cleaner replacement */}
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

          {/* Right Box - Collaboration Interface */}
          <div className="bg-[#1a1a1a] rounded-3xl p-8 shadow-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2a2a2a] mb-6">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300 text-base">24/7 SEO Monitoring</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-3">Our experts never sleep</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Our team constantly analyzes, monitors, and optimizes your rankings to keep you ahead of competitors and future-proof your SEO strategy.
            </p>

            {/* Dashboard and Chat Container - increased height and used flex for better layout */}
            <div 
              ref={chatContainerRef} 
              className="bg-[#222] rounded-2xl overflow-hidden flex flex-col h-96"
              style={{ position: 'relative' }}
            >
              {/* Keyword Analysis Dashboard - fixed height */}
              <div className="bg-[#2a2a2a] p-4 border-b border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white text-sm font-medium">Keyword Opportunity Analysis</div>
                  <div className="text-xs text-gray-400">Last updated: just now</div>
                </div>
                
                {/* Simple keyword table */}
                <div className="w-full rounded overflow-hidden border border-gray-700 text-xs">
                  <div className="grid grid-cols-4 bg-[#333] text-gray-400">
                    <div className="p-1.5">Keyword</div>
                    <div className="p-1.5 text-center">Volume</div>
                    <div className="p-1.5 text-center">Difficulty</div>
                    <div className="p-1.5 text-center">Potential</div>
                  </div>
                  <div className="grid grid-cols-4 bg-[#2d2d2d] text-white">
                    <div className="p-1.5 font-medium">ai seo tools</div>
                    <div className="p-1.5 text-center">5,200</div>
                    <div className="p-1.5 text-center">32/100</div>
                    <div className="p-1.5 text-center text-green-400">High</div>
                  </div>
                  <div className="grid grid-cols-4 bg-[#2d2d2d] border-t border-gray-700 text-white">
                    <div className="p-1.5 font-medium">ai keyword research</div>
                    <div className="p-1.5 text-center">3,800</div>
                    <div className="p-1.5 text-center">41/100</div>
                    <div className="p-1.5 text-center text-green-400">High</div>
                  </div>
                </div>
              </div>
              
              {/* Chat area - flexible height, scrollable */}
              <div className="flex-grow p-4 overflow-y-auto flex flex-col justify-end" style={{ minHeight: "160px" }}>
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
                    <p className="text-gray-300 text-sm">
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
                      <p className="text-gray-300 text-sm">
                        {typingText}
                        {typingText.length > 0 && typingText.length < 83 && (
                          <span className="inline-block h-4 w-[2px] bg-blue-400 ml-[1px] animate-pulse"></span>
                        )}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Reactions */}
                {showReactions && (
                  <div className="flex gap-2 ml-10 mt-1 mb-2">
                    <div className="bg-[#333] rounded-full px-2 py-0.5 flex items-center gap-1 text-xs">
                      <span>👍</span>
                      <span className="text-gray-300">1</span>
                    </div>
                    <div className="bg-[#333] rounded-full px-2 py-0.5 flex items-center gap-1 text-xs animation-delay-300">
                      <span>🔥</span>
                      <span className="text-gray-300">1</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input area - fixed at the bottom */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center bg-[#333] rounded-lg border border-gray-700 px-3 py-2">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="bg-transparent text-gray-300 text-sm flex-1 focus:outline-none"
                    disabled
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
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </section>
  )
}