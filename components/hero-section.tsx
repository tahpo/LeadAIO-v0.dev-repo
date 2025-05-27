"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import anime from 'animejs'

export function HeroSection() {
  const [currentWord1, setCurrentWord1] = useState(0)
  const [currentWord2, setCurrentWord2] = useState(0)
  const words1 = ["business", "startup", "agency", "brand", "expert"]
  const words2 = ["rankings", "results", "traffic", "dominance", "growth"]
  const [mounted, setMounted] = useState(false)
  const dashboardRef = useRef<HTMLDivElement>(null)
  
  // Set mounted state to true after hydration
  useEffect(() => {
    setMounted(true)
    return () => {}
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

  // Animated dashboard elements
  useEffect(() => {
    if (!mounted || !dashboardRef.current) return
    
    // Animate progress bars
    anime({
      targets: '.progress-bar',
      width: (el) => el.getAttribute('data-width'),
      opacity: [0.6, 1],
      easing: 'easeInOutQuad',
      duration: 1500,
      delay: anime.stagger(200),
      loop: true,
      direction: 'alternate',
      loopComplete: (anim) => {
        const newWidths = [
          `${65 + Math.floor(Math.random() * 15)}%`, 
          `${75 + Math.floor(Math.random() * 10)}%`,
          `${40 + Math.floor(Math.random() * 15)}%`
        ];
        
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach((bar, i) => {
          bar.setAttribute('data-width', newWidths[i]);
        });
      }
    });
    
    // Animate stats counters
    anime({
      targets: '.stat-value',
      innerHTML: (el) => [0, el.getAttribute('data-value')],
      easing: 'easeInOutExpo',
      round: true,
      duration: 2000,
      delay: anime.stagger(300)
    });
    
    // Animate insight badges
    anime({
      targets: '.insight-badge',
      translateY: [-10, 0],
      opacity: [0, 1],
      delay: anime.stagger(400),
      duration: 800
    });
    
    // Set up pulsing animation
    anime({
      targets: '.pulse-element',
      scale: [1, 1.05],
      opacity: [0.8, 1],
      easing: 'easeInOutSine',
      duration: 1500,
      loop: true,
      direction: 'alternate'
    });
    
    // Update traffic numbers periodically
    const updateVisitorNumbers = () => {
      const visitorCounters = document.querySelectorAll('.visitor-counter');
      visitorCounters.forEach(counter => {
        const currentNum = parseInt((counter as HTMLElement).innerText.replace(/,/g, ''), 10);
        const increase = Math.floor(Math.random() * 10) + 1;
        (counter as HTMLElement).innerText = (currentNum + increase).toLocaleString();
      });
    };
    
    const counterInterval = setInterval(updateVisitorNumbers, 3000);
    return () => clearInterval(counterInterval);
  }, [mounted]);

  // Find the longest word in each array to set fixed widths
  const longestWord1 = words1.reduce((a, b) => (a.length > b.length ? a : b), "")
  const longestWord2 = words2.reduce((a, b) => (a.length > b.length ? a : b), "")

  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden bg-white">
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
                {/* Static underline that always stays */}
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
                {/* Static underline that always stays */}
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="/signup" className="index-button index-button-primary flex items-center justify-center gap-2">
                Get started <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Dashboard Preview with dynamic animations */}
          <div className="relative w-full max-w-5xl mx-auto mt-6">
            <motion.div
              ref={dashboardRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-xl overflow-hidden shadow-2xl mx-auto"
              style={{ 
                width: "95%", 
                transform: "scale(0.95)",
                transformOrigin: "center top"
              }}
            >
              {/* Dashboard UI */}
              <div className="bg-gradient-to-br from-[#0F1724] to-[#1a202c] rounded-xl p-5 relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white shadow-md">
                      <span className="font-bold">L</span>
                    </div>
                    <div className="text-white text-lg font-garnett ml-3">LeadAIO</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-semibold pulse-element">
                      Live Data
                    </div>
                    <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
                      <span className="text-gray-300 text-xs font-medium">JS</span>
                    </div>
                  </div>
                </div>
                
                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Traffic Chart */}
                  <div className="col-span-8 bg-gradient-to-br from-[#151c28] to-[#1c2330] rounded-lg p-4 shadow-lg border border-gray-800/50 pulse-element">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white text-sm font-garnett">Organic Traffic Growth</h3>
                      <div className="bg-emerald-500/20 px-2 py-1 rounded text-emerald-300 text-xs">
                        +<span className="visitor-counter">58</span>% ↑
                      </div>
                    </div>
                    
                    <div className="h-[160px]">
                      <svg className="w-full h-full" viewBox="0 0 400 150">
                        {/* Grid Lines */}
                        <line x1="0" y1="25" x2="400" y2="25" stroke="#2D3748" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="50" x2="400" y2="50" stroke="#2D3748" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="75" x2="400" y2="75" stroke="#2D3748" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="100" x2="400" y2="100" stroke="#2D3748" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="125" x2="400" y2="125" stroke="#2D3748" strokeWidth="1" strokeDasharray="4" />
                        
                        {/* Area Chart Gradients */}
                        <defs>
                          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#4361EE" stopOpacity="0.6"/>
                            <stop offset="100%" stopColor="#4361EE" stopOpacity="0.1"/>
                          </linearGradient>
                          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#7209B7" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#7209B7" stopOpacity="0.02"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Direct Traffic (Purple) */}
                        <path 
                          d="M0,140 C30,135 70,130 120,125 S200,120 240,115 S350,110 400,105 V150 H0 Z" 
                          fill="url(#purpleGradient)" 
                          className="animate-pulse-soft"
                        />
                        <path 
                          d="M0,140 C30,135 70,130 120,125 S200,120 240,115 S350,110 400,105" 
                          fill="none" 
                          stroke="#7209B7" 
                          strokeWidth="2"
                        />
                        
                        {/* Organic Traffic (Blue) */}
                        <path 
                          d="M0,110 C40,100 80,80 120,60 S180,30 240,25 S320,20 400,30 V150 H0 Z" 
                          fill="url(#blueGradient)" 
                          className="animate-pulse-soft"
                        />
                        <path 
                          d="M0,110 C40,100 80,80 120,60 S180,30 240,25 S320,20 400,30" 
                          fill="none" 
                          stroke="#4361EE" 
                          strokeWidth="2.5"
                        />
                        
                        {/* Animated Data Points */}
                        <circle cx="120" cy="60" r="4" fill="#4361EE" stroke="#0F172A" strokeWidth="1.5" className="pulse-element" />
                        <circle cx="240" cy="25" r="4" fill="#4361EE" stroke="#0F172A" strokeWidth="1.5" className="pulse-element" />
                        <circle cx="340" cy="27" r="4" fill="#4361EE" stroke="#0F172A" strokeWidth="1.5" className="pulse-element" />
                      </svg>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs mt-2">
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 bg-[#4361EE] rounded-sm mr-1.5"></div>
                          <span className="text-blue-300">Organic Search</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 bg-[#7209B7] rounded-sm mr-1.5"></div>
                          <span className="text-purple-300">Direct Traffic</span>
                        </div>
                      </div>
                      <div className="text-gray-400">Last 90 days</div>
                    </div>
                  </div>
                  
                  {/* Keyword Rankings */}
                  <div className="col-span-4 bg-gradient-to-br from-[#151c28] to-[#1c2330] rounded-lg p-4 shadow-lg border border-gray-800/50 dashboard-animate">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white text-sm font-garnett">Keyword Rankings</h3>
                      <div className="text-emerald-400 text-xs font-medium">
                        +<span className="visitor-counter">12</span> ↑
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Top 3 positions</span>
                          <span className="text-white font-medium stat-value" data-value="18">18</span>
                        </div>
                        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                          <div className="progress-bar h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" data-width="65%"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Top 10 positions</span>
                          <span className="text-white font-medium stat-value" data-value="42">42</span>
                        </div>
                        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                          <div className="progress-bar h-full bg-gradient-to-r from-[#4361EE] to-[#4CC9F0] rounded-full" data-width="78%"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Position improvements</span>
                          <span className="text-white font-medium stat-value" data-value="21">21</span>
                        </div>
                        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                          <div className="progress-bar h-full bg-gradient-to-r from-[#F72585] to-[#FF9E00] rounded-full" data-width="45%"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* AI Insight */}
                    <div className="mt-3 bg-[#4361EE]/10 border border-[#4361EE]/20 rounded p-2 text-xs text-blue-300 insight-badge pulse-element">
                      <div className="flex items-start">
                        <div className="h-4 w-4 rounded-full bg-[#4361EE]/20 flex items-center justify-center mt-0.5 mr-2">
                          <span className="text-blue-400 text-[10px]">AI</span>
                        </div>
                        <span>8 new high-value keyword opportunities identified</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Backlink Profile */}
                  <div className="col-span-7 bg-gradient-to-br from-[#151c28] to-[#1c2330] rounded-lg p-4 shadow-lg border border-gray-800/50 dashboard-animate">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white text-sm font-garnett">Backlink Profile</h3>
                      <div className="text-xs text-blue-300 bg-[#4361EE]/20 px-2 py-0.5 rounded-full">
                        <span className="visitor-counter">372</span> total links
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3">
                      <div className="bg-[#1a2234]/60 p-2 rounded border border-gray-800/50 pulse-element">
                        <div className="text-xs text-gray-400 mb-1">High Authority</div>
                        <div className="text-white font-medium stat-value" data-value="204">204</div>
                        <div className="text-emerald-400 text-xs mt-1">+9.2% ↑</div>
                      </div>
                      
                      <div className="bg-[#1a2234]/60 p-2 rounded border border-gray-800/50">
                        <div className="text-xs text-gray-400 mb-1">Medium</div>
                        <div className="text-white font-medium stat-value" data-value="108">108</div>
                        <div className="text-emerald-400 text-xs mt-1">+4.5% ↑</div>
                      </div>
                      
                      <div className="bg-[#1a2234]/60 p-2 rounded border border-gray-800/50 pulse-element">
                        <div className="text-xs text-gray-400 mb-1">Low Quality</div>
                        <div className="text-white font-medium stat-value" data-value="38">38</div>
                        <div className="text-red-400 text-xs mt-1">-2.3% ↓</div>
                      </div>
                      
                      <div className="bg-[#1a2234]/60 p-2 rounded border border-gray-800/50">
                        <div className="text-xs text-gray-400 mb-1">New (7d)</div>
                        <div className="text-white font-medium stat-value" data-value="22">22</div>
                        <div className="text-emerald-400 text-xs mt-1">+24% ↑</div>
                      </div>
                    </div>
                    
                    {/* Domain stats */}
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div className="flex items-center bg-[#1a2234]/40 rounded p-2 pulse-element">
                        <div className="h-8 w-8 rounded-full bg-[#4361EE]/20 flex items-center justify-center mr-2">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#4361EE]" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Domain Authority</div>
                          <div className="text-white font-medium text-sm stat-value" data-value="62">62</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-[#1a2234]/40 rounded p-2">
                        <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Trust Score</div>
                          <div className="text-white font-medium text-sm stat-value" data-value="78">78</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-[#1a2234]/40 rounded p-2 pulse-element">
                        <div className="h-8 w-8 rounded-full bg-[#F72585]/20 flex items-center justify-center mr-2">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#F72585]" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Avg. Link Age</div>
                          <div className="text-white font-medium text-sm stat-value" data-value="9">9.2</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Site Health */}
                  <div className="col-span-5 bg-gradient-to-br from-[#151c28] to-[#1c2330] rounded-lg p-4 shadow-lg border border-gray-800/50 dashboard-animate">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-white text-sm font-garnett">Site Health</h3>
                      <div className="text-gray-400 text-xs">Updated today</div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <div className="relative h-24 w-24 pulse-element">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {/* Background circle */}
                          <circle 
                            cx="50" cy="50" r="40" 
                            fill="none" 
                            stroke="#2D3748" 
                            strokeWidth="8"
                          />
                          {/* Progress circle with animation */}
                          <circle 
                            cx="50" cy="50" r="40" 
                            fill="none" 
                            stroke="#10B981" 
                            strokeWidth="8"
                            strokeDasharray="251.2"
                            strokeDashoffset="50.24"
                            transform="rotate(-90 50 50)"
                            className="animate-pulse-soft"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-white stat-value" data-value="80">80</span>
                          <span className="text-gray-400 text-xs">/ 100</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="bg-[#1a2234]/40 rounded p-2 text-center">
                        <div className="text-emerald-400 text-sm font-medium stat-value" data-value="24">24</div>
                        <div className="text-gray-400 text-xs">Fixed</div>
                      </div>
                      <div className="bg-[#1a2234]/40 rounded p-2 text-center pulse-element">
                        <div className="text-amber-400 text-sm font-medium stat-value" data-value="8">8</div>
                        <div className="text-gray-400 text-xs">Warnings</div>
                      </div>
                      <div className="bg-[#1a2234]/40 rounded p-2 text-center">
                        <div className="text-red-400 text-sm font-medium stat-value" data-value="3">3</div>
                        <div className="text-gray-400 text-xs">Errors</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Platform Ranking Scores (replaced content optimization) */}
                  <div className="col-span-12 bg-gradient-to-br from-[#131820] to-[#1E293B] rounded-lg p-4 shadow-lg border border-gray-800/50 dashboard-animate">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white text-sm font-garnett">AI Platform Ranking Scores</h3>
                      <div className="text-gray-400 text-xs">Last updated: <span className="text-blue-300">3 hours ago</span></div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-3">
                      <div className="bg-[#131b2c] border border-[#4361EE]/30 rounded p-3 hover:border-[#4361EE]/40 transition-colors pulse-element">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 bg-[#4361EE]/30 rounded-full flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#4361EE]" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <span className="text-xs text-[#4361EE] font-medium">Google</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-lg font-bold text-white stat-value" data-value="92">92</div>
                          <div className="text-xs text-emerald-400">+4 ↑</div>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                          <div className="h-full bg-[#4361EE] rounded-full animate-pulse-soft" style={{width: "92%"}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-[#131b2c] border border-[#7209B7]/30 rounded p-3 hover:border-[#7209B7]/40 transition-colors">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 bg-[#7209B7]/30 rounded-full flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#7209B7]" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-xs text-[#7209B7] font-medium">ChatGPT</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-lg font-bold text-white stat-value" data-value="85">85</div>
                          <div className="text-xs text-emerald-400">+7 ↑</div>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                          <div className="h-full bg-[#7209B7] rounded-full animate-pulse-soft" style={{width: "85%"}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-[#131b2c] border border-[#F72585]/30 rounded p-3 hover:border-[#F72585]/40 transition-colors pulse-element">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 bg-[#F72585]/30 rounded-full flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#F72585]" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          </div>
                          <span className="text-xs text-[#F72585] font-medium">Gemini</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-lg font-bold text-white stat-value" data-value="78">78</div>
                          <div className="text-xs text-emerald-400">+3 ↑</div>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                          <div className="h-full bg-[#F72585] rounded-full animate-pulse-soft" style={{width: "78%"}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-[#131b2c] border border-[#4CC9F0]/30 rounded p-3 hover:border-[#4CC9F0]/40 transition-colors">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 bg-[#4CC9F0]/30 rounded-full flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#4CC9F0]" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-xs text-[#4CC9F0] font-medium">Anthropic</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-lg font-bold text-white stat-value" data-value="81">81</div>
                          <div className="text-xs text-emerald-400">+5 ↑</div>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                          <div className="h-full bg-[#4CC9F0] rounded-full animate-pulse-soft" style={{width: "81%"}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-[#131b2c] border border-[#FB8B24]/30 rounded p-3 hover:border-[#FB8B24]/40 transition-colors pulse-element">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 bg-[#FB8B24]/30 rounded-full flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#FB8B24]" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <span className="text-xs text-[#FB8B24] font-medium">DeepSeek</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-lg font-bold text-white stat-value" data-value="73">73</div>
                          <div className="text-xs text-emerald-400">+9 ↑</div>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                          <div className="h-full bg-[#FB8B24] rounded-full animate-pulse-soft" style={{width: "73%"}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}