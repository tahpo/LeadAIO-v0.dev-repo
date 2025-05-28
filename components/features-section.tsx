"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, BarChart3, Zap, FileText } from "lucide-react"
import { AIOSearch } from "./features/aio-search"
import { ReputationReviews } from "./features/reputation-reviews"
import { PaidAds } from "./features/paid-ads"

const features = [
  {
    id: "ai-optimization",
    icon: Search,
    title: "Artificial Intelligence Optimization (AIO)",
    description: "Comprehensive AI-powered SEO optimization including keyword research, content optimization, and AI search engine optimization.",
    component: AIOSearch,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "reputation-management",
    icon: BarChart3,
    title: "Reputation Management",
    description: "Build and maintain your online reputation with real reviews, negative review management, and strategic content publishing.",
    component: ReputationReviews,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "paid-advertising",
    icon: FileText,
    title: "Paid Advertising",
    description: "Strategic PPC and AdWords campaigns that maximize ROI and drive qualified traffic to your business.",
    component: PaidAds,
    color: "from-green-500 to-emerald-500",
  },
]

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const lastScrollTime = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    smooth: 0.1
  })

  // Parallax effects for different elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50], {
    stiffness: 400,
    damping: 90,
    mass: 0.5
  })

  useEffect(() => {
    const handleScroll = (e: WheelEvent | TouchEvent) => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const isInSection = rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.7

      if (isInSection) {
        e.preventDefault()

        const now = Date.now()
        if (now - lastScrollTime.current < 50) return
        lastScrollTime.current = now

        let direction = 0
        if (e instanceof WheelEvent) {
          direction = e.deltaY > 0 ? 1 : -1
        } else if (e instanceof TouchEvent) {
          const touch = e.touches[0] || e.changedTouches[0]
          if (touch) {
            direction = touch.clientY < window.innerHeight / 2 ? -1 : 1
          }
        }

        setActiveFeature((prev) => {
          const newIndex = Math.max(0, Math.min(features.length - 1, prev + direction))
          setScrollProgress((newIndex / (features.length - 1)) * 100)

          if (newIndex === features.length - 1 && direction > 0) {
            setTimeout(() => {
              setIsLocked(false)
              const scrollAmount = e instanceof WheelEvent ? Math.abs(e.deltaY) : 30
              window.scrollBy(0, scrollAmount)
            }, 50)
          } else if (newIndex === 0 && direction < 0) {
            setTimeout(() => {
              setIsLocked(false)
              const scrollAmount = e instanceof WheelEvent ? Math.abs(e.deltaY) : 30
              window.scrollBy(0, -scrollAmount)
            }, 50)
          } else {
            setIsLocked(true)
          }

          return newIndex
        })
      } else {
        setIsLocked(false)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const isInSection = rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.7

      if (isInSection) {
        setIsLocked(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isLocked) {
        e.preventDefault()
      }
    }

    window.addEventListener("wheel", handleScroll, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleScroll)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [isLocked])

  return (
    <section id="features" ref={containerRef} className="relative overflow-hidden">
      {/* Top Wave Transition */}
      <div className="relative h-24 w-full overflow-hidden bg-white">
        <svg
          className="absolute bottom-0 w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#2d2d2d"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Main Content with Dark Background */}
      <div className="bg-[#2d2d2d] py-20">
        {/* Animated background elements */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400 to-red-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-2xl"></div>
        </motion.div>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 bg-gray-700 rounded-full text-sm font-universal text-gray-300 mb-4">
              All-in-one platform
            </span>
            <h2 className="text-3xl md:text-4xl font-garnett mb-4 text-white">
              Everything you need to dominate search
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto font-universal">
              Our comprehensive AI-powered platform gives you all the tools to improve your search rankings and grow
              your business.
            </p>
          </motion.div>

          <div ref={sectionRef} className="features-panel relative py-12 bg-[#222222] rounded-2xl shadow-xl">
            {/* Progress Indicator - Cleaner vertical bars */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20">
              <div className="flex flex-col items-center space-y-2">
                {features.map((_, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`w-1 h-12 rounded-full transition-all duration-500 ${
                        index === activeFeature
                          ? "bg-orange-500 shadow-lg"
                          : index < activeFeature
                            ? "bg-orange-300"
                            : "bg-gray-600"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pl-16">
              {/* Feature List */}
              <motion.div style={{ y: cardsY }} className="space-y-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.id}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-500 hover-lift ${
                        activeFeature === index
                          ? "bg-[#303030] shadow-lg border-l-4 border-orange-500 scale-105"
                          : "bg-[#282828] hover:bg-[#333333] hover:shadow-md border border-gray-800"
                      }`}
                      onClick={() => setActiveFeature(index)}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className={`p-3 rounded-lg transition-all duration-300 ${
                            activeFeature === index
                              ? `bg-gradient-to-r ${feature.color} text-white shadow-lg`
                              : "bg-gray-700 text-gray-400"
                          }`}
                          whileHover={{ rotate: 5 }}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg font-garnett mb-1 text-white">{feature.title}</h3>
                          <p className="text-gray-400 font-universal text-sm leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Feature Image */}
              <motion.div style={{ y: imageY }} className="relative mt-12">
                <div className="feature-image-container bg-[#404040]">
                  {features.map((feature, index) => {
                    const FeatureComponent = feature.component
                    return (
                      <motion.div
                        key={feature.id}
                        className="absolute inset-0 p-8"
                        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                        animate={{
                          opacity: activeFeature === index ? 1 : 0,
                          scale: activeFeature === index ? 1 : 0.8,
                          rotateY: activeFeature === index ? 0 : 90,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                          opacity: { duration: 0.3 },
                        }}
                        style={{
                          zIndex: activeFeature === index ? 10 : 0,
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <FeatureComponent />
                      </motion.div>
                    )
                  })}
                </div>

                {/* Feature indicator dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {features.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeFeature === index ? "bg-orange-500 w-6" : "bg-gray-600"
                      }`}
                      onClick={() => setActiveFeature(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Scroll hint */}
            {isLocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-4 right-6 text-sm text-gray-400 font-universal"
              >
                Scroll to explore features
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Wave Transition */}
      <div className="relative h-24 w-full overflow-hidden bg-[#2d2d2d]">
        <svg
          className="absolute top-0 w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,224L48,208C96,192,192,160,288,133.3C384,107,480,85,576,106.7C672,128,768,192,864,192C960,192,1056,128,1152,106.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
