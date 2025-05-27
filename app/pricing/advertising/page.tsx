import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { PricingSection } from "@/components/pricing-section"

export default function AdvertisingPricingPage() {
  return (
    <main className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
      <Header />
      <PricingSection 
        service="advertising"
        title="Paid Advertising Pricing"
        description="Strategic PPC and AdWords campaigns that drive results"
        prices={{
          starter: 2499,
          commitment: 6,
          professional: null,
          enterprise: null
        }}
      />
      <FooterSection />
    </main>
  )
}