import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { SEODashboardSection } from "@/components/seo-dashboard-section"
import { motion } from "framer-motion"
import { ArrowRight, Search, Bot, LineChart } from "lucide-react"

export default function AIOPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        
        {/* Floating elements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60 blur-2xl"
        />
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-40 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-60 blur-2xl"
        />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 mb-6"
              >
                <Bot className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered SEO</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl font-garnett mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Artificial Intelligence Optimization
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 mb-12 font-universal"
              >
                Harness the power of AI to optimize your search presence, outrank competitors, 
                and drive more qualified organic traffic to your website.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a href="/contact" className="index-button index-button-primary flex items-center justify-center gap-2">
                  Get started <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#features" className="index-button index-button-secondary">
                  View features
                </a>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="font-garnett">
                    <div className="text-2xl font-semibold">250%</div>
                    <div className="text-gray-600">Traffic Growth</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-universal">
                  Average organic traffic increase for our clients within 6 months
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Bot className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="font-garnett">
                    <div className="text-2xl font-semibold">98%</div>
                    <div className="text-gray-600">AI Accuracy</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-universal">
                  AI-powered recommendations with proven success rate
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <LineChart className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="font-garnett">
                    <div className="text-2xl font-semibold">15x</div>
                    <div className="text-gray-600">ROI Average</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-universal">
                  Return on investment compared to traditional SEO methods
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-garnett mb-4">How AIO Works</h2>
              <p className="text-lg text-gray-600 font-universal">
                Our AI-powered platform analyzes your site and competitors to create a winning SEO strategy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "AI Keyword Research",
                  description: "Discover high-value keywords your competitors are missing using advanced AI analysis",
                  icon: Search,
                  color: "blue"
                },
                {
                  title: "Content Optimization",
                  description: "Generate and optimize content that ranks higher and converts better",
                  icon: Bot,
                  color: "purple"
                },
                {
                  title: "Technical SEO",
                  description: "Automatically identify and fix technical issues holding back your rankings",
                  icon: LineChart,
                  color: "green"
                },
                {
                  title: "Real-time Monitoring",
                  description: "Track rankings and performance with AI-powered insights",
                  icon: LineChart,
                  color: "orange"
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow">
                  <div className={`p-3 bg-${feature.color}-100 rounded-xl w-fit mb-4`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-garnett mb-2">{feature.title}</h3>
                  <p className="text-gray-600 font-universal">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SEODashboardSection />
      <FooterSection />
    </main>
  )
}