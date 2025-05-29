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
      <AIOHero />
      <AIODashboard />
      <AIOAnalytics />
      <AIOOptimization />
      <FooterSection />
    </main>
  )
}