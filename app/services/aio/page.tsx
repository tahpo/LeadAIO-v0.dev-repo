import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AIOHero } from "@/components/aio/hero-section"
import { AIODashboard } from "@/components/aio/dashboard-section"
import { AIOAnalytics } from "@/components/aio/analytics-section"
import { AIOOptimization } from "@/components/aio/optimization-section"

export default function AIOPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="relative">
        <AIOHero />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <AIODashboard />
        </div>
      </div>
      <AIOAnalytics />
      <AIOOptimization />
      <FooterSection />
    </main>
  )
}