"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for charts
const rankingData = [
  { month: "Jan", position: 18 },
  { month: "Feb", position: 15 },
  { month: "Mar", position: 12 },
  { month: "Apr", position: 8 },
  { month: "May", position: 5 },
  { month: "Jun", position: 3 },
  { month: "Jul", position: 2 },
]

const trafficData = [
  { month: "Jan", organic: 1200, direct: 900 },
  { month: "Feb", organic: 1800, direct: 1200 },
  { month: "Mar", organic: 2400, direct: 1400 },
  { month: "Apr", organic: 3600, direct: 1800 },
  { month: "May", organic: 4800, direct: 2000 },
  { month: "Jun", organic: 5900, direct: 2200 },
  { month: "Jul", organic: 7200, direct: 2400 },
]

const conversionData = [
  { month: "Jan", rate: 1.2 },
  { month: "Feb", rate: 1.8 },
  { month: "Mar", rate: 2.1 },
  { month: "Apr", rate: 2.8 },
  { month: "May", rate: 3.2 },
  { month: "Jun", rate: 3.8 },
  { month: "Jul", rate: 4.5 },
]

const keywordData = [
  { name: "Ranking 1-3", value: 24 },
  { name: "Ranking 4-10", value: 45 },
  { name: "Ranking 11-20", value: 78 },
  { name: "Ranking 21-50", value: 120 },
]

const COLORS = ["#4361EE", "#7209B7", "#F72585", "#4CC9F0"]

export function DashboardSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [200, 0])

  const [activeIndex, setActiveIndex] = useState(0)

  // Simulate speedometer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rankingData.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={containerRef} className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visualize your SEO success</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful analytics that show exactly how LeadAIO is transforming your search presence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div style={{ y: y1 }}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Keyword Rankings</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rankingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis reversed domain={[1, 20]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="position"
                        stroke="#4361EE"
                        strokeWidth={3}
                        dot={{ r: 6 }}
                        activeDot={{ r: 8 }}
                        name="Avg. Position"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div style={{ y: y2 }}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Organic Traffic Growth</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="organic"
                        stackId="1"
                        stroke="#4361EE"
                        fill="#4361EE"
                        fillOpacity={0.6}
                        name="Organic Traffic"
                      />
                      <Area
                        type="monotone"
                        dataKey="direct"
                        stackId="1"
                        stroke="#7209B7"
                        fill="#7209B7"
                        fillOpacity={0.6}
                        name="Direct Traffic"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div style={{ y: y3 }}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Conversion Rate</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conversionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="rate" fill="#F72585" name="Conversion Rate (%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div style={{ y: y1 }}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Keyword Distribution</h3>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={keywordData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {keywordData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <Card className="max-w-md w-full">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold">SEO Performance Score</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your site is performing better than 92% of competitors
                </p>
              </div>

              <div className="relative h-[200px] w-[200px] mx-auto">
                {/* Speedometer background */}
                <div className="absolute inset-0 rounded-full border-[20px] border-gray-200 dark:border-gray-700"></div>

                {/* Speedometer fill */}
                <div
                  className="absolute inset-0 rounded-full border-[20px] border-transparent"
                  style={{
                    borderTopColor: "#4361EE",
                    borderRightColor: "#4361EE",
                    borderLeftColor: activeIndex >= 4 ? "#4361EE" : "transparent",
                    transform: `rotate(${45 + activeIndex * 40}deg)`,
                  }}
                ></div>

                {/* Speedometer center and value */}
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold">{85 + activeIndex * 2}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">/ 100</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}