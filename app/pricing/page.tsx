"use client"

import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { useState, useEffect, useRef } from "react"
import { Check, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly")
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until client-side
  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
      <Header />
      <PricingSection billingPeriod={billingPeriod} setBillingPeriod={setBillingPeriod} />
      <ParallaxCompareSection billingPeriod={billingPeriod} />
      <FaqSection />
      <FooterSection />
    </main>
  )
}

function PricingSection({
  billingPeriod,
  setBillingPeriod,
}: {
  billingPeriod: "monthly" | "yearly"
  setBillingPeriod: (period: "monthly" | "yearly") => void
}) {
  return (
    <section className="py-32 mt-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-garnett font-medium mb-6">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-universal">
            Choose the plan that works best for your business needs. All plans include a 14-day free trial.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center mt-10 space-x-4">
            <span
              className={`text-sm font-universal ${
                billingPeriod === "monthly" ? "text-gray-900" : "text-gray-500"
              } cursor-pointer`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </span>
            <div
              className="w-16 h-8 bg-gray-200 rounded-full p-1 cursor-pointer"
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
            >
              <div
                className={`w-6 h-6 bg-orange-500 rounded-full shadow-md transform duration-300 ease-in-out ${
                  billingPeriod === "yearly" ? "translate-x-8" : ""
                }`}
              ></div>
            </div>
            <div className="flex items-center space-x-1">
              <span
                className={`text-sm font-universal ${
                  billingPeriod === "yearly" ? "text-gray-900" : "text-gray-500"
                } cursor-pointer`}
                onClick={() => setBillingPeriod("yearly")}
              >
                Yearly
              </span>
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-universal">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="p-8">
              <h3 className="text-lg font-garnett text-gray-800 mb-3">Starter</h3>
              <div className="mb-5">
                <span className="text-4xl font-garnett">
                  ${billingPeriod === "monthly" ? "49" : "39"}
                </span>
                <span className="text-gray-600 ml-2">per month</span>
                {billingPeriod === "yearly" && (
                  <div className="text-sm text-gray-600 mt-1 font-universal">billed annually</div>
                )}
              </div>
              <p className="text-gray-600 mb-6 font-universal">Perfect for small businesses just getting started with SEO.</p>
              <Button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-sm transition-colors font-universal"
                asChild
              >
                <Link href="/signup">Start free trial</Link>
              </Button>
            </div>
            <div className="bg-gray-50 px-8 py-6">
              <p className="font-medium mb-4 font-universal text-sm">Includes:</p>
              <ul className="space-y-3 font-universal">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Up to 50 keywords tracked</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Basic keyword research</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Monthly site audit</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">1 user</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Email support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="bg-white border-2 border-orange-500 rounded-xl shadow-md overflow-hidden transform scale-105 relative z-10">
            <div className="bg-orange-500 py-2 text-center text-white font-universal text-sm">
              Most popular
            </div>
            <div className="p-8">
              <h3 className="text-lg font-garnett text-gray-800 mb-3">Pro</h3>
              <div className="mb-5">
                <span className="text-4xl font-garnett">
                  ${billingPeriod === "monthly" ? "99" : "79"}
                </span>
                <span className="text-gray-600 ml-2">per month</span>
                {billingPeriod === "yearly" && (
                  <div className="text-sm text-gray-600 mt-1 font-universal">billed annually</div>
                )}
              </div>
              <p className="text-gray-600 mb-6 font-universal">Comprehensive solution for growing businesses.</p>
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm transition-colors font-universal"
                asChild
              >
                <Link href="/signup">Start free trial</Link>
              </Button>
            </div>
            <div className="bg-gray-50 px-8 py-6">
              <p className="font-medium mb-4 font-universal text-sm">Everything in Starter, plus:</p>
              <ul className="space-y-3 font-universal">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Up to 200 keywords tracked</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Advanced AI keyword research</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Weekly site audits</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Content optimization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Competitor analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">5 users</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Priority email & chat support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="p-8">
              <h3 className="text-lg font-garnett text-gray-800 mb-3">Enterprise</h3>
              <div className="mb-5">
                <span className="text-4xl font-garnett">Custom</span>
              </div>
              <p className="text-gray-600 mb-6 font-universal">Advanced SEO solutions for large organizations.</p>
              <Button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-sm transition-colors font-universal"
                variant="outline"
                asChild
              >
                <Link href="/contact">Contact sales</Link>
              </Button>
            </div>
            <div className="bg-gray-50 px-8 py-6">
              <p className="font-medium mb-4 font-universal text-sm">Everything in Pro, plus:</p>
              <ul className="space-y-3 font-universal">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Unlimited keywords</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Custom AI model training</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Daily site audits</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Unlimited users</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">24/7 priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600 text-sm">Dedicated account manager</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ParallaxCompareSection({ billingPeriod }: { billingPeriod: "monthly" | "yearly" }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [endSticky, setEndSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = headerRef.current;
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    const handleScroll = () => {
      const section = sectionRef.current;
      const header = headerRef.current;
      
      if (section && header) {
        const sectionRect = section.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        const sectionBottom = sectionRect.bottom;
        const headerBottom = headerRect.height;
        
        // Set sticky when section top reaches top of viewport
        setIsSticky(sectionRect.top <= 80); // 80px for the site header
        
        // End sticky when bottom of section is about to meet bottom of sticky header
        setEndSticky(sectionBottom <= headerBottom + 80 + 100); // Added some buffer
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Feature comparison data
  const features = [
    {
      category: "Keywords",
      items: [
        { name: "Keywords tracked", starter: "50", pro: "200", enterprise: "Unlimited" },
        { name: "AI keyword research", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
        { name: "Keyword difficulty analysis", starter: <Check className="h-5 w-5 text-green-500 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
        { name: "Keyword grouping", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      ]
    },
    {
      category: "Ranking",
      items: [
        { name: "Position tracking frequency", starter: "Weekly", pro: "Daily", enterprise: "Real-time" },
        { name: "Search engines monitored", starter: "2", pro: "5", enterprise: "All major" },
        { name: "Location-based tracking", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
        { name: "Competitor rank tracking", starter: "Up to 2", pro: "Up to 5", enterprise: "Unlimited" },
      ]
    },
    {
      category: "Site Audit",
      items: [
        { name: "Audit frequency", starter: "Monthly", pro: "Weekly", enterprise: "Daily" },
        { name: "Pages crawled", starter: "500", pro: "5,000", enterprise: "Unlimited" },
        { name: "Technical issue detection", starter: "Basic", pro: "Advanced", enterprise: "Comprehensive" },
        { name: "JavaScript rendering", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
        { name: "Custom issue prioritization", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <X className="h-5 w-5 text-gray-400 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      ]
    },
    {
      category: "Content",
      items: [
        { name: "Content optimization", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
        { name: "AI writing suggestions", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: "Basic", enterprise: "Advanced" },
        { name: "Content performance tracking", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
        { name: "Custom content templates", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <X className="h-5 w-5 text-gray-400 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      ]
    },
    {
      category: "Backlinks",
      items: [
        { name: "Backlink monitoring", starter: "Limited", pro: "Full", enterprise: "Full" },
        { name: "Link building opportunities", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
        { name: "Toxic link detection", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
        { name: "Competitor backlink analysis", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: "Basic", enterprise: "Advanced" },
      ]
    },
    {
      category: "Reporting",
      items: [
        { name: "Custom dashboards", starter: "1", pro: "5", enterprise: "Unlimited" },
        { name: "White-label reports", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <Check className="h-5 w-5 text-green-500 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
        { name: "Report scheduling", starter: "Weekly", pro: "Daily", enterprise: "Custom" },
        { name: "Data export formats", starter: "CSV", pro: "CSV, PDF", enterprise: "CSV, PDF, API" },
      ]
    },
    {
      category: "Support & Training",
      items: [
        { name: "Customer support", starter: "Email", pro: "Email & chat", enterprise: "24/7 dedicated" },
        { name: "Response time", starter: "48 hours", pro: "24 hours", enterprise: "4 hours" },
        { name: "Onboarding calls", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: "1 hour", enterprise: "Customized" },
        { name: "Training sessions", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: "Monthly", enterprise: "Weekly" },
        { name: "Dedicated account manager", starter: <X className="h-5 w-5 text-gray-400 mx-auto" />, pro: <X className="h-5 w-5 text-gray-400 mx-auto" />, enterprise: <Check className="h-5 w-5 text-green-500 mx-auto" /> },
      ]
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white relative" style={{ paddingTop: 0 }}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-garnett text-center mb-12">Compare all features</h2>
        
        <div style={{ paddingTop: isSticky && !endSticky ? headerHeight : 0 }}>
          {/* Sticky header */}
          <div 
            ref={headerRef}
            className={`w-full bg-white transition-shadow duration-300 z-10 ${
              isSticky && !endSticky 
                ? 'fixed top-[80px] left-0 right-0 shadow-md' 
                : ''
            } ${endSticky ? 'absolute bottom-0' : ''}`}
          >
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-4 gap-4 py-6 border-b">
                <div className="text-left">
                  <span className="font-universal text-gray-500 text-sm">Features</span>
                </div>
                <div className="text-center">
                  <h3 className="font-garnett text-lg font-medium">Starter</h3>
                  <p className="text-sm text-gray-600 font-universal mt-1">
                    ${billingPeriod === "monthly" ? "49" : "39"}/mo
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-garnett text-lg font-medium text-orange-500">Pro</h3>
                  <p className="text-sm text-gray-600 font-universal mt-1">
                    ${billingPeriod === "monthly" ? "99" : "79"}/mo
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-garnett text-lg font-medium">Enterprise</h3>
                  <p className="text-sm text-gray-600 font-universal mt-1">Custom</p>
                </div>
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
                    className={`grid grid-cols-4 gap-4 py-4 ${
                      featureIndex !== category.items.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="text-sm font-universal font-medium">{feature.name}</div>
                    </div>
                    <div className="text-center text-sm font-universal">
                      {feature.starter}
                    </div>
                    <div className="text-center text-sm font-universal">
                      {feature.pro}
                    </div>
                    <div className="text-center text-sm font-universal">
                      {feature.enterprise}
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
  );
}

function FaqSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-garnett text-center mb-12">Frequently asked questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-garnett mb-3">Can I change my plan later?</h3>
            <p className="text-gray-600 font-universal">
              Yes, you can upgrade, downgrade or cancel your plan at any time. If you upgrade, you'll be prorated for the remainder of your billing cycle. If you downgrade or cancel, changes will take effect at the end of your current billing cycle.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-garnett mb-3">Is there a free trial?</h3>
            <p className="text-gray-600 font-universal">
              Yes, all plans come with a 14-day free trial, no credit card required. You can try out all the features before committing to a paid plan.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-garnett mb-3">What payment methods do you accept?</h3>
            <p className="text-gray-600 font-universal">
              We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we also offer invoicing options.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-garnett mb-3">Do I need technical knowledge to use LeadAIO?</h3>
            <p className="text-gray-600 font-universal">
              Not at all. LeadAIO is designed to be user-friendly and intuitive, even for those with no technical SEO experience. Our AI handles the complex stuff for you.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-garnett mb-3">Can I cancel my subscription anytime?</h3>
            <p className="text-gray-600 font-universal">
              Absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time from your account settings.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4 font-universal">Still have questions?</p>
          <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
            <Link href="/contact">Contact our team</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}