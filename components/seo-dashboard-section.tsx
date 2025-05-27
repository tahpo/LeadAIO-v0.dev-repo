"use client"

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import anime from 'animejs'
import { Search, BarChart2, Link as LinkIcon, TrendingUp, Users, ArrowUpRight } from 'lucide-react'

export function SEODashboardSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    if (!containerRef.current) return

    // Animate the ranking chart
    anime({
      targets: '.ranking-bar',
      width: (el) => el.getAttribute('data-value'),
      easing: 'easeOutElastic(1, .5)',
      duration: 1500,
      delay: anime.stagger(100)
    })

    // Animate the traffic donut chart
    anime({
      targets: '.traffic-segment',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutQuad',
      duration: 1500,
      delay: anime.stagger(200)
    })

    // Animate metrics
    anime({
      targets: '.metric-value',
      innerHTML: (el) => [0, el.getAttribute('data-value')],
      round: 1,
      easing: 'easeInOutExpo',
      duration: 2000,
      delay: anime.stagger(100)
    })

    // Animate backlink bars
    anime({
      targets: '.backlink-bar',
      width: (el) => el.getAttribute('data-value'),
      easing: 'easeOutElastic(1, .5)',
      duration: 1500,
      delay: anime.stagger(100)
    })
  }, [])

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">Your SEO Dashboard</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-universal">
            Monitor all your SEO metrics in one place with our proprietary AI-powered dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rankings Dashboard */}
          <motion.div 
            style={{ y }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Rankings Overview</h3>
              </div>
              <span className="text-sm text-green-500 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +15.2%
              </span>
            </div>

            <div className="space-y-6">
              {[
                { label: "Top 3 Positions", value: "65%", color: "bg-green-500" },
                { label: "Top 10 Positions", value: "78%", color: "bg-blue-500" },
                { label: "Keyword Growth", value: "45%", color: "bg-purple-500" }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`ranking-bar h-full ${item.color}`}
                      data-value={item.value}
                      style={{width: 0}}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Recent Achievement</div>
              <div className="text-sm text-blue-700 mt-1">
                Reached #1 position for "AI SEO tools" keyword
              </div>
            </div>
          </motion.div>

          {/* Traffic Analysis */}
          <motion.div 
            style={{ y }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Traffic Sources</h3>
              </div>
            </div>

            <div className="relative flex justify-center mb-6">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="60"
                  stroke="#eee"
                  strokeWidth="24"
                  fill="none"
                />
                <circle
                  className="traffic-segment"
                  cx="96"
                  cy="96"
                  r="60"
                  stroke="#4F46E5"
                  strokeWidth="24"
                  fill="none"
                  strokeDasharray="377"
                  strokeDashoffset="94"
                />
                <circle
                  className="traffic-segment"
                  cx="96"
                  cy="96"
                  r="60"
                  stroke="#7C3AED"
                  strokeWidth="24"
                  fill="none"
                  strokeDasharray="377"
                  strokeDashoffset="188"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-bold metric-value" data-value="35">0</div>
                <div className="text-sm text-gray-500">Unique Visitors</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold metric-value" data-value="68">0</div>
                <div className="text-sm text-gray-500">Organic %</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold metric-value" data-value="26.18">0</div>
                <div className="text-sm text-gray-500">Bounce Rate</div>
              </div>
            </div>
          </motion.div>

          {/* Backlink Profile */}
          <motion.div 
            style={{ y }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <LinkIcon className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Backlink Growth</h3>
              </div>
              <span className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +12 new
              </span>
            </div>

            <div className="space-y-6">
              {[
                { domain: "techcrunch.com", da: 94, growth: "85%" },
                { domain: "forbes.com", da: 92, growth: "72%" },
                { domain: "github.com", da: 90, growth: "68%" }
              ].map((link, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-900 font-medium">{link.domain}</span>
                    <span className="text-gray-600">DA: {link.da}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="backlink-bar h-full bg-orange-500"
                      data-value={link.growth}
                      style={{width: 0}}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <div className="text-sm font-medium text-orange-900">Latest Backlink</div>
              <div className="text-sm text-orange-700 mt-1">
                New mention from TechCrunch article
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}