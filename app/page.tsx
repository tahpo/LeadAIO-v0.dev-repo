import dynamic from 'next/dynamic'
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SpeedPerformanceSection } from "@/components/speed-performance-section"
import { WorkflowSection } from "@/components/workflow-section"
import { FooterSection } from "@/components/footer-section"

const FeaturesSection = dynamic(() => import('@/components/features-section'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <SpeedPerformanceSection />
      <TestimonialsSection />
      <WorkflowSection />
      <FooterSection />
    </main>
  )
}
