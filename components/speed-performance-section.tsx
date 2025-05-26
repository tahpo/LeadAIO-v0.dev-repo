"use client"

import { useRef, useEffect, useState } from "react"
import anime from 'animejs'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

export function SpeedPerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const speedometerRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [speedValue, setSpeedValue] = useState(60)
  const [isVisible, setIsVisible] = useState(false)
  const [totalSegments, setTotalSegments] = useState(8)
  const [messages, setMessages] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [cursors, setCursors] = useState<any[]>([])
  const animationFrameRef = useRef<number | null>(null)
  
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

  // SEO Collaboration simulation
  useEffect(() => {
    if (!isVisible || !chatContainerRef.current) return;

    // Initial users
    setUsers([
      { id: 1, name: "Sarah", color: "#A8D9FF", avatar: "/professional-woman-headshot.png", position: { x: 20, y: 40 } },
      { id: 2, name: "Michael", color: "#FAC666", avatar: "/professional-man-headshot.png", position: { x: 220, y: 80 } },
      { id: 3, name: "Jessica", color: "#FF9EB3", avatar: "/professional-woman-headshot-2.png", position: { x: 120, y: 160 } }
    ]);

    // Set up initial cursors
    setCursors([
      { id: 1, userId: 1, x: 100, y: 50, targetX: 180, targetY: 70 },
      { id: 2, userId: 2, x: 240, y: 150, targetX: 150, targetY: 180 },
      { id: 3, userId: 3, x: 40, y: 120, targetX: 80, targetY: 40 }
    ]);

    // Initial messages
    const initialMessages = [
      {
        id: 1,
        userId: 1,
        content: "I found a new keyword cluster we should target. It has low competition but high volume.",
        timestamp: "1h ago"
      }
    ];

    // Simulate chat conversation
    const messages = [
      {
        userId: 2,
        content: "Great find! What's the search volume like?",
        delay: 2000
      },
      {
        userId: 1,
        content: "About 5,200 monthly searches and competitors have weak content.",
        delay: 5000
      },
      {
        userId: 3,
        content: "I can start working on content optimization for these keywords right away!",
        delay: 8000
      },
      {
        userId: 2,
        content: "Let's prioritize the top 5 keywords first. Our client will love this.",
        delay: 12000
      },
      {
        userId: 1,
        content: "According to the data, we could see a 32% increase in relevant traffic.",
        delay: 16000
      }
    ];

    setMessages(initialMessages);

    // Animation loop for cursors
    const animateCursors = () => {
      setCursors(prevCursors => 
        prevCursors.map(cursor => {
          // Move cursor toward target
          const dx = cursor.targetX - cursor.x;
          const dy = cursor.targetY - cursor.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 5) {
            // Set new target
            return {
              ...cursor,
              targetX: Math.random() * 250,
              targetY: 20 + Math.random() * 180
            };
          }
          
          // Move toward target
          return {
            ...cursor,
            x: cursor.x + dx * 0.05,
            y: cursor.y + dy * 0.05
          };
        })
      );
      
      animationFrameRef.current = requestAnimationFrame(animateCursors);
    };
    
    animateCursors();

    // Simulate message typing
    let msgIndex = 0;
    const messageTimer = setInterval(() => {
      if (msgIndex < messages.length) {
        const newMsg = {
          id: initialMessages.length + msgIndex + 1,
          userId: messages[msgIndex].userId,
          content: messages[msgIndex].content,
          timestamp: "Just now"
        };
        
        setMessages(prev => [...prev, newMsg]);
        msgIndex++;
      } else {
        clearInterval(messageTimer);
      }
    }, 4000);

    return () => {
      clearInterval(messageTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
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
              <span className="text-gray-300 text-base">Analyze together</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-3">Collaborate in real time</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Work together seamlessly regardless of your role in the team. Leverage real-time multiplayer to bring
              everyone together.
            </p>

            <div ref={chatContainerRef} className="bg-[#222] rounded-2xl p-6 h-[340px] relative overflow-hidden">
              {/* Keyword Analysis Dashboard */}
              <div className="bg-[#2a2a2a] rounded-xl p-3 mb-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white text-sm font-medium">Keyword Opportunity Analysis</div>
                  <div className="text-xs text-gray-400">Last updated: just now</div>
                </div>
                
                {/* Simple keyword table */}
                <div className="w-full rounded overflow-hidden border border-gray-700 text-xs">
                  <div className="grid grid-cols-4 bg-[#333] text-gray-400">
                    <div className="p-2">Keyword</div>
                    <div className="p-2 text-center">Volume</div>
                    <div className="p-2 text-center">Difficulty</div>
                    <div className="p-2 text-center">Potential</div>
                  </div>
                  <div className="grid grid-cols-4 bg-[#2d2d2d] text-white">
                    <div className="p-2 font-medium">ai seo tools</div>
                    <div className="p-2 text-center">5,200</div>
                    <div className="p-2 text-center">32/100</div>
                    <div className="p-2 text-center text-green-400">High</div>
                  </div>
                  <div className="grid grid-cols-4 bg-[#2d2d2d] border-t border-gray-700 text-white">
                    <div className="p-2 font-medium">ai keyword research</div>
                    <div className="p-2 text-center">3,800</div>
                    <div className="p-2 text-center">41/100</div>
                    <div className="p-2 text-center text-green-400">High</div>
                  </div>
                  <div className="grid grid-cols-4 bg-[#2d2d2d] border-t border-gray-700 text-white">
                    <div className="p-2 font-medium">best ai for seo</div>
                    <div className="p-2 text-center">2,100</div>
                    <div className="p-2 text-center">28/100</div>
                    <div className="p-2 text-center text-green-400">High</div>
                  </div>
                </div>
              </div>
              
              {/* Chat Conversation */}
              <div className="rounded-xl bg-[#292929] p-3 h-[145px] overflow-y-auto">
                <div className="space-y-3">
                  {messages.map((message) => {
                    const user = users.find(u => u.id === message.userId);
                    return (
                      <div key={message.id} className="flex items-start gap-2 text-xs animate-in fade-in duration-300">
                        <Avatar className="h-6 w-6 rounded-full border border-gray-700">
                          <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
                          <AvatarFallback style={{backgroundColor: user?.color}}>
                            {user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{user?.name}</span>
                            <span className="text-gray-500 text-[10px]">{message.timestamp}</span>
                          </div>
                          <p className="text-gray-300">{message.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Input area */}
              <div className="absolute bottom-6 left-6 right-6">
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
              
              {/* Floating user cursors */}
              {cursors.map(cursor => {
                const user = users.find(u => u.id === cursor.userId);
                return (
                  <motion.div
                    key={cursor.id}
                    className="absolute pointer-events-none"
                    style={{
                      left: cursor.x,
                      top: cursor.y,
                      zIndex: 20
                    }}
                    animate={{
                      x: cursor.x,
                      y: cursor.y,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <div className="flex items-center">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 3L13 13M3 13L13 3" stroke={user?.color || "#fff"} strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <div 
                        className="ml-1 px-2 py-1 text-[10px] text-white rounded-md" 
                        style={{ backgroundColor: user?.color || "#333", opacity: 0.9 }}
                      >
                        {user?.name}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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