// Move all the pricing page content to a new client component
"use client"

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

export function PricingContent() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly")
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <PricingSection billingPeriod={billingPeriod} setBillingPeriod={setBillingPeriod} />
      <ParallaxCompareSection billingPeriod={billingPeriod} />
      <FaqSection />
    </>
  )
}

// Rest of the existing pricing page components...