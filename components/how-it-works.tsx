"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUp, TrendingUp, BarChart2, Search, Target, Link as LinkIcon, Users } from "lucide-react"
import anime from 'animejs'

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rankingRef = useRef<HTMLDivElement>(null)
  const trafficRef = useRef<HTMLDivElement>(null)
  const backlinkRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  useEffect(() => {
    // Animate ranking bars
    anime({
      targets: '.ranking-bar',
      width: (el) => el.getAttribute('data-value'),
      easing: 'easeOutElastic(1, .5)',
      duration: 1500,
      delay: anime.stagger(100)
    })

    // Animate traffic donut
    anime({
      targets: '.traffic-segment',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutQuad',
      duration: 1500,
      delay: anime.stagger(200)
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
    <section id="how-it-works" ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-universal text-gray-800 mb-4">
            Real-time insights
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4 text-gray-900">Your SEO dashboard</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Monitor all your SEO metrics in one place with our proprietary AI-powered dashboard
          </p>
        </div>

        <div className="section-panel bg-cream">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <motion.div className="dashboard-preview" style={{ opacity, scale }}>
                <div ref={rankingRef} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
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
                </div>
              </motion.div>
            </div>
            <div>
              <h3 className="text-2xl font-garnett mb-4">Track your rankings in real-time</h3>
              <p className="text-gray-600 mb-6 font-universal">
                Our AI constantly monitors your search positions across all major search engines, giving you
                up-to-the-minute data on how your website is performing.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="stat-card">
                  <div className="stat-value font-garnett">+43%</div>
                  <div className="stat-label font-universal">Keyword improvement</div>
                  <div className="stat-trend stat-trend-up font-universal">
                    <ArrowUp className="h-4 w-4 mr-1" /> Last 30 days
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-value font-garnett">12</div>
                  <div className="stat-label font-universal">Top 3 rankings</div>
                  <div className="stat-trend stat-trend-up font-universal">
                    <TrendingUp className="h-4 w-4 mr-1" /> +5 this month
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24">
            <div className="order-2 lg:order-1">
              <motion.div className="dashboard-preview" style={{ opacity, scale }}>
                <div ref={trafficRef} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
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
                      <div className="text-3xl font-bold">35%</div>
                      <div className="text-sm text-gray-500">Organic Traffic</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-garnett mb-4">Analyze your traffic sources</h3>
              <p className="text-gray-600 mb-6 font-universal">
                See exactly where your visitors are coming from and which keywords are driving the most valuable traffic
                to your site.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="stat-card">
                  <div className="stat-value font-garnett">215%</div>
                  <div className="stat-label font-universal">Organic traffic growth</div>
                  <div className="stat-trend stat-trend-up font-universal">
                    <BarChart2 className="h-4 w-4 mr-1" /> Year over year
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-value font-garnett">4.2%</div>
                  <div className="stat-label font-universal">Conversion rate</div>
                  <div className="stat-trend stat-trend-up font-universal">
                    <TrendingUp className="h-4 w-4 mr-1" /> +1.3% increase
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24">
            <div>
              <motion.div className="dashboard-preview" style={{ opacity, scale }}>
                <div ref={backlinkRef} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <LinkIcon className="h-5 w-5 text-orange-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Backlink Growth</h3>
                    </div>
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
                </div>
              </motion.div>
            </div>
            <div>
              <h3 className="text-2xl font-garnett mb-4">Monitor your backlink profile</h3>
              <p className="text-gray-600 mb-6 font-universal">
                Track your backlinks, discover new link opportunities, and keep an eye on your competitors' link
                building strategies.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="stat-card">
                  <div className="stat-value font-garnett">1,240</div>
                  <div className="stat-label font-universal">Quality backlinks</div>
                  <div className="stat-trend stat-trend-up font-universal">
                    <Search className="h-4 w-4 mr-1" /> 87 new this month
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-value font-garnett">68</div>
                  <div className="stat-label font-universal">Domain authority</div>
                  <div className="stat-trend stat-trend-up font-universal">
                    <Target className="h-4 w-4 mr-1" /> +12 points
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}