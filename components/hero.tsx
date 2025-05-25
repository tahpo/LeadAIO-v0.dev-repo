"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0)
  const words = ["rankings", "traffic", "leads", "revenue"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-60 animate-float"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-60 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-60 animate-float"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold font-manrope mb-6 leading-tight">
            AI-powered SEO that drives{" "}
            <span className="relative">
              <span className="gradient-text">{words[currentWord]}</span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop guessing what works. LeadAIO uses advanced AI to optimize your search presence, generate quality leads,
            and grow your business automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4">
              <Link href="/signup">
                Start free trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4">
              <Link href="/demo">
                <Play className="mr-2 h-5 w-5" />
                Watch demo
              </Link>
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-pulse-glow">
              <img src="/ai-seo-dashboard.png" alt="LeadAIO Dashboard" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
