import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { PricingSection } from "@/components/pricing-section"

export default function AIOPricingPage() {
  return (
    <main className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
      <Header />
      <PricingSection 
        service="aio"
        title="AI Optimization Pricing"
        description="Transform your search rankings with AI-powered SEO optimization"
        prices={{
          starter: 2499,
          professional: 3499,
          enterprise: 4999
        }}
      />
      <FooterSection />
    </main>
  )
}