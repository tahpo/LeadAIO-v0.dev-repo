"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ReputationHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
      {/* Gradient Background with Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/80 via-purple-100/50 to-white">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          opacity: '0.15'
        }} />
      </div>
      
      {/* Main content */}
      <div className="relative container mx-auto px-4 z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-8">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Trusted by 10,000+ businesses
              </span>
            </div>
            
            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-garnett mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 leading-tight">
              Build and Protect Your Online Reputation
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-universal">
              Our advanced AI algorithms analyze your online presence, monitor reviews, and help you build a stellar reputation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link href="/signup">Start free trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Schedule demo</Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-garnett">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600 font-universal">Average rating increase</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-2xl font-garnett">98%</span>
                </div>
                <p className="text-sm text-gray-600 font-universal">Brand protection rate</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-2xl font-garnett">3.2x</span>
                </div>
                <p className="text-sm text-gray-600 font-universal">Revenue growth</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}