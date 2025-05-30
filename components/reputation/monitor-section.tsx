"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import anime from 'animejs'
import { Star, ThumbsUp, MessageSquare } from "lucide-react"

export function ReputationMonitor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    
    // Animation for review cards
    anime({
      targets: '.review-card',
      translateY: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(200),
      duration: 800,
      easing: 'easeOutExpo',
      loop: true,
      direction: 'alternate',
      loopComplete: function(anim) {
        // Reset elements for next loop
        document.querySelectorAll('.review-card').forEach(el => {
          (el as HTMLElement).style.transform = 'translateY(-20px)';
          (el as HTMLElement).style.opacity = '0';
        });
      },
      loopBegin: function(anim) {
        // Prepare for next animation
        document.querySelectorAll('.review-card').forEach(el => {
          (el as HTMLElement).style.transform = 'translateY(-20px)';
          (el as HTMLElement).style.opacity = '0';
        });
      }
    });
    
    // Animate stars
    anime({
      targets: '.review-star',
      scale: [0.5, 1],
      rotate: 360,
      delay: anime.stagger(100),
      duration: 800,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad',
      endDelay: 1000
    });
    
    // Animation for sentiment bars
    anime({
      targets: '.sentiment-bar',
      width: (el) => el.getAttribute('data-width'),
      duration: 1000,
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
      loop: true,
      direction: 'alternate',
      loopBegin: function(anim) {
        document.querySelectorAll('.sentiment-bar').forEach(el => {
          (el as HTMLElement).style.width = '0';
        });
      }
    });
  }, [isInView]);

  return (
    <section ref={containerRef} className="py-24 bg-indigo-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
            Monitor
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            Real-time Reputation Monitoring
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Track and analyze your online reputation across all major platforms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Live Monitor */}
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-garnett">Review Monitoring</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Live</span>
              </div>
            </div>

            <div className="space-y-4 min-h-[250px]">
              {[
                { platform: "Google", rating: 5, text: "Excellent service! Very professional team." },
                { platform: "Yelp", rating: 4, text: "Great experience overall, would recommend." },
                { platform: "Facebook", rating: 5, text: "Top notch customer service!" }
              ].map((review, i) => (
                <div key={i} className="review-card opacity-0 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{review.platform}</span>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current review-star" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-white rounded-xl p-6 shadow-xl min-h-[250px]">
            <h3 className="text-lg font-garnett mb-6">Sentiment Analysis</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">Positive</span>
                  </div>
                  <span className="text-sm text-gray-500">85%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="sentiment-bar h-full bg-green-500 rounded-full" data-width="85%"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">Neutral</span>
                  </div>
                  <span className="text-sm text-gray-500">10%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="sentiment-bar h-full bg-blue-500 rounded-full" data-width="10%"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-red-500 rotate-180" />
                    <span className="text-sm font-medium">Negative</span>
                  </div>
                  <span className="text-sm text-gray-500">5%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="sentiment-bar h-full bg-red-500 rounded-full" data-width="5%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}