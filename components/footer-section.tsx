"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function FooterSection() {
  return (
    <section className="relative" style={{ marginBottom: 0, paddingBottom: 0 }}>
      {/* Fixed footer wave - made more visible */}
      <div className="relative h-[68px] w-full overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-[68px]" 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 96 1440 224"
          preserveAspectRatio="none"
        >
          <path
            fill="#000000"
            d="M0,0L48,16C96,32,192,64,288,90.7C384,117,480,139,576,117.3C672,96,768,32,864,32C960,32,1056,96,1152,117.3C1248,139,1344,117,1392,106.7L1440,96L1440,224L1392,224C1344,224,1248,224,1152,224C1056,224,960,224,864,224C768,224,672,224,576,224C480,224,384,224,288,224C192,224,96,224,48,224L0,224Z"
          />
        </svg>
      </div>

      <div className="relative z-10 bg-black pt-12 text-white" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-garnett mb-6">Analyze. Visualize. Collaborate.</h2>
            <p className="text-lg text-gray-300 mb-8 font-universal">
              The AI-powered SEO platform for businesses that want to dominate search results.
            </p>
            <a
              href="/signup" 
              className="index-button index-button-primary bg-white text-black hover:bg-gray-100 hover:text-black cta-button flex items-center justify-center gap-2 mx-auto inline-flex"
            >
              Get started - for free <span className="ml-2">→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 border-t border-gray-800">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="text-2xl font-garnett mb-4 block">
                LeadAIO
              </Link>
              <p className="text-gray-400 mb-6 max-w-md font-universal">
                AI-powered SEO platform that helps businesses dominate search results and generate quality leads.
              </p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-full">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-full">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-full">
                  <Linkedin className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-full">
                  <Instagram className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-garnett mb-4">Product</h3>
              <ul className="space-y-2 font-universal">
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-gray-400 hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-gray-400 hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-garnett mb-4">Company</h3>
              <ul className="space-y-2 font-universal">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 pb-0 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-universal mb-4">© 2024 LeadAIO. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0 font-universal">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="pb-10"></div>
        </div>
      </div>
    </section>
  )
}
