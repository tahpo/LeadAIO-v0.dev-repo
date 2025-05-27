"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropdownProps {
  label: string;
  items: {
    href: string;
    label: string;
  }[];
}

function NavDropdown({ label, items }: DropdownProps) {
  return (
    <div className="relative group">
      <button className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal whitespace-nowrap flex items-center gap-1">
        {label}
        <svg className="h-3 w-3 opacity-50 group-hover:opacity-70 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute top-full left-0 pt-1 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-150">
        <div className="bg-white rounded-lg shadow-xl border border-gray-100/50 py-1.5 min-w-[220px] backdrop-blur-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50/80 hover:text-gray-900 transition-colors font-universal mx-1 rounded-md"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

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
          <NavDropdown 
            label="Services"
            items={[
              { href: "/services/aio", label: "Artificial Intelligence Optimization (AIO)" },
              { href: "/services/reputation-management", label: "Reputation Management" },
              { href: "/services/paid-advertising", label: "Paid Advertising" },
            ]}
          />
          <Link
            href="#how-it-works"
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal whitespace-nowrap"
          >
            How It Works
          </Link>
          <NavDropdown
            label="Pricing"
            items={[
              { href: "/pricing/aio", label: "AIO Pricing" },
              { href: "/pricing/reputation-management", label: "Reputation Management Pricing" },
              { href: "/pricing/paid-advertising", label: "Paid Advertising Pricing" },
            ]}
          />
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
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Services</p>
              <div className="pl-4 space-y-2">
                <Link
                  href="/services/aio"
                  className="block text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Artificial Intelligence Optimization (AIO)
                </Link>
                <Link
                  href="/services/reputation-management"
                  className="block text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reputation Management
                </Link>
                <Link
                  href="/services/paid-advertising"
                  className="block text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Paid Advertising
                </Link>
              </div>
            </div>
            <Link
              href="#how-it-works"
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Pricing</p>
              <div className="pl-4 space-y-2">
                <Link
                  href="/pricing/aio"
                  className="block text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  AIO Pricing
                </Link>
                <Link
                  href="/pricing/reputation-management"
                  className="block text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reputation Management Pricing
                </Link>
                <Link
                  href="/pricing/paid-advertising"
                  className="block text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Paid Advertising Pricing
                </Link>
              </div>
            </div>
            <Link
              href="/contact"
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
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