"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function HeroSection() {
  const [currentWord1, setCurrentWord1] = useState(0)
  const [currentWord2, setCurrentWord2] = useState(0)
  const words1 = ["business", "startup", "agency", "brand", "expert"]
  const words2 = ["rankings", "results", "traffic", "dominance", "growth"]

  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentWord1((prev) => (prev + 1) % words1.length)
    }, 3000)

    const interval2 = setInterval(() => {
      setCurrentWord2((prev) => (prev + 1) % words2.length)
    }, 3000)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
    }
  }, [])

  // Find the longest word in each array to set fixed widths - increased multiplier for better spacing
  const longestWord1 = words1.reduce((a, b) => (a.length > b.length ? a : b), "")
  const longestWord2 = words2.reduce((a, b) => (a.length > b.length ? a : b), "")

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-white">
      <div className="section-container relative z-10">
        <div className="section-panel bg-cream">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl mb-6 leading-tight text-gray-900 font-garnett">
              The SEO that every{" "}
              <span
                className="relative inline-block overflow-hidden"
                style={{
                  minWidth: `${longestWord1.length * 0.7}em`, // Increased from 0.6 to 0.7
                  height: "1.2em",
                  verticalAlign: "bottom",
                }}
              >
                {/* Static underline that always stays - made slightly thicker */}
                <span
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    backgroundColor: "#ff4d00",
                    height: "4px", // Increased from 2px to 3px
                  }}
                />
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={words1[currentWord1]}
                    className="absolute inset-0 flex items-center justify-center font-garnett"
                    style={{
                      color: "#ff4d00",
                    }}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {words1[currentWord1]}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              needs for winning{" "}
              <span
                className="relative inline-block overflow-hidden"
                style={{
                  minWidth: `${longestWord2.length * 0.7}em`, // Increased from 0.6 to 0.7
                  height: "1.2em",
                  verticalAlign: "bottom",
                }}
              >
                {/* Static underline that always stays - made slightly thicker */}
                <span
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    backgroundColor: "#ff4d00",
                    height: "4px", // Increased from 2px to 3px
                  }}
                />
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={words2[currentWord2]}
                    className="absolute inset-0 flex items-center justify-center font-garnett"
                    style={{
                      color: "#ff4d00",
                    }}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {words2[currentWord2]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-universal">
              Stop guessing what works. LeadAIO uses advanced AI to optimize your search presence, generate quality
              leads, and grow your business automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href="/signup" className="index-button index-button-primary flex items-center justify-center gap-2">
                Get started <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Dashboard Preview - Stretched wider to fit spacing */}
          <div className="relative w-full max-w-6xl mx-auto mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-xl overflow-hidden shadow-2xl mx-auto"
            >
              <img
                src="/keyword-research-dashboard.png"
                alt="LeadAIO Keyword Research Dashboard"
                className="w-full h-auto relative z-10 block mx-auto"
                style={{
                  maxHeight: "550px",
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
