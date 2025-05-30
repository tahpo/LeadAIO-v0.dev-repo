"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AIOHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-32 overflow-hidden">
      {/* Gradient Background with Noise */}
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
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-[20%] w-64 h-64 rounded-full bg-orange-400 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-20 right-[20%] w-64 h-64 rounded-full bg-orange-300 blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
              AI-Powered SEO
            </span>
            <h1 className="text-5xl md:text-6xl font-garnett mb-8 leading-[1.2] text-gray-900">
              Transform Your Search Rankings with AI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 font-universal">
              Our advanced AI algorithms analyze your website, optimize your content, and boost your search rankings automatically. Get more traffic, leads, and revenue with LeadAIO.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
              <Link href="/signup">
                Get started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-medium">
              <Link href="/contact">Talk to an expert</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg className="w-full h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#111827" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  )
}