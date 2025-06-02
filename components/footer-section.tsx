"use client"

import Link from "next/link"

export function FooterSection() {
  return (
    <section className="relative">
      {/* Fixed footer wave - made more visible */}
      <div className="relative h-24 w-full overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#000000"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 bg-black pt-12 text-white">
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
                <img src="/leadaiologo.png" alt="LeadAIO" className="h-10 w-auto object-contain" />
              </Link>
              <p className="text-gray-400 mb-6 max-w-md font-universal">
                AI-powered SEO platform that helps businesses dominate search results and generate quality leads.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-garnett mb-4">Product</h3>
              <ul className="space-y-2 font-universal">
                <li>
                  <Link href="/services/aio" className="text-gray-400 hover:text-white transition-colors">
                    AI Optimization (AIO)
                  </Link>
                </li>
                <li>
                  <Link href="/services/reputation-management" className="text-gray-400 hover:text-white transition-colors">
                    Reputation Management
                  </Link>
                </li>
                <li>
                  <Link href="/services/paid-advertising" className="text-gray-400 hover:text-white transition-colors">
                    Paid Advertising
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-garnett mb-4">Pricing</h3>
              <ul className="space-y-2 font-universal">
                <li>
                  <Link href="/pricing/aio" className="text-gray-400 hover:text-white transition-colors">
                    AIO Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/pricing/reputation-management" className="text-gray-400 hover:text-white transition-colors">
                    Reputation Management
                  </Link>
                </li>
                <li>
                  <Link href="/pricing/paid-advertising" className="text-gray-400 hover:text-white transition-colors">
                    Paid Advertising
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
          <div className="pb-8"></div>
        </div>
      </div>
    </section>
  )
}
