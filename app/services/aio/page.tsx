import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { SEODashboardSection } from "@/components/seo-dashboard-section"

export default function AIOPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-garnett mb-6">
              Artificial Intelligence Optimization
            </h1>
            <p className="text-xl text-gray-600 mb-12 font-universal">
              Harness the power of AI to optimize your search presence and drive more organic traffic to your website.
            </p>
          </div>
        </div>
      </section>
      <SEODashboardSection />
      <FooterSection />
    </main>
  )
}