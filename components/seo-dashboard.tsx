import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import anime from 'animejs'
import { Search, BarChart2, Link as LinkIcon } from 'lucide-react'

export function SEODashboard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    // Animate the metrics when they come into view
    const timeline = anime.timeline({
      targets: '.metric-value',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
      duration: 1200
    })

    // Add chart animations
    timeline.add({
      targets: '.chart-bar',
      scaleY: [0, 1],
      delay: anime.stagger(50),
      easing: 'easeOutElastic(1, .5)',
      duration: 1500
    })

    // Add link animations
    timeline.add({
      targets: '.backlink-item',
      translateX: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      easing: 'easeOutQuad',
      duration: 800
    })
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Keyword Rankings */}
      <motion.div 
        style={{ y }}
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Search className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Keyword Rankings</h3>
          </div>
          <span className="text-sm text-green-500">+12.5%</span>
        </div>

        <div className="space-y-4">
          {[
            { position: "1-3", count: 24, color: "bg-green-500" },
            { position: "4-10", count: 36, color: "bg-blue-500" },
            { position: "11-20", count: 52, color: "bg-yellow-500" }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Position {item.position}</span>
                <span className="font-medium">{item.count} keywords</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`chart-bar h-full ${item.color} origin-left`} 
                  style={{width: `${(item.count/100) * 100}%`}}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Traffic Analysis */}
      <motion.div 
        style={{ y }}
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart2 className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Traffic Analysis</h3>
          </div>
          <span className="text-sm text-green-500">+28.4%</span>
        </div>

        <div className="space-y-4">
          <div className="metric-value">
            <div className="text-3xl font-bold">12,486</div>
            <div className="text-sm text-gray-500">Monthly organic visits</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="metric-value">
              <div className="text-xl font-semibold">4.2%</div>
              <div className="text-sm text-gray-500">Conversion rate</div>
            </div>
            <div className="metric-value">
              <div className="text-xl font-semibold">2:45</div>
              <div className="text-sm text-gray-500">Avg. session</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Backlink Profile */}
      <motion.div 
        style={{ y }}
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <LinkIcon className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Backlink Profile</h3>
          </div>
          <span className="text-sm text-green-500">+8 new</span>
        </div>

        <div className="space-y-4">
          {[
            { domain: "techcrunch.com", da: 94, type: "News" },
            { domain: "forbes.com", da: 92, type: "News" },
            { domain: "github.com", da: 90, type: "Tech" }
          ].map((link, i) => (
            <div key={i} className="backlink-item flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{link.domain}</div>
                <div className="text-sm text-gray-500">{link.type}</div>
              </div>
              <div className="text-sm font-medium">
                DA: {link.da}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}