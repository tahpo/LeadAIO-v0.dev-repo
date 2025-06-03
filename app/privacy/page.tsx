import { Header } from "@/components/header"
import dynamic from "next/dynamic"
const FooterSection = dynamic(() => import("@/components/footer-section").then(mod => ({ default: mod.FooterSection })), { ssr: true })

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-garnett mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">Last updated: March 20, 2024</p>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Website and business information</li>
              <li>Payment information</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Provide and improve our services</li>
              <li>Process your payments</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">3. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">4. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">5. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at privacy@leadaio.com
            </p>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}