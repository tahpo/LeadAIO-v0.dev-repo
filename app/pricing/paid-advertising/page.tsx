import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { PricingSection } from "@/components/pricing/pricing-section"
import { FAQSection } from "@/components/pricing/faq-section"

const paidAdvertisingPlans = [
  {
    name: "AI-Powered PPC Management",
    price: 2499,
    description: "Comprehensive PPC management solution for businesses looking to maximize their advertising ROI.",
    commitment: "6-month commitment required",
    features: [
      "Monthly Ad Budget up to $25,000",
      "Fully managed PPC campaigns",
      "Dedicated PPC strategist",
      "AI-powered bid management",
      "Comprehensive conversion tracking",
      "Weekly performance optimization",
      "Custom reporting dashboard",
      "Search & Display ad campaigns",
      "AI-driven keyword research",
      "Professional ad copy & design",
      "Video & remarketing campaigns",
      "Negative keyword filtering",
      "Advanced audience segmentation",
      "Strategic ad scheduling"
    ],
    highlight: true,
    cta: {
      text: "Get Started",
      href: "/signup"
    }
  }
]

const paidAdvertisingFaqs = [
  {
    question: "What's included in the monthly ad budget?",
    answer: "The monthly ad budget of up to $25,000 covers your actual ad spend on platforms like Google Ads and Microsoft Advertising. This is separate from our management fee and goes directly to the advertising platforms for your campaigns."
  },
  {
    question: "Why is there a 6-month commitment?",
    answer: "PPC campaigns require time to optimize and achieve maximum ROI. The 6-month commitment allows us to fully implement our strategy, gather sufficient data, and make data-driven optimizations to achieve the best possible results for your campaigns."
  },
  {
    question: "How does the AI-powered bid management work?",
    answer: "Our AI system continuously analyzes campaign performance, competitor behavior, and market trends to automatically adjust bids in real-time. This ensures you're always getting the best possible ROI while maintaining optimal ad positions and conversion rates."
  },
  {
    question: "What platforms do you manage ads on?",
    answer: "We manage campaigns across all major advertising platforms including Google Ads, Microsoft Advertising (Bing), Meta Ads (Facebook/Instagram), LinkedIn Ads, and YouTube. Our team will recommend the best platform mix based on your business goals and target audience."
  },
  {
    question: "How often will I receive performance reports?",
    answer: "You'll have access to a real-time custom reporting dashboard, plus weekly performance updates from your dedicated PPC strategist. We also provide detailed monthly reports with comprehensive analysis and recommendations."
  }
]

export default function PaidAdvertisingPricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PricingSection 
        title="PPC Management Pricing"
        description="Transform your paid advertising with AI-powered campaign management."
        plans={paidAdvertisingPlans}
      />
      <FAQSection faqs={paidAdvertisingFaqs} />
      <FooterSection />
    </div>
  )
}