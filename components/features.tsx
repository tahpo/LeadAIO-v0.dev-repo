"use client"

import { useState } from "react"
import { Search, BarChart3, Zap, Target, Globe, FileText } from "lucide-react"

const features = [
  {
    id: "keyword-research",
    icon: Search,
    title: "Smart Keyword Research",
    description: "AI-powered keyword discovery that finds opportunities your competitors miss.",
    image: "/ai-keyword-dashboard.png",
  },
  {
    id: "rank-tracking",
    icon: BarChart3,
    title: "Real-time Rank Tracking",
    description: "Monitor your search positions across all major search engines with precision.",
    image: "/seo-rank-dashboard.png",
  },
  {
    id: "content-optimization",
    icon: FileText,
    title: "Content Optimization",
    description: "Create SEO-optimized content that ranks higher and converts better.",
    image: "/content-optimization-dashboard.png",
  },
  {
    id: "technical-seo",
    icon: Zap,
    title: "Technical SEO Audits",
    description: "Identify and fix technical issues that are holding back your rankings.",
    image: "/technical-seo-dashboard.png",
  },
  {
    id: "local-seo",
    icon: Globe,
    title: "Local SEO",
    description: "Dominate local search results and attract nearby customers.",
    image: "/local-seo-dashboard.png",
  },
  {
    id: "competitor-analysis",
    icon: Target,
    title: "Competitor Analysis",
    description: "Spy on your competitors and steal their best SEO strategies.",
    image: "/backlink-analysis-dashboard.png",
  },
]

export function Features() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-4">Everything you need to dominate search</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive AI-powered platform gives you all the tools to improve your search rankings and grow your
            business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-white shadow-lg border-l-4 border-indigo-600"
                      : "bg-white/50 hover:bg-white hover:shadow-md"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg ${
                        activeFeature === index ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Feature Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={features[activeFeature].image || "/placeholder.svg"}
                alt={features[activeFeature].title}
                className="w-full h-auto transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
