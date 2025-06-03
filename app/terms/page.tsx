import { Header } from "@/components/header"
import dynamic from "next/dynamic"
const FooterSection = dynamic(() => import("@/components/footer-section").then(mod => ({ default: mod.FooterSection })), { ssr: true })

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-garnett mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">Last updated: March 20, 2024</p>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">1. Agreement to Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using LeadAIO's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">2. Use of Services</h2>
            <p className="text-gray-600 mb-4">You agree to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Provide accurate account information</li>
              <li>Maintain the security of your account</li>
              <li>Use the services in compliance with all applicable laws</li>
              <li>Not engage in any unauthorized or harmful activities</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">3. Subscription and Payments</h2>
            <p className="text-gray-600 mb-4">
              Subscription fees are billed in advance on a monthly or annual basis. You agree to pay all fees associated with your chosen plan.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">4. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content, features, and functionality of our services are owned by LeadAIO and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">5. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              LeadAIO shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">6. Termination</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to terminate or suspend your account and access to the services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-garnett mb-3">7. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service.
            </p>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}