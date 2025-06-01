"use client"

import { useRef, useEffect, useState } from "react"
import { Check, X } from "lucide-react"

interface Feature {
  name: string
  starter?: string | JSX.Element
  pro?: string | JSX.Element
  enterprise?: string | JSX.Element
  enterprisePlus?: string | JSX.Element
}

interface FeatureCategory {
  category: string
  items: Feature[]
}

const aioFeatures: FeatureCategory[] = [
  {
    category: "Keywords",
    items: [
      { name: "Keywords tracked", starter: "25", pro: "50", enterprise: "100", enterprisePlus: "Unlimited" },
      { name: "AI keyword research", starter: "Basic", pro: "Advanced", enterprise: "Custom", enterprisePlus: "Enterprise" },
      { name: "Keyword difficulty analysis", starter: <Check className="h-5 w-5 text-green-500 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Keyword grouping", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Competitor keyword analysis", starter: "Basic", pro: "Advanced", enterprise: "Enterprise", enterprisePlus: "Custom" },
      { name: "Local keyword tracking", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> }
    ]
  },
]

const reputationFeatures: FeatureCategory[] = [
  {
    category: "Reviews",
    items: [
      { name: "Reviews per month", starter: "15", pro: "30", enterprise: "40", enterprisePlus: "Unlimited" },
      { name: "AI review monitoring", starter: "Basic", pro: "Advanced", enterprise: "Enterprise", enterprisePlus: "Custom" },
      { name: "Multi-platform coverage", starter: <Check className="h-5 w-5 text-green-500 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Custom platform integration", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <X className="h-5 w-5 text-gray-400 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Review response templates", starter: "5", pro: "15", enterprise: "30", enterprisePlus: "Unlimited" },
      { name: "Sentiment analysis", starter: "Basic", pro: "Advanced", enterprise: "Enterprise", enterprisePlus: "Custom" }
    ]
  },
  {
    category: "Monitoring & Alerts",
    items: [
      { name: "Review monitoring frequency", starter: "Daily", pro: "12h", enterprise: "6h", enterprisePlus: "Real-time" },
      { name: "Negative review alerts", starter: <Check className="h-5 w-5 text-green-500 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Competitor monitoring", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Custom alert rules", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: "Basic", enterprise: "Advanced", enterprisePlus: "Custom" },
      { name: "Social media monitoring", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> }
    ]
  },
  {
    category: "Response Management",
    items: [
      { name: "AI response suggestions", starter: "Basic", pro: "Advanced", enterprise: "Custom", enterprisePlus: "Enterprise" },
      { name: "Response time tracking", starter: <Check className="h-5 w-5 text-green-500 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Multi-user access", starter: "2", pro: "5", enterprise: "15", enterprisePlus: "Unlimited" },
      { name: "Response approval workflow", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Custom response rules", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: "Basic", enterprise: "Advanced", enterprisePlus: "Custom" }
    ]
  },
  {
    category: "Analytics & Reporting",
    items: [
      { name: "Review analytics", starter: "Basic", pro: "Advanced", enterprise: "Enterprise", enterprisePlus: "Custom" },
      { name: "Custom dashboards", starter: "1", pro: "3", enterprise: "10", enterprisePlus: "Unlimited" },
      { name: "Report scheduling", starter: "Monthly", pro: "Weekly", enterprise: "Daily", enterprisePlus: "Custom" },
      { name: "Data export formats", starter: "CSV", pro: "CSV, PDF", enterprise: "CSV, PDF, API", enterprisePlus: "All formats" },
      { name: "Custom report builder", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> }
    ]
  },
  {
    category: "Support & Training",
    items: [
      { name: "Support channels", starter: "Email", pro: "Email, Chat", enterprise: "Priority", enterprisePlus: "24/7 VIP" },
      { name: "Response time", starter: "48h", pro: "24h", enterprise: "4h", enterprisePlus: "1h" },
      { name: "Training sessions", starter: "1", pro: "3", enterprise: "Unlimited", enterprisePlus: "Custom" },
      { name: "Dedicated manager", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <X className="h-5 w-5 text-gray-400 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Strategy reviews", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: "Quarterly", enterprise: "Monthly", enterprisePlus: "Weekly" }
    ]
  },
]

const ppcFeatures: FeatureCategory[] = [
  {
    category: "Campaign Management",
    items: [
      { name: "Monthly ad budget", starter: "$25,000", pro: "Unlimited" },
      { name: "AI bid management", starter: "Advanced", pro: "Enterprise" },
      { name: "Campaign optimization", starter: "Weekly", pro: "Daily" },
      { name: "Custom automation rules", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "A/B testing", starter: "Basic", pro: "Advanced" }
    ]
  },
  {
    category: "Ad Creation & Optimization",
    items: [
      { name: "Ad formats supported", starter: "Search, Display", pro: "All formats" },
      { name: "AI copywriting", starter: "Basic", pro: "Advanced" },
      { name: "Dynamic ad creation", starter: <Check className="h-5 w-5 text-green-500 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Landing page optimization", starter: "Basic", pro: "Advanced" },
      { name: "Custom ad templates", starter: "5", pro: "Unlimited" }
    ]
  },
  {
    category: "Targeting & Audience",
    items: [
      { name: "Audience segmentation", starter: "Basic", pro: "Advanced" },
      { name: "Geographic targeting", starter: <Check className="h-5 w-5 text-green-500 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Custom audience creation", starter: "Limited", pro: "Unlimited" },
      { name: "Remarketing campaigns", starter: <Check className="h-5 w-5 text-green-500 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Lookalike audiences", starter: "Basic", pro: "Advanced" }
    ]
  },
  {
    category: "Analytics & Reporting",
    items: [
      { name: "Performance tracking", starter: "Real-time", pro: "Real-time+" },
      { name: "Custom dashboards", starter: "3", pro: "Unlimited" },
      { name: "Report automation", starter: "Weekly", pro: "Custom" },
      { name: "Attribution modeling", starter: "Basic", pro: "Advanced" },
      { name: "ROI forecasting", starter: <Check className="h-5 w-5 text-green-500 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" /> }
    ]
  },
  {
    category: "Support & Strategy",
    items: [
      { name: "Account management", starter: "Dedicated", pro: "Enterprise" },
      { name: "Strategy sessions", starter: "Monthly", pro: "Weekly" },
      { name: "Support response time", starter: "24h", pro: "4h" },
      { name: "Campaign reviews", starter: "Weekly", pro: "Daily" },
      { name: "Strategy adjustments", starter: "Monthly", pro: "Continuous" }
    ]
  },
]

interface FeaturesSectionProps {
  type: 'aio' | 'reputation' | 'ppc'
}

export function FeaturesSection({ type }: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)
  const [endSticky, setEndSticky] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  useEffect(() => {
    const header = headerRef.current
    if (header) {
      setHeaderHeight(header.offsetHeight)
    }

    const handleScroll = () => {
      const section = sectionRef.current
      const header = headerRef.current
      
      if (section && header) {
        const sectionRect = section.getBoundingClientRect()
        const headerRect = header.getBoundingClientRect()
        const sectionBottom = sectionRect.bottom
        const headerBottom = headerRect.height
        
        setIsSticky(sectionRect.top <= 70)
        setEndSticky(sectionBottom <= headerBottom + 70 + 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = type === 'aio' ? aioFeatures :
                   type === 'reputation' ? reputationFeatures :
                   ppcFeatures

  const planCount = type === 'ppc' ? 2 : 4
  const gridCols = `grid-cols-${planCount + 1}`

  return (
    <section ref={sectionRef} className="py-6 bg-white relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-garnett text-center mb-8">Compare all features</h2>
        
        <div style={{ paddingTop: isSticky && !endSticky ? headerHeight : 0 }}>
          {/* Sticky header */}
          <div 
            ref={headerRef}
            className={`w-full bg-white transition-shadow duration-300 z-10 ${
              isSticky && !endSticky 
                ? 'fixed top-[70px] left-0 right-0 shadow-md' 
                : ''
            } ${endSticky ? 'absolute bottom-0' : ''}`}
          >
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid ${gridCols} gap-4 py-6 border-b`}>
                <div className="text-left">
                  <span className="font-universal text-gray-500 text-sm">Features</span>
                </div>
                {type === 'ppc' ? (
                  <>
                    <div className="text-center">
                      <h3 className="font-garnett text-lg font-medium">AI-Powered PPC</h3>
                      <p className="text-sm text-gray-600 font-universal mt-1">$2,499/mo</p>
                    </div>
                    <div className="text-center">
                      <h3 className="font-garnett text-lg font-medium">Enterprise</h3>
                      <p className="text-sm text-gray-600 font-universal mt-1">Custom</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <h3 className="font-garnett text-lg font-medium">Starter</h3>
                      <p className="text-sm text-gray-600 font-universal mt-1">
                        ${type === 'aio' ? '2,499' : '499'}/mo
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="font-garnett text-lg font-medium text-orange-500">Professional</h3>
                      <p className="text-sm text-gray-600 font-universal mt-1">
                        ${type === 'aio' ? '3,499' : '799'}/mo
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="font-garnett text-lg font-medium">Enterprise</h3>
                      <p className="text-sm text-gray-600 font-universal mt-1">
                        ${type === 'aio' ? '4,999' : '999'}/mo
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="font-garnett text-lg font-medium">Enterprise+</h3>
                      <p className="text-sm text-gray-600 font-universal mt-1">Custom</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Feature comparison content */}
          <div className="mt-0">
            {features.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16">
                <h3 className="text-xl font-garnett font-medium mb-6 pt-6 border-t">{category.category}</h3>
                
                {category.items.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex} 
                    className={`grid ${gridCols} gap-4 py-4 ${
                      featureIndex !== category.items.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="text-sm font-universal font-medium">{feature.name}</div>
                    </div>
                    <div 
                      className="text-center text-sm font-universal"
                      onMouseEnter={() => setHoveredFeature(`${categoryIndex}-${featureIndex}-0`)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                    {type === 'ppc' ? (
                      <>
                        <div className="text-center text-sm font-universal">{feature.starter}</div>
                        <div className="text-center text-sm font-universal">{feature.pro}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-center text-sm font-universal">{feature.starter}</div>
                        <div className="text-center text-sm font-universal">{feature.pro}</div>
                        <div className="text-center text-sm font-universal">{feature.enterprise}</div>
                        <div className="text-center text-sm font-universal">{feature.enterprisePlus}</div>
                      </>
                    )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6 font-universal">
            Need a custom solution for your business?
          </p>
          <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
            <Link href="/contact">Contact our sales team</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}