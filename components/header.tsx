"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50", isScrolled ? "header-scrolled" : "header-normal")}>
      <div
        className={cn(
          "container flex items-center justify-between transition-all duration-400",
          isScrolled ? "max-w-4xl" : "max-w-7xl",
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl text-gray-900 font-garnett">LeadAIO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          <div className="relative group">
            <button className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal whitespace-nowrap flex items-center gap-1">
              Services
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/services/aio" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                AI Optimization (AIO)
              </Link>
              <Link href="/services/reputation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Reputation Management
              </Link>
              <Link href="/services/advertising" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Paid Advertising
              </Link>
            </div>
          </div>
          <Link
            href="#how-it-works"
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal whitespace-nowrap"
          >
            How It Works
          </Link>
          <div className="relative group">
            <button className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal whitespace-nowrap flex items-center gap-1">
              Pricing
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/pricing/aio" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                AIO Pricing
              </Link>
              <Link href="/pricing/reputation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Reputation Pricing
              </Link>
              <Link href="/pricing/advertising" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Advertising Pricing
              </Link>
            </div>
          </div>
          <Link href="/contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal whitespace-nowrap">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <a href="/login" className="index-button index-button-secondary text-sm px-3 lg:px-4">
            Log in
          </a>
          <a href="/signup" className="index-button index-button-primary text-sm px-3 lg:px-4">
            Start for free
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            className="p-2 rounded-md text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-lg animate-fade-in mt-2 rounded-xl mx-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <div className="flex flex-col gap-2 mt-4">
              <a href="/login" className="index-button index-button-secondary w-full text-center">
                Log in
              </a>
              <a href="/signup" className="index-button index-button-primary w-full text-center">
                Start for free
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}