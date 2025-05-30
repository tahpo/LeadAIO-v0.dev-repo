"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ContainerScroll } from "./container-scroll"

// Define the words arrays that were missing
const words1 = ["business", "startup", "brand", "company"]
const words2 = ["growth", "success", "results", "leads"]

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden bg-white">
      <div className="section-container relative z-10">
        <div className="section-panel bg-[#fdfcfa]">
          <ContainerScroll
            titleComponent={
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-6"
                >
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                    AI-Powered SEO
                  </span>
                  <h1 className="text-5xl md:text-6xl font-garnett mb-8 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Transform Your Search Rankings with AI
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto font-universal">
                    Our advanced AI algorithms analyze your website, optimize your content, and boost your search rankings automatically. Get more traffic, leads, and revenue with LeadAIO.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                >
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/signup">
                      Get started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contact">Talk to an expert</Link>
                  </Button>
                </motion.div>
              </div>
            }
          >
            <div className="relative w-full h-full">
              {/* Dashboard Preview */}
              <div className="relative w-full h-full bg-[#111827] rounded-lg p-4">
                {/* Your existing dashboard content */}
                <div className="grid grid-cols-12 gap-4 h-full">
                  {/* Add your dashboard components here */}
                </div>
              </div>
            </div>
          </ContainerScroll>
        </div>
      </div>
    </section>
  )
}