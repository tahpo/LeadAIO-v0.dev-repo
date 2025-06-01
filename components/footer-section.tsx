"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function FooterSection() {
  return (
    <section className="relative pt-15 bg-white" style={{ marginBottom: 0, paddingBottom: 0 }}>
      {/* Fixed footer wave - made more visible */}
      <div className="relative h-24 w-full overflow-hidden bg-transparent">
        <svg
          className="absolute bottom-0 w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#000000"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

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
