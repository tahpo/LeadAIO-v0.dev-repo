"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
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
          <Link href="#features" className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal whitespace-nowrap">
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal whitespace-nowrap"
          >
            How It Works
          </Link>
          <Link href="/pricing" className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal whitespace-nowrap">
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-universal whitespace-nowrap"
          >
            Testimonials
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