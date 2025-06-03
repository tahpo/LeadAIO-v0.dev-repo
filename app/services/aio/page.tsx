import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { AIOHero } from "@/components/aio/hero-section"
import { AIODashboard } from "@/components/aio/dashboard-section"
import { AIOAnalytics } from "@/components/aio/analytics-section"
import { AIOOptimization } from "@/components/aio/optimization-section"
import styles from './aio.module.css'
const FooterSection = dynamic(() => import("@/components/footer-section").then(mod => ({ default: mod.FooterSection })), { ssr: true })

export default function AIOPage() {
  return (
    <main className="min-h-screen bg-cream" style={{ margin: 0, padding: 0 }}>
      <Header />
      <div className="relative -mb-24">
        <div className="pt-16">
          <AIOHero />
        </div>
        <div className={`relative z-10 ${styles.dashboardContainer}`}>
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