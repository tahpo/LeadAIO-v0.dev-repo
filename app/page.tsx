import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"

const FooterSection = dynamic(() => import("@/components/footer-section"), { ssr: false })
const FeaturesSection = dynamic(() => import("@/components/features-section"), { ssr: false })
const HowItWorks = dynamic(() => import("@/components/how-it-works"), { ssr: false })
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"), { ssr: false })
const SpeedPerformanceSection = dynamic(() => import("@/components/speed-performance-section"), { ssr: false })
const WorkflowSection = dynamic(() => import("@/components/workflow-section"), { ssr: false })

export default async function Home() {
  return (
    <main className="min-h-screen bg-white relative" style={{ margin: 0, padding: 0 }}>
      <Header />
      <HeroSection />
      <Suspense fallback={null}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={null}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={null}>
        <SpeedPerformanceSection />
      </Suspense>
      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={null}>
        <WorkflowSection />
      </Suspense>
      <FooterSection />
    </main>
  )
}
