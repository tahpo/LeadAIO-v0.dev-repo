import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SpeedPerformanceSection } from "@/components/speed-performance-section"
import { WorkflowSection } from "@/components/workflow-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
      <Header />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <SpeedPerformanceSection />
      <TestimonialsSection />
      <WorkflowSection />
      <FooterSection />
    </main>
  )
}
