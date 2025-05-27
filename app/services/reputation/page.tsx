import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"

export default function ReputationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-garnett mb-6">
              Reputation Management
            </h1>
            <p className="text-xl text-gray-600 mb-12 font-universal">
              Build and maintain a strong online reputation with our comprehensive reputation management services.
            </p>
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}