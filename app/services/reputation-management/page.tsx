import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { ReputationHero } from "@/components/reputation/hero-section"
import { ReputationFeatures } from "@/components/reputation/features-section"
import { ReputationMonitor } from "@/components/reputation/monitor-section"
import { ReputationStats } from "@/components/reputation/stats-section"

export default function ReputationManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ReputationHero />
      <div className="relative">
        <ReputationFeatures />
      </div>
      <div className="relative">
        <ReputationMonitor />
      </div>
      <ReputationStats />
      <FooterSection />
    </main>
  )
}