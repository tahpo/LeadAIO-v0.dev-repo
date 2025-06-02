import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { PricingSection } from "@/components/pricing/pricing-section"
import { FAQSection } from "@/components/pricing/faq-section"

const FeaturesSection = dynamic(
  () => import("@/components/pricing/features-section").then(mod => ({ default: mod.FeaturesSection })),
  { ssr: false }
)
const aioPlans = [
  {
    name: "Starter",
    price: 2499,
    description: "Perfect for small businesses looking to improve their SEO.",
    features: [
      "25 AI-Optimized Keywords",
      "1 AI-Powered Blog Article Per Week",
      "Basic SEO Setup & Optimization",
      "High-Quality Backlinks",
      "Google Business Profile Setup",
      "Technical SEO Fixes & Core Web Vitals Optimization",
      "Website Audit & Search Indexing",
      "Monthly Rank Tracking & Reporting"
    ],
    cta: {
      text: "Get Started",
      href: "/signup"
    }
  },
  {
    name: "Professional",
    price: 3499,
    description: "Comprehensive solution for growing businesses.",
    features: [
      "50 AI-Targeted Keywords",
      "2 AI-Powered Blog Articles Per Week",
      "Unlimited AI-Enhanced Web Copy",
      "AIO™ Search Adaptation – 3 custom AI agents",
      "Advanced On-Page SEO Optimization",
      "Authority-Driven Backlink Strategy",
      "AI-Integrated Search Trend Monitoring",
      "Google Business Profile Optimization & Weekly Posting",
      "Enhanced Technical SEO Fixes & Core Web Vitals Optimization",
      "Deep Website Auditing & Performance Enhancements",
      "AI-Powered Competitor & Market Analysis",
      "AI-Enhanced Rank Tracking & Custom SEO Reporting",
      "Digital PR & Link Acquisition Strategy",
      "Toxic Link Disavowing & Backlink Health Management"
    ],
    highlight: true,
    cta: {
      text: "Get Started",
      href: "/signup"
    }
  },
  {
    name: "Enterprise",
    price: 4999,
    description: "Advanced SEO solutions for large organizations.",
    features: [
      "100 AI-Strategized Keywords",
      "4 AI-Powered Blog Articles Per Week",
      "Unlimited AI-Optimized Web Copy",
      "AIO™ Predictive SEO – 5 custom AI agents",
      "Enterprise-Level On-Page SEO Optimization",
      "High-Authority Backlink Acquisition",
      "AI-Driven Search Indexing & Predictive Adjustments",
      "Advanced Schema Implementation for AI Search Ranking",
      "Digital PR & High-Trust Link Building",
      "Real-Time AI SEO Adjustments & Market Adaptation",
      "Multi-Channel SEO Strategy Implementation",
      "Google Business Profile Management & AI-Powered Updates",
      "Comprehensive Technical SEO & Site Performance Optimization",
      "AI-Powered Competitor Tracking & Market Domination",
      "Custom Analytics & Reporting Integration",
      "Priority Support & Dedicated Strategy Sessions"
    ],
    cta: {
      text: "Get Started",
      href: "/signup"
    }
  },
  {
    name: "Enterprise+",
    price: "Custom",
    description: "Tailored solutions for enterprise-scale organizations.",
    features: [
      "Custom AI-Powered Keyword Strategy",
      "Unlimited AI-Generated Content",
      "Enterprise-Grade AIO™ Platform Access",
      "Custom AI Agents Development",
      "Advanced Technical Implementations",
      "Dedicated AI Strategy Team",
      "24/7 Priority Support",
      "Custom Integration Development",
      "Bespoke Reporting Solutions",
      "Executive Strategy Sessions"
    ],
    cta: {
      text: "Contact Sales",
      href: "/contact"
    }
  }
]

const aioFaqs = [
  {
    question: "What makes AIO different from traditional SEO services?",
    answer: "AIO leverages advanced artificial intelligence to continuously analyze, optimize, and adapt your SEO strategy in real-time. Unlike traditional services that rely on manual optimization, our AI-powered platform can process vast amounts of data, identify patterns, and make predictive adjustments to keep you ahead of the competition."
  },
  {
    question: "How quickly can I expect to see results?",
    answer: "While SEO is a long-term strategy, our AI-powered approach typically shows initial improvements within 30-60 days. Significant ranking improvements are often seen within 3-6 months, depending on your industry, competition, and starting point."
  },
  {
    question: "Do you offer custom AI solutions for specific industries?",
    answer: "Yes! Our Enterprise and Enterprise+ plans include custom AI agent development tailored to your industry's specific needs and challenges. These custom solutions are designed to give you a competitive edge in your specific market."
  },
  {
    question: "What's included in the AI-powered content creation?",
    answer: "Our AI content creation includes blog articles, meta descriptions, title tags, and website copy. All content is optimized for search engines while maintaining natural, engaging language that resonates with your audience. Our AI ensures content is both SEO-friendly and valuable to readers."
  },
  {
    question: "Can I upgrade my plan as my business grows?",
    answer: "Absolutely! You can upgrade your plan at any time to access more features and increased capacity. We'll prorate your billing and help you transition smoothly to your new plan with additional training if needed."
  }
]

export default function AIOPricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PricingSection 
        title="AI-Powered SEO Pricing"
        description="Choose the perfect plan to transform your search rankings with AI."
        plans={aioPlans}
      />
      <FeaturesSection type="aio" />
      <FAQSection faqs={aioFaqs} />
      <FooterSection />
    </div>
  )
}