import { Header } from "@/components/header"
import { PPCHero } from "@/components/ppc/hero-section"
import { PPCFeatures } from "@/components/ppc/features-section"
import { PPCResults } from "@/components/ppc/results-section"
const FooterSection = dynamic(() => import("@/components/footer-section").then(mod => ({ default: mod.FooterSection })), { ssr: true })

export default function PaidAdvertisingPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Header />
      <PPCHero />
      <PPCResults />
      <PPCFeatures />
      <FooterSection />
    </main>
  )
}