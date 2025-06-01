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
      { name: "Keywords tracked", starter: "25", pro: "50", enterprise: "100", enterprisePlus: "Custom" },
      { name: "AI keyword research", starter: "Basic", pro: "Advanced", enterprise: "Custom", enterprisePlus: "Enterprise" },
      { name: "Keyword difficulty analysis", starter: <Check className="h-5 w-5 text-green-500 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Keyword grouping", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> }
    ]
  },
  // Add more AIO feature categories...
]

const reputationFeatures: FeatureCategory[] = [
  {
    category: "Reviews",
    items: [
      { name: "Reviews per month", starter: "15", pro: "30", enterprise: "40", enterprisePlus: "Custom" },
      { name: "AI review monitoring", starter: "Basic", pro: "Advanced", enterprise: "Enterprise", enterprisePlus: "Custom" },
      { name: "Multi-platform coverage", starter: <Check className="h-5 w-5 text-green-500 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      { name: "Custom platform integration", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <X className="h-5 w-5 text-gray-400 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprisePlus: <Check className="h-5 w-5 text-green-500 mx-auto" /> }
    ]
  },
  // Add more reputation feature categories...
]

const ppcFeatures: FeatureCategory[] = [
  {
    category: "Campaign Management",
    items: [
      { name: "Monthly ad budget", starter: "$25,000", pro: "Custom" },
      { name: "AI bid management", starter: "Advanced", pro: "Custom" },
      { name: "Campaign optimization", starter: "Weekly", pro: "Custom" },
      { name: "Custom automation rules", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" /> }
    ]
  },
  // Add more PPC feature categories...
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
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}