import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { PPCHero } from "@/components/ppc/hero-section"
import { PPCFeatures } from "@/components/ppc/features-section"
import { PPCResults } from "@/components/ppc/results-section"

export default function PaidAdvertisingPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Header />
      <PPCHero />
      <PPCFeatures />
      <PPCResults />
      <FooterSection />
    </main>
  )
}