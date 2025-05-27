import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"

export default function AdvertisingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-garnett mb-6">
              Paid Advertising
            </h1>
            <p className="text-xl text-gray-600 mb-12 font-universal">
              Drive targeted traffic and maximize ROI with our strategic PPC and AdWords campaigns.
            </p>
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}