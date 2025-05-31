"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import anime from 'animejs'

export function PPCResults() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      loop: false,
      autoplay: false
    })

    timeline
      .add({
        targets: '.search-result',
        translateY: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 800
      })
      .add({
        targets: '.ad-metrics',
        scale: [0.9, 1],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 600
      })

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            timeline.play()
            observer.disconnect() // Only play once
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={containerRef} className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
            Real Results
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            Maximize Your Ad Performance
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Our AI continuously optimizes your campaigns for better results
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Search Results Preview */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="space-y-4">
              <div className="search-result bg-indigo-50 rounded-lg p-4 opacity-0">
                <div className="text-xs text-gray-500 mb-1">Sponsored</div>
                <div className="text-blue-600 font-medium text-lg mb-1">Transform Your PPC Results with AI</div>
                <div className="text-gray-600">Maximize ROI and minimize wasted ad spend with our AI-powered PPC management platform.</div>
              </div>
              
              {[...Array(2)].map((_, i) => (
                <div key={i} className="search-result bg-gray-50 rounded-lg p-4 opacity-0">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Click-Through Rate", value: "+156%", color: "bg-indigo-100 text-indigo-600" },
              { label: "Conversion Rate", value: "+92%", color: "bg-purple-100 text-purple-600" },
              { label: "Cost per Click", value: "-45%", color: "bg-green-100 text-green-600" },
              { label: "Quality Score", value: "+78%", color: "bg-blue-100 text-blue-600" }
            ].map((metric, i) => (
              <div key={i} className={`ad-metrics opacity-0 ${metric.color} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold mb-2">{metric.value}</div>
                <div className="text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}