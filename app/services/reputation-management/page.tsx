import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { ReputationHero } from "@/components/reputation/hero-section"
import { ReputationFeatures } from "@/components/reputation/features-section"
import { ReputationStats } from "@/components/reputation/stats-section"
import { ReputationMonitor } from "@/components/reputation/monitor-section"

export default function ReputationManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ReputationHero />
      <ReputationFeatures />
      <ReputationMonitor />
      <ReputationStats />
      <FooterSection />
    </main>
  )
}