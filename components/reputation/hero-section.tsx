"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Shield, TrendingUp } from "lucide-react"
import { GradientBackground } from "@/components/ui/gradient-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ReputationHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
      {/* Animated Background Elements */}
      <GradientBackground
        gradientType="radial-gradient"
        gradientSize="150% 150%"
        gradientOrigin="center"
        colors={[
          { color: 'rgba(79, 70, 229, 0.15)', stop: '0%' },
          { color: 'rgba(124, 58, 237, 0.1)', stop: '45%' },
          { color: 'rgba(255, 255, 255, 1)', stop: '100%' }
        ]}
        enableNoise={true}
        noiseIntensity={0.5}
        noisePatternAlpha={15}
      />

      {/* Main content */}
      <div className="relative container mx-auto px-4 z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm mb-6">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-600 font-universal">Trusted by 10,000+ businesses</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-garnett mb-6 text-gray-900 leading-[1.1]">
              Build and Protect Your{" "}
              <span className="relative">
                Online Reputation
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 25" fill="none">
                  <path d="M 0 20 Q 100 0 200 20 Q 300 40 400 20" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round"/>
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
              Our advanced AI algorithms analyze your online presence, monitor reviews, and help you build a stellar reputation that drives growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link href="/signup">Start free trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Schedule demo</Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-lg font-garnett">Review Monitoring</h3>
                </div>
                <p className="text-gray-600 font-universal text-sm">Real-time alerts and monitoring across all major review platforms</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-garnett">Brand Protection</h3>
                </div>
                <p className="text-gray-600 font-universal text-sm">Advanced sentiment analysis and crisis prevention tools</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-violet-600" />
                  <h3 className="text-lg font-garnett">Growth Analytics</h3>
                </div>
                <p className="text-gray-600 font-universal text-sm">Track your reputation growth and ROI over time</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}