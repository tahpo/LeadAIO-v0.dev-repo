"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, MessageSquare, BarChart2, Globe, Shield, Users, TrendingUp, Award } from "lucide-react"

const features = [
  {
    icon: Star, 
    title: "Review Monitoring", 
    description: "Track and analyze reviews across all major platforms in real-time.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100",
  },
  {
    icon: MessageSquare,
    title: "Smart Response",
    description: "AI-powered response suggestions for reviews and mentions.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100",
  },
  {
    icon: BarChart2,
    title: "Sentiment Analysis",
    description: "Advanced AI analysis of customer sentiment and trends.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100",
  },
  {
    icon: Globe,
    title: "Web Monitoring",
    description: "Track mentions and coverage across the entire web.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100",
  },
  {
    icon: Shield,
    title: "Brand Protection",
    description: "Proactive alerts and crisis management tools.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100",
  },
  {
    icon: Users,
    title: "Customer Insights",
    description: "Deep analytics into customer feedback and preferences.",
    className: "col-span-1 md:col-span-2 bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100",
  },
]

export function ReputationFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-full text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            Complete Reputation Management Suite
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            Everything you need to build, monitor, and maintain your online reputation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Review Monitoring */}
          <div className="bg-yellow-50/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-600" />
              <h3 className="font-garnett text-lg">Review Monitoring</h3>
            </div>
            <p className="text-gray-800 font-universal text-sm">Track and analyze reviews across all major platforms in real-time.</p>
          </div>

          {/* Smart Response */}
          <div className="bg-blue-50/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <h3 className="font-garnett text-lg">Smart Response</h3>
            </div>
            <p className="text-gray-800 font-universal text-sm">AI-powered response suggestions for reviews and mentions.</p>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-purple-50/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="h-5 w-5 text-purple-600" />
              <h3 className="font-garnett text-lg">Sentiment Analysis</h3>
            </div>
            <p className="text-gray-800 font-universal text-sm">Advanced AI analysis of customer sentiment and trends.</p>
          </div>

          {/* Web Monitoring */}
          <div className="bg-green-50/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-green-600" />
              <h3 className="font-garnett text-lg">Web Monitoring</h3>
            </div>
            <p className="text-gray-800 font-universal text-sm">Track mentions and coverage across the entire web.</p>
          </div>

          {/* Brand Protection */}
          <div className="bg-red-50/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-red-600" />
              <h3 className="font-garnett text-lg">Brand Protection</h3>
            </div>
            <p className="text-gray-800 font-universal text-sm">Proactive alerts and crisis management tools.</p>
          </div>

          {/* Customer Insights */}
          <div className="bg-orange-50/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-orange-600" />
              <h3 className="font-garnett text-lg">Customer Insights</h3>
            </div>
            <p className="text-gray-800 font-universal text-sm">Deep analytics into customer feedback and preferences.</p>
          </div>

          {/* Competitor Analysis */}
          <div className="bg-indigo-50/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-indigo-600" />
              <h3 className="font-garnett text-lg">Competitor Analysis</h3>
            </div>
            <p className="text-gray-800 font-universal text-sm">Monitor and analyze competitor reputation strategies.</p>
          </div>

          {/* Crisis Management */}
          <div className="bg-pink-50/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-pink-600" />
              <h3 className="font-garnett text-lg">Crisis Management</h3>
            </div>
            <p className="text-gray-800 font-universal text-sm">Rapid response protocols for reputation threats.</p>
          </div>
        </div>
      </div>
    </section>
  )
}