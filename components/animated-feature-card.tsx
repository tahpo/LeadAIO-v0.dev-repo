"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import anime from "animejs"

interface AnimatedFeatureCardProps {
  type: "aio" | "reputation" | "advertising"
}

export function AnimatedFeatureCard({ type }: AnimatedFeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { margin: "-100px" })

  // Track animation state
  const animationRef = useRef<anime.AnimeInstance | null>(null)

  useEffect(() => {
    if (!cardRef.current) return

    if (type === "aio") {
      // Clear any existing animation
      if (animationRef.current) {
        animationRef.current.pause()
      }

      // Create new timeline
      animationRef.current = anime.timeline({
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuad',
        autoplay: true
      })

      animationRef.current
        .add({
          targets: cardRef.current.querySelectorAll(".search-element"),
          delay: anime.stagger(600),
          translateY: [-20, 0],
          opacity: [0, 1],
          duration: 1200,
          easing: "easeOutElastic(1, .5)"
        })
        .add({
          targets: cardRef.current.querySelector(".search-text"),
          width: [0, function(el) { return el.scrollWidth; }],
          duration: 800,
          delay: 200,
          easing: "linear"
        })
        .add({
          targets: cardRef.current.querySelectorAll(".result"),
          translateY: [-20, 0],
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(200)
        })
        .add({ 
          targets: cardRef.current.querySelectorAll("*"),
          opacity: [1, 0],
          duration: 800,
          delay: 2000,
          complete: () => {
            // Reset elements for next loop
            anime.set([
              cardRef.current.querySelectorAll(".search-element"),
              cardRef.current.querySelector(".search-text"),
              cardRef.current.querySelectorAll(".result")
            ], {
              translateY: 0,
              opacity: 0,
              width: 0
            });
          }
        })
    }

    if (type === "reputation") {
      const starsAnimation = anime({
        targets: cardRef.current.querySelectorAll(".review-star"),
        scale: [0.5, 1],
        rotate: [0, 360],
        delay: anime.stagger(100),
        duration: 1200,
        loop: true,
        direction: 'alternate',
        easing: "easeOutElastic(1, .5)"
      })

      const cardsAnimation = anime({
        targets: cardRef.current.querySelectorAll(".review-card"),
        translateY: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 1200,
        loop: true,
        direction: 'alternate',
        easing: "easeOutElastic(1, .5)"
      })

      animationRef.current = starsAnimation
    }

    if (type === "advertising") {
      animationRef.current = anime({
        targets: cardRef.current.querySelectorAll(".ppc-element"),
        translateY: [-20, 0],
        scale: [0.9, 1],
        opacity: [0.5, 1],
        delay: anime.stagger(200),
        duration: 1200,
        loop: true,
        direction: 'alternate',
        easing: "easeOutElastic(1, .5)",
        complete: (anim) => {
          // Reset for smooth loop
          anime.set(anim.animatables.map(a => a.target), {
            translateY: -20,
            scale: 0.9,
            opacity: 0.5
          });
        }
      })
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.pause()
      }
    }
  }, [isInView, type])

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-xl p-6 shadow-lg h-[300px] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {type === "aio" && (
        <div className="space-y-4">
          <div className="search-element bg-gray-100 rounded-full p-3 flex items-center">
            <div className="w-4 h-4 bg-gray-400 rounded-full mr-3" />
            <div className="flex-1 h-6 bg-white rounded-full overflow-hidden flex items-center px-3">
              <div className="relative flex items-center w-full">
                <span className="search-text text-sm text-gray-600 whitespace-nowrap\" style={{ width: 0 }}>
                  find the best seo company
                </span>
                <span className="cursor absolute text-gray-600 animate-blink" style={{ left: 'calc(var(--text-width, 0) * 1px)' }}>|</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="result bg-blue-50 rounded-lg p-3 opacity-0">
              <div className="text-blue-600 font-medium">LeadAIO.com</div>
              <div className="text-sm text-gray-600">The #1 AI-Powered SEO Platform</div>
            </div>
            <div className="result bg-gray-50 rounded-lg p-3 opacity-0">
              <div className="text-gray-600">Competitor A</div>
              <div className="text-sm text-gray-400">Just another SEO company</div>
            </div>
            <div className="result bg-gray-50 rounded-lg p-3 opacity-0">
              <div className="text-gray-600">Competitor B</div>
              <div className="text-sm text-gray-400">Basic SEO services</div>
            </div>
          </div>
        </div>
      )}

      {type === "reputation" && (
        <div className="space-y-4">
          <div className="flex space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="review-star w-6 h-6 text-yellow-400 opacity-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="review-card bg-gray-50 rounded-lg p-3 opacity-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/4 mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === "advertising" && (
        <div className="space-y-4">
          <div className="ppc-element bg-yellow-50 rounded-lg p-3 opacity-0">
            <div className="text-xs text-gray-400 mb-1">Sponsored</div>
            <div className="text-blue-600 font-medium">LeadAIO - AI-Powered SEO Platform</div>
            <div className="text-sm text-gray-600">Transform your search rankings with AI technology</div>
          </div>
          
          {[...Array(2)].map((_, i) => (
            <div key={i} className="ppc-element bg-gray-50 rounded-lg p-3 opacity-0">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mt-2" />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// Add cursor blink animation
const styles = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  
  .animate-blink {
    animation: blink 0.7s infinite;
  }
  
  .search-text {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
  }
  
  .cursor {
    transition: left 0.8s linear;
  }
`

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style")
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}