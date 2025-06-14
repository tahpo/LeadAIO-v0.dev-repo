"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import anime from 'animejs'
import { useInView } from "framer-motion"

export function AIOOptimization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    // Content scanning animation
    anime({
      targets: '.scan-line',
      translateY: ['-120%', '120%'],
      duration: 3000,
      easing: 'linear',
      loop: true,
      direction: 'alternate'
    }).play()

    // Analysis cards animation
    anime({
      targets: '.optimization-result',
      translateY: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(200),
      duration: 800,
      easing: 'easeOutQuad'
    })

    // Progress bars animation
    anime({
      targets: '.progress-bar',
      scaleX: [0, 1],
      duration: 1500,
      delay: anime.stagger(150),
      easing: 'easeOutQuart'
    })

  }, [isInView])

  return (
    <section ref={containerRef} className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium mb-4">
            Smart Optimization
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            AI-Powered Content Optimization
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-universal">
            Let our AI analyze and optimize your content for maximum search visibility
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content Scanner */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-garnett mb-8">Content Analysis</h3>
            
            <div className="relative bg-gray-50 rounded-lg p-6 h-[320px] overflow-hidden">
              {/* Sample Content */}
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>

              {/* Scanning Effect */}
              <div className="scan-line absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-500/20 via-blue-500/10 to-transparent pointer-events-none"></div>

              {/* Analysis Results */}
              <div className="absolute top-4 right-4 space-y-4">
                {[
                  { label: "SEO Score", score: "95%", color: "text-green-600", className: "mt-8 min-w-[160px]" },
                  { label: "Readability", score: "A+", color: "text-blue-600", className: "min-w-[160px]" },
                  { label: "Keywords", score: "12", color: "text-purple-600", className: "min-w-[160px]" }
                ].map((result, i) => (
                  <div key={i} className={`optimization-result opacity-0 bg-white rounded-lg p-3 shadow-sm text-sm flex justify-between items-center ${result.className || ''}`}>
                    <span className="text-gray-600">{result.label}</span>
                    <span className={`font-medium ${result.color}`}>{result.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Optimization Progress */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-garnett mb-6">Optimization Progress</h3>
            
            <div className="space-y-6">
              {[
                { label: "Title Optimization", progress: "92%" },
                { label: "Meta Description", progress: "88%" },
                { label: "Content Structure", progress: "95%" },
                { label: "Keyword Density", progress: "85%" },
                { label: "Internal Linking", progress: "90%" }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium">{item.progress}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="progress-bar h-full bg-green-500 rounded-full transform origin-left"
                      data-progress={item.progress}
                      style={{ width: item.progress }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-green-600 text-sm mb-1">Overall Score</div>
                <div className="text-2xl font-bold text-green-700">92%</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-blue-600 text-sm mb-1">Issues Fixed</div>
                <div className="text-2xl font-bold text-blue-700">24</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}