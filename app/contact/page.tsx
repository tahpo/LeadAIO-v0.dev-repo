import dynamic from "next/dynamic"
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds"
import { Header } from "@/components/header"
const FooterSection = dynamic(() => import("@/components/footer-section").then(mod => ({ default: mod.FooterSection })), { ssr: true })
const ContactForm = dynamic(() => import("@/components/contact-form").then(mod => ({ default: mod.ContactForm })), { ssr: true })
const ContactCards = dynamic(() => import("@/components/contact-cards").then(mod => ({ default: mod.ContactCards })), { ssr: true })
import styles from './contact.module.css'
const BrandsScroll = dynamic(() => import("@/components/brands-scroll").then(mod => ({ default: mod.BrandsScroll })), { ssr: true })

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <GradientBackground
        className="fixed"
        gradientType="radial-gradient"
        gradientSize="125% 125%"
        gradientOrigin="bottom-middle"
        colors={[
          { color: 'rgba(245,87,2,0.15)', stop: '10.5%' },
          { color: 'rgba(245,120,2,0.15)', stop: '16%' },
          { color: 'rgba(245,140,2,0.15)', stop: '17.5%' },
          { color: 'rgba(245,170,100,0.15)', stop: '25%' },
          { color: 'rgba(238,174,202,0.15)', stop: '40%' },
          { color: 'rgba(202,179,214,0.15)', stop: '65%' },
          { color: 'rgba(148,201,233,0.15)', stop: '100%' }
        ]}
        noiseIntensity={1.0}
        noisePatternSize={90}
        noisePatternRefreshInterval={20}
        noisePatternAlpha={20}
      />
      <Header />
      
      <main className="flex-grow pt-16 relative z-10">
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
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <ContactForm />
            </div>
          </div>

          <div className="relative z-10 py-6 -mx-4 px-4">
            <BrandsScroll />
          </div>
        </div>
      </main>

      <div className="relative z-10 mt-auto" style={{ marginBottom: "-1px" }}>
        <FooterSection />
      </div>
    </div>
  )
}