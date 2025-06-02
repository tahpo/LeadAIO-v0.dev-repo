import type React from "react"
import type { Metadata } from "next"
import { LoadingBar } from "@/components/ui/loading"
import "./globals.css"

export const metadata: Metadata = {
  title: "LeadAIO - AI-Powered SEO That Actually Works",
  description: "Transform your search rankings with AI. Get more traffic, leads, and revenue.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Universal Sans fonts */}
        <link rel="preload" href="/fonts/universal-sans-500.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/universal-sans-600.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/universal-sans-850.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/fonts/universal-sans-display-500.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* Garnett fonts - prioritize Medium weight */}
        <link rel="preload" href="/fonts/garnett-medium.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/garnett-regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/garnett-semibold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </head>
      <body className="h-full m-0 p-0" suppressHydrationWarning>
        <LoadingBar />
        {children}
      </body>
    </html>
  )
}