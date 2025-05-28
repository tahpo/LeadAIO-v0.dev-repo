```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"
import anime from "animejs"

export function ReputationReviews() {
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

    // Animate stars filling
    anime({
      targets: ".star-fill",
      width: ["0%", "100%"],
      delay: anime.stagger(200),
      duration: 1500,
      easing: "easeOutElastic(1, .6)"
    })

    // Animate reviews appearing
    anime({
      targets: ".review-card",
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(150),
      duration: 800,
      easing: "easeOutExpo"
    })
  }, [isVisible])

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "LeadAIO transformed our online presence. Our traffic increased by 215% in just 3 months!",
      date: "2 days ago"
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "The AI-powered insights are incredible. We're now ranking #1 for our main keywords.",
      date: "1 week ago"
    },
    {
      name: "Emily Thompson",
      rating: 5,
      text: "Best SEO platform we've ever used. The results speak for themselves.",
      date: "2 weeks ago"
    }
  ]

  return (
    <div ref={containerRef} className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-1">4.9</h3>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="relative w-5 h-5">
                <Star className="w-5 h-5 text-gray-200" />
                <div className="star-fill absolute inset-0 overflow-hidden w-0">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Based on 1,248 reviews
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="review-card opacity-0 p-4 border border-gray-100 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">{review.name}</div>
                <div className="flex gap-0.5">
                  {Array(review.rating).fill(null).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-500">{review.date}</div>
            </div>
            <p className="text-gray-600 text-sm">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```