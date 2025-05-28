import dynamic from 'next/dynamic'
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { PerformanceSection } from "@/components/performance-section"
import { WorkflowSection } from "@/components/workflow-section"
import { Footer } from "@/components/footer"

const FeaturesSection = dynamic(() => import('@/components/features-section'), {
  ssr: true
})

export default function Home() {
  return (
    <main className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
      <Header />
      <Hero />
      <FeaturesSection />
      <Features />
      <PerformanceSection />
      <Testimonials />
      <WorkflowSection />
      <Footer />
    </main>
  )
}