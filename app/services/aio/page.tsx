import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AIOHero } from "@/components/aio/hero-section"
import { AIOFeatures } from "@/components/aio/features-section"
import { AIOWorkflow } from "@/components/aio/workflow-section"
import { AIOResults } from "@/components/aio/results-section"
import { CTASection } from "@/components/cta-section"

export default function AIOPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AIOHero />
      <AIOFeatures />
      <AIOWorkflow />
      <AIOResults />
      <CTASection />
      <FooterSection />
    </main>
  )
}