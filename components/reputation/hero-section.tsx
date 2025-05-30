"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { GradientBackground } from "@/components/ui/gradient-background"

export function ReputationHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-24 overflow-hidden">
      <GradientBackground 
        gradientType="radial-gradient"
        gradientOrigin="center"
        colors={[
          { color: 'rgba(79, 70, 229, 0.2)', stop: '0%' },
          { color: 'rgba(236, 72, 153, 0.1)', stop: '50%' },
          { color: 'rgba(255, 255, 255, 1)', stop: '100%' }
        ]}
        enableNoise={true}
        noisePatternAlpha={20}
        noiseIntensity={0.5}
      />
      
      {/* Main content */}
      <div className="relative container mx-auto px-4 z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-garnett mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 leading-tight">
              Build and Protect Your Online Reputation
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-universal">
              Our advanced AI algorithms analyze your online presence, monitor reviews, and help you build a stellar reputation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}