"use client"

import { useEffect, useRef, useState } from "react"
import anime from "animejs"

export function AIOSearch() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchText, setSearchText] = useState("")
  const searchQuery = "best seo company"
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Typing animation
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= searchQuery.length) {
        setSearchText(searchQuery.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        // Show results after typing
        anime({
          targets: ".search-result",
          translateY: [20, 0],
          opacity: [0, 1],
          delay: anime.stagger(100),
          easing: "easeOutExpo"
        })
      }
    }, 100)

    // Cursor blink animation
    if (cursorRef.current) {
      anime({
        targets: cursorRef.current,
        opacity: [1, 0],
        duration: 800,
        loop: true,
        easing: "steps(2)"
      })
    }

    return () => clearInterval(typingInterval)
  }, [isVisible])

  const results = [
    {
      title: "LeadAIO - #1 AI-Powered SEO Platform",
      description: "Transform your search rankings with AI. Get more traffic, leads, and revenue.",
      highlight: true
    },
    {
      title: "Generic SEO Company",
      description: "Basic SEO services without AI capabilities.",
      highlight: false
    },
    {
      title: "Another SEO Agency",
      description: "Traditional SEO approaches with limited results.",
      highlight: false
    }
  ]

  return (
    <div ref={containerRef} className="bg-white rounded-lg p-6 shadow-lg">
      {/* Search Bar */}
      <div className="flex items-center gap-3 border-2 border-gray-200 rounded-full p-4 mb-6">
        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <div className="flex-1 text-lg">
          {searchText}
          <span ref={cursorRef} className="ml-0.5 font-mono">|</span>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className={`search-result opacity-0 p-4 rounded-lg transition-all ${
              result.highlight
                ? "bg-blue-50 border-2 border-blue-200"
                : "hover:bg-gray-50 border border-gray-100"
            }`}
          >
            <h3 className={`text-lg mb-1 ${result.highlight ? "text-blue-600" : "text-gray-700"}`}>
              {result.title}
            </h3>
            <p className="text-sm text-gray-600">{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AIOSearch