import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { PricingSection } from "@/components/pricing-section"

export default function ReputationPricingPage() {
  return (
    <main className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
      <Header />
      <PricingSection 
        service="reputation"
        title="Reputation Management Pricing"
        description="Build and maintain your online reputation with our comprehensive services"
        prices={{
          starter: 499,
          professional: 799,
          enterprise: 999
        }}
      />
      <FooterSection />
    </main>
  )
}