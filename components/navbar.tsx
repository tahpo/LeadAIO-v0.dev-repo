"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
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
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "header-scrolled py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold font-dm-sans">
            LeadAIO
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-brand-orange transition-colors text-sm">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-brand-orange transition-colors text-sm">
              How it works
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-brand-orange transition-colors text-sm">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-brand-orange transition-colors text-sm">
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-sm">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-black hover:bg-gray-800 text-white text-sm">
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-2 p-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-gray-700 hover:text-brand-orange px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-700 hover:text-brand-orange px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it works
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-700 hover:text-brand-orange px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-gray-700 hover:text-brand-orange px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2">
                <Button variant="ghost" asChild className="justify-center">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="bg-black hover:bg-gray-800 text-white justify-center">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
