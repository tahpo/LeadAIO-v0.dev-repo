import { Suspense, lazy } from "react"
import type { Metadata } from "next"
import { Garnett, UniversalSans } from "@/lib/fonts"
const PageWrapper = lazy(() => import("@/components/page-wrapper").then(mod => ({ default: mod.PageWrapper })))
const LoadingSpinner = lazy(() => import("@/components/ui/loading-spinner").then(mod => ({ default: mod.LoadingSpinner })))
import "./globals.css"

export const metadata: Metadata = {
  title: "LeadAIO - AI-Powered SEO That Actually Works",
  description: "Transform your search rankings with AI. Get more traffic, leads, and revenue.",
  generator: 'v0.dev',
  metadataBase: new URL('https://leadaio.com'),
  openGraph: {
    title: 'LeadAIO - AI-Powered SEO That Actually Works',
    description: 'Transform your search rankings with AI. Get more traffic, leads, and revenue.',
    url: 'https://leadaio.com',
    siteName: 'LeadAIO',
    locale: 'en_US',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" className={`h-full ${Garnett.variable} ${UniversalSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="h-full m-0 p-0" suppressHydrationWarning>
        <Suspense fallback={<LoadingSpinner />}>
          <PageWrapper>
            {children}
          </PageWrapper>
        </Suspense>
      </body>
    </html>
  )
}