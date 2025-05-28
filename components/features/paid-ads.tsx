```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import anime from "animejs"

export function PaidAds() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

    // Animate metrics counting up
    anime({
      targets: ".metric-value",
      innerHTML: (el: HTMLElement) => [0, el.getAttribute("data-value")],
      round: 1,
      duration: 2000,
      easing: "easeOutExpo"
    })

    // Animate progress bars
    anime({
      targets: ".progress-bar",
      width: (el: HTMLElement) => el.getAttribute("data-width"),
      duration: 1500,
      delay: anime.stagger(100),
      easing: "easeOutElastic(1, .6)"
    })

    // Animate sponsored tag
    anime({
      targets: ".sponsored-tag",
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 500
    })
  }, [isVisible])

  return (
    <div ref={containerRef} className="bg-white rounded-lg p-6 shadow-lg">
      {/* PPC Performance Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600 mb-1">Click-through Rate</div>
          <div className="text-2xl font-bold metric-value" data-value="8.5">0</div>
          <div className="text-xs text-blue-600">% Average CTR</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600 mb-1">Conversion Rate</div>
          <div className="text-2xl font-bold metric-value" data-value="12.3">0</div>
          <div className="text-xs text-green-600">% Conversion</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm text-purple-600 mb-1">ROI</div>
          <div className="text-2xl font-bold metric-value" data-value="324">0</div>
          <div className="text-xs text-purple-600">% Return</div>
        </div>
      </div>

      {/* Sponsored Ad Preview */}
      <div className="border border-gray-200 rounded-lg p-4 relative">
        <div className="sponsored-tag opacity-0 absolute -top-3 left-4 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
          Sponsored
        </div>
        <h3 className="text-lg font-medium mb-1">LeadAIO - AI-Powered SEO Platform</h3>
        <p className="text-sm text-gray-600 mb-3">
          Transform your search rankings with AI. Get more traffic, leads, and revenue. Start free trial today!
        </p>
        <div className="flex gap-2">
          <div className="text-xs text-gray-500">www.leadaio.com</div>
          <div className="text-xs text-gray-500">|</div>
          <div className="text-xs text-blue-600">Ad</div>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="mt-6 space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Campaign Performance</span>
            <span className="text-green-600">92%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="progress-bar h-full bg-green-500" data-width="92%"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Quality Score</span>
            <span className="text-blue-600">88%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="progress-bar h-full bg-blue-500" data-width="88%"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
```