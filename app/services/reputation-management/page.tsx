import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { ReputationHero } from "@/components/reputation/hero-section"
import { ReputationFeatures } from "@/components/reputation/features-section"
import { ReputationMonitor } from "@/components/reputation/monitor-section"
import { ReputationStats } from "@/components/reputation/stats-section"
const FooterSection = dynamic(() => import("@/components/footer-section").then(mod => ({ default: mod.FooterSection })), { ssr: true })

export default function ReputationManagementPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Header />
      <div className="pt-16">
        <ReputationHero />
      </div>
      <ReputationFeatures />
      <ReputationMonitor />
      <ReputationStats />
      <FooterSection />
    </main>
  )
}