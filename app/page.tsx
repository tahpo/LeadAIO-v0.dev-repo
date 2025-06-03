import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"

const FooterSection = dynamic(() => import("@/components/footer-section").then(mod => ({ default: mod.FooterSection })), { ssr: true })
const FeaturesSection = dynamic(() => import("@/components/features-section").then(mod => ({ default: mod.FeaturesSection })), { ssr: true })
const HowItWorks = dynamic(() => import("@/components/how-it-works").then(mod => ({ default: mod.HowItWorks })), { ssr: true })
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })), { ssr: true })
const SpeedPerformanceSection = dynamic(() => import("@/components/speed-performance-section").then(mod => ({ default: mod.SpeedPerformanceSection })), { ssr: true })
const WorkflowSection = dynamic(() => import("@/components/workflow-section").then(mod => ({ default: mod.WorkflowSection })), { ssr: true })

export default function Home() {
  return (
    <main className="min-h-screen bg-white pt-28" style={{ margin: 0, padding: 0 }}>
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
