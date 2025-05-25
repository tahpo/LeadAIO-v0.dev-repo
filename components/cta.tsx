import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-6">Ready to dominate search results?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of businesses already growing their traffic and revenue with LeadAIO
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
            <Link href="/signup">
              Start free trial <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-indigo-600"
          >
            <Link href="/demo">Schedule demo</Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-80">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            14-day free trial
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            No credit card required
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Cancel anytime
          </div>
        </div>
      </div>
    </section>
  )
}
