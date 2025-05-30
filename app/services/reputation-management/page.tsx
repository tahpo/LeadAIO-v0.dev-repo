import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { ReputationHero } from "@/components/reputation/hero-section"
import { ReputationFeatures } from "@/components/reputation/features-section"
import { ReputationMonitor } from "@/components/reputation/monitor-section"
import { ReputationTestimonials } from "@/components/reputation/testimonials-section"
import { ReputationProcess } from "@/components/reputation/process-section"

export default function ReputationManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ReputationHero />
      <ReputationFeatures />
      <ReputationMonitor />
      <ReputationTestimonials />
      <ReputationProcess />
      <FooterSection />
    </main>
  )
}