"use client"

import { useRef, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import anime from 'animejs'

export function ExpertsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [chatStep, setChatStep] = useState(0)
  const [typingText, setTypingText] = useState("")
  const [showReactions, setShowReactions] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const chatTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  // Chat animation sequence
  useEffect(() => {
    if (!isVisible) return;

    const chatLoop = () => {
      // First message appears instantly
      if (chatStep === 0) {
        setTypingText("");
        setShowReactions(false);
        setChatStep(1);
        chatTimeoutRef.current = setTimeout(chatLoop, 1000);
      } 
      // Start typing second message
      else if (chatStep === 1) {
        const message = "We've found a high-value keyword cluster that competitors are missing. Search volume is 8.2K/month with low competition.";
        let currentIndex = 0;
        
        const typeNextChar = () => {
          if (currentIndex < message.length) {
            setTypingText(message.substring(0, currentIndex + 1));
            currentIndex++;
            chatTimeoutRef.current = setTimeout(typeNextChar, 30); // Speed of typing
          } else {
            // Finished typing, wait a moment then show reactions
            chatTimeoutRef.current = setTimeout(() => {
              setShowReactions(true);
              
              // Wait with reactions, then reset
              chatTimeoutRef.current = setTimeout(() => {
                setChatStep(0); // Reset to beginning
                chatLoop();
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

  // Simulate cursor movements
  useEffect(() => {
    if (!isVisible) return;
    
    let cursorPositions: {x: number, y: number}[] = [
      {x: 180, y: 70}, 
      {x: 80, y: 100}, 
      {x: 230, y: 140}
    ];
    let cursors: HTMLDivElement[] = [];
    
    // Create cursors
    for (let i = 0; i < 3; i++) {
      const cursor = document.createElement('div');
      cursor.className = 'absolute pointer-events-none z-20';
      cursor.innerHTML = `
        <div class="flex items-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2l8 8M2 10L10 2" stroke="${i === 0 ? '#A8D9FF' : i === 1 ? '#FAC666' : '#FF9EB3'}" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <div class="ml-1 px-2 py-0.5 text-[10px] text-white rounded-md" 
               style="background-color: ${i === 0 ? '#A8D9FF' : i === 1 ? '#FAC666' : '#FF9EB3'}; opacity: 0.9">
            ${i === 0 ? 'Sarah' : i === 1 ? 'Michael' : 'Jessica'}
          </div>
        </div>
      `;
      cursor.style.left = `${cursorPositions[i].x}px`;
      cursor.style.top = `${cursorPositions[i].y}px`;
      
      if (chatContainerRef.current) {
        chatContainerRef.current.appendChild(cursor);
        cursors.push(cursor);
      }
    }
    
    // Animate cursors
    const animateCursors = () => {
      cursors.forEach((cursor, i) => {
        // Random new target every 3-5 seconds
        if (Math.random() < 0.01) {
          cursorPositions[i] = {
            x: 20 + Math.random() * 230,
            y: 20 + Math.random() * 170
          };
        }
        
        // Move cursor toward its target
        const currentX = parseFloat(cursor.style.left);
        const currentY = parseFloat(cursor.style.top);
        const targetX = cursorPositions[i].x;
        const targetY = cursorPositions[i].y;
        
        cursor.style.left = `${currentX + (targetX - currentX) * 0.05}px`;
        cursor.style.top = `${currentY + (targetY - currentY) * 0.05}px`;
      });
      
      animationFrameRef.current = requestAnimationFrame(animateCursors);
    };
    
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
    };
  }, [isVisible]);

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

      <div ref={chatContainerRef} className="bg-[#222] rounded-2xl p-6 h-[340px] relative overflow-hidden">
        {/* Keyword Analysis Dashboard */}
        <div className="bg-[#2a2a2a] rounded-xl p-3 mb-6 border border-gray-700">
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
        <div className="bg-[#292929] rounded-xl p-4">
          {/* First message from Sarah */}
          <div className="flex items-start gap-2 mb-3">
            <Avatar className="h-8 w-8 rounded-full border border-gray-700">
              <AvatarImage src="/professional-woman-headshot.png" alt="Sarah" />
              <AvatarFallback style={{backgroundColor: "#A8D9FF"}}>S</AvatarFallback>
            </Avatar>
            <div className="flex-1">
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
            <div className="flex items-start gap-2 mb-3">
              <Avatar className="h-8 w-8 rounded-full border border-gray-700">
                <AvatarImage src="/professional-man-headshot.png" alt="Michael" />
                <AvatarFallback style={{backgroundColor: "#FAC666"}}>M</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-white text-sm">Michael</span>
                  <span className="text-gray-500 text-xs">Just now</span>
                </div>
                <p className="text-gray-300 text-sm">
                  {typingText}
                  {typingText.length > 0 && typingText.length < "We've found a high-value keyword cluster that competitors are missing. Search volume is 8.2K/month with low competition.".length && (
                    <span className="inline-block w-[2px] h-4 bg-blue-400 ml-[1px] animate-pulse"></span>
                  )}
                </p>
              </div>
            </div>
          )}
          
          {/* Reactions */}
          {showReactions && (
            <div className="flex gap-2 ml-10 mt-2">
              <div className="bg-[#333] rounded-full px-2 py-1 flex items-center gap-1 text-xs">
                <span>👍</span>
                <span className="text-gray-300">1</span>
              </div>
              <div className="bg-[#333] rounded-full px-2 py-1 flex items-center gap-1 text-xs">
                <span>🔥</span>
                <span className="text-gray-300">1</span>
              </div>
            </div>
          )}
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