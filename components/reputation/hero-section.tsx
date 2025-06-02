"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, TrendingUp, Shield, Award } from "lucide-react"
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ReputationHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Sunset Glow Background with Noise */}
      <GradientBackground
        gradientOrigin="bottom-middle"
        colors={[
          { color: 'rgba(245,87,2,0.15)', stop: '10.5%' },
          { color: 'rgba(245,120,2,0.15)', stop: '16%' },
          { color: 'rgba(245,140,2,0.15)', stop: '17.5%' },
          { color: 'rgba(245,170,100,0.15)', stop: '25%' },
          { color: 'rgba(238,174,202,0.15)', stop: '40%' },
          { color: 'rgba(202,179,214,0.15)', stop: '65%' },
          { color: 'rgba(148,201,233,0.15)', stop: '100%' }
        ]}
        noiseIntensity={1.0}
        noisePatternSize={90}
        noisePatternRefreshInterval={2}
        noisePatternAlpha={20}
      />

      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </motion.div>

      <div className="relative container mx-auto px-4 z-10 pt-8">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-8">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
              <span className="text-gray-700 font-universal font-medium">Trusted by 10,000+ businesses</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-garnett mb-8 text-gray-900 leading-[1.1]">
              Build and Protect Your{" "}
              <span className="relative">
                Online Reputation
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 400 25" fill="none">
                  <path d="M 0 20 Q 100 0 200 20 Q 300 40 400 20" stroke="url(#gradient)" strokeWidth="5" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-universal">
              Take control of your online presence with our comprehensive reputation management platform. 
              Monitor, improve, and maintain your brand's reputation across the web.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
                <Link href="/signup">Get started <span className="ml-1">→</span></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-medium">
                <Link href="/contact">Schedule demo</Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8 h-full">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-garnett">Proactive Monitoring</h3>
                </div>
                <p className="text-gray-600 font-universal text-sm h-[48px] pb-1">Real-time alerts and monitoring across all major review platforms and social media</p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-garnett">Quality Protection</h3>
                </div>
                <p className="text-gray-600 font-universal text-sm h-[48px] pb-1">Advanced sentiment analysis and crisis prevention tools to safeguard your reputation</p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-garnett">Review Management</h3>
                </div>
                <p className="text-gray-600 font-universal text-sm h-[48px] pb-1">Streamlined review response and management system with AI-powered suggestions</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}