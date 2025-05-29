"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import anime from 'animejs'

export function AIODashboard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Typing animation for search bar
    const searchAnimation = anime({
      targets: '.search-text',
      width: ['0%', '100%'],
      duration: 1500,
      easing: 'easeInOutQuad',
      delay: 500,
      complete: () => {
        // After typing, show search results
        anime({
          targets: '.search-result',
          translateY: [-20, 0],
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(200),
          easing: 'easeOutElastic(1, .5)'
        })
      }
    })

    // Ranking animation
    const rankingAnimation = anime({
      targets: '.ranking-bar',
      width: (el) => el.getAttribute('data-value'),
      duration: 1500,
      delay: anime.stagger(200),
      easing: 'easeOutElastic(1, .5)'
    })

    // Traffic graph animation
    const graphAnimation = anime({
      targets: '.traffic-line',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 2000,
      delay: 500,
      easing: 'easeOutQuad'
    })

    // Cleanup
    return () => {
      searchAnimation.pause()
      rankingAnimation.pause()
      graphAnimation.pause()
    }
  }, [])

  return (
    <section className="py-24 bg-[#111827] relative overflow-hidden">
      {/* Top wave */}
      <div className="absolute -top-24 left-0 right-0 transform rotate-180">
        <svg className="w-full h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#faf9f6" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
            AI-Powered Dashboard
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4 text-white">
            Real-time SEO Intelligence
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-universal">
            Monitor and optimize your search performance with our AI-powered dashboard
          </p>
        </div>

        <div className="bg-[#1a1f2d] rounded-2xl p-6 shadow-2xl border border-gray-800">
          {/* Search Analysis */}
          <div ref={searchBarRef} className="mb-8">
            <div className="bg-[#2a2f3d] rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center bg-[#111827] rounded-lg p-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                <div className="flex-1 h-6 overflow-hidden">
                  <div className="search-text text-gray-300 whitespace-nowrap overflow-hidden w-0">
                    analyzing website performance...
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { title: "Technical Issues Found", value: "12", change: "-25%" },
                  { title: "Content Opportunities", value: "8", change: "+15%" },
                  { title: "Keyword Gaps", value: "5", change: "-30%" }
                ].map((item, i) => (
                  <div key={i} className="search-result opacity-0 bg-[#111827] rounded-lg p-3 flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{item.title}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium">{item.value}</span>
                      <span className={item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rankings & Traffic */}
          <div ref={resultsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rankings */}
            <div className="bg-[#2a2f3d] rounded-lg p-6">
              <h3 className="text-white font-garnett mb-4">Keyword Rankings</h3>
              <div className="space-y-4">
                {[
                  { keyword: "best seo tools", position: "85%" },
                  { keyword: "ai seo platform", position: "92%" },
                  { keyword: "seo automation", position: "78%" }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{item.keyword}</span>
                      <span className="text-white">{item.position}</span>
                    </div>
                    <div className="h-2 bg-[#111827] rounded-full overflow-hidden">
                      <div 
                        className="ranking-bar h-full bg-blue-500"
                        data-value={item.position}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Graph */}
            <div className="bg-[#2a2f3d] rounded-lg p-6">
              <h3 className="text-white font-garnett mb-4">Organic Traffic Growth</h3>
              <div className="relative h-[200px]">
                <svg className="w-full h-full" viewBox="0 0 300 200">
                  {/* Grid */}
                  <line x1="0" y1="0" x2="300" y2="0" stroke="#374151" strokeWidth="1" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#374151" strokeWidth="1" />
                  <line x1="0" y1="100" x2="300" y2="100" stroke="#374151" strokeWidth="1" />
                  <line x1="0" y1="150" x2="300" y2="150" stroke="#374151" strokeWidth="1" />
                  
                  {/* Traffic Line */}
                  <path
                    className="traffic-line"
                    d="M0,180 C50,160 100,120 150,80 S250,40 300,20"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                  />
                  
                  {/* Data Points */}
                  <circle cx="0" cy="180" r="4" fill="#3B82F6" />
                  <circle cx="75" cy="140" r="4" fill="#3B82F6" />
                  <circle cx="150" cy="80" r="4" fill="#3B82F6" />
                  <circle cx="225" cy="40" r="4" fill="#3B82F6" />
                  <circle cx="300" cy="20" r="4" fill="#3B82F6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg className="w-full h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,0L48,21.3C96,43,192,85,288,90.7C384,96,480,64,576,74.7C672,85,768,139,864,160C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  )
}