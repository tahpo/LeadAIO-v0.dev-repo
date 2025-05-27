import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
      <Header />
      <section className="py-32 mt-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-garnett font-medium mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-universal">
              Get in touch with our team to learn more about how we can help grow your business.
            </p>
          </div>
          
          {/* Contact form will go here */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
              <p className="text-center text-gray-600 font-universal">Contact form coming soon...</p>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}