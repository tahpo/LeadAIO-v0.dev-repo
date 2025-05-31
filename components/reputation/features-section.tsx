import { Star, MessageSquare, BarChart2, Globe, Shield, Users, TrendingUp } from "lucide-react"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

const features = [
  {
    Icon: Star,
    name: "Review Monitoring",
    description: "Track and analyze reviews across all major platforms in real-time.",
    href: "#",
    cta: "Learn more",
    background: "bg-yellow-50/50",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: MessageSquare,
    name: "Smart Response",
    description: "AI-powered response suggestions for reviews and mentions.",
    href: "#",
    cta: "Learn more",
    background: "bg-blue-50/50",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BarChart2,
    name: "Sentiment Analysis",
    description: "Advanced AI analysis of customer sentiment and trends.",
    href: "#",
    cta: "Learn more",
    background: "bg-purple-50/50",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Globe,
    name: "Web Monitoring",
    description: "Track mentions and coverage across the entire web.",
    href: "#",
    cta: "Learn more",
    background: "bg-green-50/50",
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: Shield,
    name: "Brand Protection",
    description: "Proactive alerts and crisis management tools.",
    href: "#",
    cta: "Learn more",
    background: "bg-red-50/50",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: Users,
    name: "Customer Insights",
    description: "Deep analytics into customer feedback and preferences.",
    href: "#",
    cta: "Learn more",
    background: "bg-orange-50/50",
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: TrendingUp,
    name: "Performance Analytics",
    description: "Track and improve your reputation metrics over time.",
    href: "#",
    cta: "Learn more",
    background: "bg-teal-50/50",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4",
  },
]

export function ReputationFeatures() {
  return (
    <section className="py-24 bg-white relative">
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

        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}