import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AIOHero } from "@/components/aio/hero-section"
import { AIODashboard } from "@/components/aio/dashboard-section"
import { AIOAnalytics } from "@/components/aio/analytics-section"
import { AIOOptimization } from "@/components/aio/optimization-section"

export default function AIOPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <div className="relative -mb-24">
        <AIOHero />
        <div className="relative z-10">
          <AIODashboard />
        </div>
      </div>
      <AIOAnalytics />
      <AIOOptimization />
      <div className="relative">
        <div className="absolute inset-0 bg-[#faf9f6]" />
        <FooterSection />
      </div>
    </main>
  )
}