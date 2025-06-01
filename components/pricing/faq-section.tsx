export type FAQ = {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-garnett text-center mb-12">Frequently asked questions</h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-garnett mb-3">{faq.question}</h3>
              <p className="text-gray-600 font-universal">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4 font-universal">Still have questions?</p>
          <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
            <Link href="/contact">Contact our team</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}