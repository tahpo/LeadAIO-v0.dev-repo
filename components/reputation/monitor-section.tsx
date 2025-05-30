"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, MessageSquare, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ReputationMonitor() {
  const [reviews] = useState([
    { rating: 5, text: "Amazing service! They really helped improve our online presence.", author: "Sarah M." },
    { rating: 5, text: "The AI-powered responses are incredibly natural. Great tool!", author: "Michael R." },
    { rating: 4, text: "Very effective for managing our brand reputation across platforms.", author: "David K." },
  ])

  return (
    <section className="relative py-24 bg-[#111827] overflow-hidden">
      {/* Top Wave */}
      <div className="absolute -top-1 left-0 right-0 h-16">
        <svg className="absolute bottom-0 w-full h-16" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1440 54V0C1440 0 1082.5 54 720 54C357.5 54 0 0 0 0V54H1440Z" fill="white"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm font-medium mb-4">
            Real-time Monitoring
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4 text-white">
            Monitor Your Online Reputation
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-universal">
            Track and respond to reviews across all major platforms in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white/5 backdrop-blur border-gray-800">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 font-universal">{review.text}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 font-universal">{review.author}</span>
                  <span className="text-sm text-indigo-400 font-universal">2 hours ago</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
          <Card className="p-6 bg-white/5 backdrop-blur border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="h-5 w-5 text-indigo-400" />
              <h3 className="text-lg font-garnett text-white">Response Rate</h3>
            </div>
            <div className="text-3xl font-garnett text-white mb-2">98.5%</div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: "98.5%" }}></div>
            </div>
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-garnett text-white">Sentiment Score</h3>
            </div>
            <div className="text-3xl font-garnett text-white mb-2">92/100</div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute -bottom-1 left-0 right-0 h-16">
        <svg className="absolute bottom-0 w-full h-16" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0C0 0 357.5 54 720 54C1082.5 54 1440 0 1440 0V54H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}