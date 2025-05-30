"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, TrendingUp, Shield, Award } from "lucide-react"
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white"
    >
      {/* Floating Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </motion.div>

      <div className="container relative z-10 px-4 pt-32">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md mb-8">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-600 font-universal">Trusted by 10,000+ businesses</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-garnett mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 leading-tight">
              Build and Protect Your Online Reputation
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 font-universal">
              Take control of your online presence with our comprehensive reputation management platform. Monitor, improve, and maintain your brand's reputation across the web.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link href="/signup">Start free trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Schedule demo</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-garnett">Proactive Monitoring</h3>
                </div>
                <p className="text-gray-600 font-universal text-sm">Real-time alerts and monitoring across all major review platforms</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-garnett">Brand Protection</h3>
                </div>
                <p className="text-gray-600 font-universal text-sm">Advanced sentiment analysis and crisis prevention tools</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-garnett">Review Management</h3>
                </div>
                <p className="text-gray-600 font-universal text-sm">Streamlined review response and management system</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}