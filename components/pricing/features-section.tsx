import { Star, MessageSquare, BarChart2, Globe, Shield, Users, TrendingUp } from "lucide-react"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

interface FeaturesProps {
  type: 'aio' | 'reputation' | 'ppc';
}

export function FeaturesSection({ type }: FeaturesProps) {
  const features = {
    aio: [
      {
        Icon: Star,
        name: "AI-Powered Optimization",
        description: "Advanced AI algorithms continuously optimize your SEO strategy.",
        href: "#",
        cta: "Learn more",
        background: "bg-blue-50/50",
        className: "lg:col-span-2",
      },
      {
        Icon: BarChart2,
        name: "Real-Time Analytics",
        description: "Monitor your performance with real-time insights and reporting.",
        href: "#",
        cta: "Learn more",
        background: "bg-purple-50/50",
        className: "lg:col-span-1",
      },
      {
        Icon: Shield,
        name: "Technical SEO",
        description: "Comprehensive technical optimization and monitoring.",
        href: "#",
        cta: "Learn more",
        background: "bg-green-50/50",
        className: "lg:col-span-1",
      }
    ],
    reputation: [
      {
        Icon: Star,
        name: "Review Management",
        description: "Monitor and manage reviews across all major platforms.",
        href: "#",
        cta: "Learn more",
        background: "bg-yellow-50/50",
        className: "lg:col-span-1",
      },
      {
        Icon: Shield,
        name: "Review Protection",
        description: "Proactive monitoring and response to negative feedback.",
        href: "#",
        cta: "Learn more",
        background: "bg-red-50/50",
        className: "lg:col-span-2",
      },
      {
        Icon: Globe,
        name: "Multi-Platform Coverage",
        description: "Comprehensive coverage across all major review sites.",
        href: "#",
        cta: "Learn more",
        background: "bg-blue-50/50",
        className: "lg:col-span-1",
      }
    ],
    ppc: [
      {
        Icon: BarChart2,
        name: "Smart Bidding",
        description: "AI-powered bid management for optimal ROI.",
        href: "#",
        cta: "Learn more",
        background: "bg-indigo-50/50",
        className: "lg:col-span-1",
      },
      {
        Icon: TrendingUp,
        name: "Performance Analytics",
        description: "Real-time campaign monitoring and optimization.",
        href: "#",
        cta: "Learn more",
        background: "bg-green-50/50",
        className: "lg:col-span-2",
      },
      {
        Icon: Users,
        name: "Audience Targeting",
        description: "Advanced audience segmentation and targeting.",
        href: "#",
        cta: "Learn more",
        background: "bg-orange-50/50",
        className: "lg:col-span-1",
      }
    ]
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-full text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-garnett mb-4">
            {type === 'aio' && "Complete SEO Solution"}
            {type === 'reputation' && "Reputation Management Suite"}
            {type === 'ppc' && "Advanced PPC Management"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-universal">
            {type === 'aio' && "Everything you need to dominate search results"}
            {type === 'reputation' && "Build and maintain your online reputation"}
            {type === 'ppc' && "Maximize your advertising ROI"}
          </p>
        </div>

        <BentoGrid className="lg:grid-rows-2">
          {features[type].map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}