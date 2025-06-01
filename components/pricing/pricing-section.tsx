"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type PricingPlan = {
  name: string
  price: string | number
  description: string
  features: string[]
  cta?: {
    text: string
    href: string
  }
  highlight?: boolean
  commitment?: string
}

interface PricingProps {
  title?: string
  description?: string
  plans: PricingPlan[]
}

export function PricingSection({ 
  title = "Simple, transparent pricing",
  description = "Choose the plan that works best for your business needs.",
  plans 
}: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")
  const showBillingToggle = plans.length > 1

  // Format price with commas and $ sign
  const formatPrice = (price: string | number) => {
    if (typeof price === "string") return price;
    return `$${price.toLocaleString()}`;
  }

  // Determine grid columns based on number of plans
  const gridCols = plans.length === 1 ? "md:grid-cols-1" :
                   plans.length === 2 ? "md:grid-cols-2" :
                   plans.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

  return (
    <section className="py-32 mt-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-garnett font-medium mb-6">{title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-universal">
            {description}
          </p>

          {showBillingToggle && (
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
          )}
        </div>

        <div className={`grid grid-cols-1 ${gridCols} gap-8 max-w-7xl mx-auto`}>
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white border ${
                plan.highlight 
                  ? "border-2 border-orange-500 rounded-xl shadow-md overflow-hidden transform scale-105 relative z-10" 
                  : "border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
              }`}
            >
              {plan.highlight && (
                <div className="bg-orange-500 py-2 text-center text-white font-universal text-sm">
                  Most popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-lg font-garnett text-gray-800 mb-3">{plan.name}</h3>
                <div className="mb-5">
                  <span className="text-4xl font-garnett">{formatPrice(plan.price)}</span>
                  {typeof plan.price === "number" && <span className="text-gray-600 ml-2">per month</span>}
                  {plan.commitment && (
                    <div className="text-sm text-orange-600 mt-1 font-universal">{plan.commitment}</div>
                  )}
                </div>
                <p className="text-gray-600 mb-6 font-universal">{plan.description}</p>
                {plan.cta && (
                  <Link href={plan.cta.href} className="w-full">
                    <Button 
                      className={`w-full ${
                        plan.highlight 
                          ? "bg-orange-500 hover:bg-orange-600" 
                          : "bg-gray-900 hover:bg-gray-800"
                      } text-white py-2 rounded-lg text-sm transition-colors font-universal`}
                    >
                      {plan.cta.text}
                    </Button>
                  </Link>
                )}
              </div>
              <div className="bg-gray-50 px-8 py-6">
                <p className="font-medium mb-4 font-universal text-sm">Features:</p>
                <ul className="space-y-3 font-universal">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}