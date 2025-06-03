import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { PricingSection } from "@/components/pricing/pricing-section"
import { FeaturesSection } from "@/components/pricing/features-section"
import { FAQSection } from "@/components/pricing/faq-section"
const FooterSection = dynamic(() => import("@/components/footer-section").then(mod => ({ default: mod.FooterSection })), { ssr: true })

const reputationPlans = [
  {
    name: "Starter",
    price: 499,
    description: "Perfect for small businesses looking to build their online reputation.",
    features: [
      "15 Reviews per month",
      "AI-powered dashboard with real-time review monitoring",
      "Multi-platform coverage (Google, Houzz, Angi, Home Advisor, Buildzoom, Porch, Networx)",
      "Reviews with verified, active local users",
      "Posted using unique local IPs for authenticity & longevity",
      "90-day review warranty"
    ],
    cta: {
      text: "Get Started",
      href: "/signup"
    }
  },
  {
    name: "Professional",
    price: 799,
    description: "Comprehensive solution for growing businesses.",
    features: [
      "30 Reviews per month",
      "AI-powered dashboard with real-time review monitoring",
      "Multi-platform coverage (Google, Houzz, Angi, Home Advisor, Buildzoom, Porch, Networx)",
      "Reviews crafted using AI-driven keyword strategies",
      "Reviews with verified, active local users",
      "Posted using unique local IPs for authenticity & longevity",
      "90-day review warranty"
    ],
    highlight: true,
    cta: {
      text: "Get Started",
      href: "/signup"
    }
  },
  {
    name: "Enterprise",
    price: 999,
    description: "Advanced reputation management for large organizations.",
    features: [
      "40 Reviews per month",
      "AI-powered dashboard with real-time review monitoring",
      "Max impact across multiple platforms (Google, Houzz, Angi, Home Advisor, Buildzoom, Porch, Networx)",
      "Strategic keyword placement for enhanced SEO benefits",
      "Reviews with verified, active local users",
      "Posted using unique local IPs for authenticity & longevity",
      "Dedicated reputation specialist & priority support",
      "90-day review warranty"
    ],
    cta: {
      text: "Get Started",
      href: "/signup"
    }
  },
  {
    name: "Enterprise+",
    price: "Custom",
    description: "Tailored reputation management solutions for enterprise-scale organizations.",
    features: [
      "Custom review volume based on needs",
      "Advanced AI-powered review monitoring",
      "Custom platform coverage",
      "Enterprise-grade review strategy",
      "Dedicated reputation management team",
      "Custom reporting solutions",
      "24/7 Priority support",
      "Extended review warranty",
      "Custom integration options",
      "Executive strategy sessions"
    ],
    cta: {
      text: "Contact Sales",
      href: "/contact"
    }
  }
]

const reputationFaqs = [
  {
    question: "How do you ensure the authenticity of reviews?",
    answer: "Our platform uses verified, active local users and unique local IPs to ensure all reviews are authentic and compliant with platform guidelines. Each review is carefully crafted to reflect genuine customer experiences while maintaining authenticity and longevity."
  },
  {
    question: "What platforms do you support for review management?",
    answer: "We support all major review platforms including Google, Houzz, Angi, Home Advisor, Buildzoom, Porch, and Networx. Our Enterprise plans can also accommodate additional platforms based on your specific needs."
  },
  {
    question: "What is the 90-day review warranty?",
    answer: "Our 90-day review warranty ensures that if any review is removed by the platform within 90 days of posting, we will replace it with a new review at no additional cost. This guarantee helps maintain your consistent online presence."
  },
  {
    question: "How quickly will I see new reviews appear?",
    answer: "Reviews are strategically posted throughout the month to maintain a natural, organic appearance. You'll typically see new reviews start appearing within the first week of service, with consistent distribution throughout the month."
  },
  {
    question: "Can I customize the content of the reviews?",
    answer: "While we ensure reviews reflect your business accurately, we maintain authenticity by not accepting direct content requests. However, our AI-driven system analyzes your business offerings and customer feedback to generate genuine, relevant review content."
  }
]

export default function ReputationManagementPricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-32">
        <PricingSection 
        title="Reputation Management Pricing"
        description="Build and maintain your online reputation with authentic, high-quality reviews."
        plans={reputationPlans}
        />
      </div>
      <FeaturesSection type="reputation" />
      <FAQSection faqs={reputationFaqs} />
      <FooterSection />
    </div>
  )
}