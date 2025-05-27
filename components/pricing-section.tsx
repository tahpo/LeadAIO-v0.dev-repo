import { Check, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PricingSectionProps {
  service: "aio" | "reputation" | "advertising"
  title: string
  description: string
  prices: {
    starter?: number
    professional?: number | null
    enterprise?: number | null
    commitment?: number
  }
}

export function PricingSection({ service, title, description, prices }: PricingSectionProps) {
  return (
    <section className="py-32 mt-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-garnett font-medium mb-6">{title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-universal">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          {prices.starter && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="p-8">
                <h3 className="text-lg font-garnett text-gray-800 mb-3">Starter</h3>
                <div className="mb-5">
                  <span className="text-4xl font-garnett">${prices.starter}</span>
                  <span className="text-gray-600 ml-2">per month</span>
                  {prices.commitment && (
                    <div className="text-sm text-gray-600 mt-1 font-universal">
                      {prices.commitment} month minimum commitment
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-6 font-universal">Perfect for businesses getting started with {service === 'aio' ? 'AI optimization' : service === 'reputation' ? 'reputation management' : 'paid advertising'}.</p>
                <Link href="/signup" className="w-full">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-sm transition-colors font-universal">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="bg-gray-50 px-8 py-6">
                <p className="font-medium mb-4 font-universal text-sm">Includes:</p>
                <ul className="space-y-3 font-universal">
                  {getFeatures(service, "starter").map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Professional Plan */}
          {prices.professional !== null && (
            <div className="bg-white border-2 border-orange-500 rounded-xl shadow-md overflow-hidden transform scale-105 relative z-10">
              <div className="bg-orange-500 py-2 text-center text-white font-universal text-sm">
                Most popular
              </div>
              <div className="p-8">
                <h3 className="text-lg font-garnett text-gray-800 mb-3">Professional</h3>
                <div className="mb-5">
                  <span className="text-4xl font-garnett">${prices.professional}</span>
                  <span className="text-gray-600 ml-2">per month</span>
                </div>
                <p className="text-gray-600 mb-6 font-universal">Comprehensive solution for growing businesses.</p>
                <Link href="/signup" className="w-full">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm transition-colors font-universal">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="bg-gray-50 px-8 py-6">
                <p className="font-medium mb-4 font-universal text-sm">Everything in Starter, plus:</p>
                <ul className="space-y-3 font-universal">
                  {getFeatures(service, "professional").map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Enterprise Plan */}
          {prices.enterprise !== null && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="p-8">
                <h3 className="text-lg font-garnett text-gray-800 mb-3">Enterprise</h3>
                <div className="mb-5">
                  {prices.enterprise ? (
                    <>
                      <span className="text-4xl font-garnett">${prices.enterprise}</span>
                      <span className="text-gray-600 ml-2">per month</span>
                    </>
                  ) : (
                    <span className="text-4xl font-garnett">Custom</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6 font-universal">Advanced solutions for large organizations.</p>
                <Button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-sm transition-colors font-universal"
                  variant="outline"
                  asChild
                >
                  <Link href="/contact">Contact sales</Link>
                </Button>
              </div>
              <div className="bg-gray-50 px-8 py-6">
                <p className="font-medium mb-4 font-universal text-sm">Everything in Professional, plus:</p>
                <ul className="space-y-3 font-universal">
                  {getFeatures(service, "enterprise").map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function getFeatures(service: string, tier: string): string[] {
  const features = {
    aio: {
      starter: [
        "Up to 50 keywords tracked",
        "Basic AI keyword research",
        "Monthly site audit",
        "Content optimization suggestions",
        "1 user",
        "Email support"
      ],
      professional: [
        "Up to 200 keywords tracked",
        "Advanced AI keyword research",
        "Weekly site audits",
        "AI content optimization",
        "Competitor analysis",
        "5 users",
        "Priority email & chat support"
      ],
      enterprise: [
        "Unlimited keywords",
        "Custom AI model training",
        "Daily site audits",
        "API access",
        "Unlimited users",
        "24/7 priority support",
        "Dedicated account manager"
      ]
    },
    reputation: {
      starter: [
        "Review monitoring",
        "Basic review management",
        "Monthly reports",
        "1 location",
        "Email support"
      ],
      professional: [
        "Advanced review management",
        "Review generation",
        "Weekly reports",
        "Up to 5 locations",
        "Priority support",
        "Social media monitoring"
      ],
      enterprise: [
        "Custom review strategies",
        "Unlimited locations",
        "Custom reporting",
        "Crisis management",
        "24/7 priority support",
        "Dedicated manager"
      ]
    },
    advertising: {
      starter: [
        "Campaign setup & optimization",
        "Keyword research & targeting",
        "Ad copywriting",
        "Monthly performance reports",
        "Conversion tracking",
        "ROI monitoring"
      ]
    }
  }

  return features[service][tier] || []
}