"use client"

import { useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import { ArrowUp, TrendingUp, BarChart2, Search, Target } from "lucide-react"

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

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
                <img
                  src="/rank-tracking-dashboard.png"
                  alt="SEO Rank Dashboard"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
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
            <div className="order-1 lg:order-2">
              <motion.div className="dashboard-preview" style={{ opacity, scale }}>
                <img
                  src="/traffic-analysis-dashboard.png"
                  alt="Traffic Analysis Dashboard"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24">
            <div>
              <motion.div className="dashboard-preview" style={{ opacity, scale }}>
                <img
                  src="/backlink-analysis-dashboard.png"
                  alt="Backlink Analysis Dashboard"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
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
