import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { ContactForm } from "@/components/contact-form"
import { ContactCards } from "@/components/contact-cards"
import { BrandsScroll } from "@/components/brands-scroll"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Main content */}
      <main className="flex-grow pt-28">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            {/* Left Column - Title */}
            <div className="lg:pt-12">
              <h1 className="text-4xl md:text-5xl font-garnett mb-6">Let's talk about your project</h1> 
              <p className="text-lg text-gray-600 max-w-xl font-universal">
                Ready to take your search rankings to the next level? We're here to help you achieve your SEO goals.
              </p>
              
              <ContactCards />
            </div>

            {/* Right Column - Contact Form */}
            <ContactForm />
          </div>

          {/* Brands Section */}
          <BrandsScroll />
        </div>
      </main>

      <FooterSection />
    </div>
  )
}