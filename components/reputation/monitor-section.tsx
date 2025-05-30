"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import anime from 'animejs'
import { Star, ThumbsUp, MessageSquare } from "lucide-react"

export function ReputationMonitor() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      loop: true
    });

    timeline
      .add({
        targets: '.review-card',
        translateY: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 800
      })
      .add({
        targets: '.sentiment-bar',
        width: (el) => el.getAttribute('data-width'),
        duration: 1000,
        delay: anime.stagger(100)
      })
      .add({
        targets: '.review-card, .sentiment-bar',
        opacity: 0,
        duration: 500,
        delay: 3000,
        complete: function(anim) {
          // Reset elements
          document.querySelectorAll('.review-card').forEach(el => {
            (el as HTMLElement).style.transform = 'translateY(-20px)';
            (el as HTMLElement).style.opacity = '0';
          });
          document.querySelectorAll('.sentiment-bar').forEach(el => {
            (el as HTMLElement).style.width = '0';
          });
        }
      });
  }, []);

  return (
    <section className="py-24 bg-[#111827] relative overflow-hidden mt-24">
      {/* Top wave */}
      <div className="absolute -top-24 left-0 right-0 h-24">
        <svg
          className="absolute bottom-0 w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#111827"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

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
              <h3 className="text-lg font-garnett">Live Review Feed</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Live</span>
              </div>
            </div>

            <div className="space-y-4">
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
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-white rounded-xl p-6 shadow-xl">
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
      
      {/* Bottom wave */}
      <div className="absolute -bottom-24 left-0 right-0 h-24">
        <svg
          className="absolute top-0 w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#111827"
            d="M0,32L48,48C96,64,192,96,288,122.7C384,149,480,171,576,154.7C672,139,768,85,864,69.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
    </section>
  )
}