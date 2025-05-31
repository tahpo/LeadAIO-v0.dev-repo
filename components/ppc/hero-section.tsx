"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PPCHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Gradient Background with Noise */}
      <GradientBackground
        gradientOrigin="bottom-middle"
        colors={[
          { color: 'rgba(79,70,229,0.15)', stop: '0%' },
          { color: 'rgba(109,40,217,0.15)', stop: '45%' },
          { color: 'rgba(147,51,234,0.15)', stop: '100%' }
        ]}
        noiseIntensity={1.0}
        noisePatternSize={90}
        noisePatternRefreshInterval={2}
        noisePatternAlpha={20}
      />

      <div className="relative container mx-auto px-4 z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-8">
              <span className="text-gray-700 font-universal font-medium">AI-Powered PPC Management</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-garnett mb-8 text-gray-900 leading-[1.1]">
              Transform Your{" "}
              <span className="relative">
                Ad Performance
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
              Our AI optimizes your PPC campaigns in real-time, maximizing ROI and delivering qualified leads while minimizing wasted ad spend.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
                <Link href="/signup">Get started <span className="ml-1">→</span></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-medium">
                <Link href="/contact">Schedule demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom wave - adjusted to prevent cutoff */}
      <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="#f3f4f6"
          />
        </svg>
      </div>
    </section>
  )
}