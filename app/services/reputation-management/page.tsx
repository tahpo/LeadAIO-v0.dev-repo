import dynamic from 'next/dynamic'
import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"

// Dynamically import components with client-side only rendering
const ReputationHero = dynamic(() => import("@/components/reputation/hero-section").then(mod => ({ default: mod.ReputationHero })), { ssr: false })
const ReputationFeatures = dynamic(() => import("@/components/reputation/features-section").then(mod => ({ default: mod.ReputationFeatures })), { ssr: false })
const ReputationMonitor = dynamic(() => import("@/components/reputation/monitor-section").then(mod => ({ default: mod.ReputationMonitor })), { ssr: false })
const ReputationStats = dynamic(() => import("@/components/reputation/stats-section").then(mod => ({ default: mod.ReputationStats })), { ssr: false })

export default function ReputationManagementPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Header />
      <ReputationHero />
      <ReputationFeatures />
      <ReputationMonitor />
      <ReputationStats />
      <FooterSection />
    </main>
  )
}