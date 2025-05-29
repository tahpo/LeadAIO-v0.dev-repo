import * as React from "react"
import { cn } from "@/lib/utils"

interface GaugeProps {
  value: number
  size?: "sm" | "md" | "lg" | "xl"
  showValue?: boolean
  valueLabel?: string
  variant?: "default" | "gradient"
  gradientColors?: [string, string]
  className?: string
}

export function Gauge({
  value,
  size = "md",
  showValue = false,
  valueLabel,
  variant = "default",
  gradientColors = ["#4361EE", "#7209B7"],
  className,
}: GaugeProps) {
  const circumference = 332 // 2 * Math.PI * (53 / 2)
  const displayValue = Math.min(100, Math.max(0, value))
  const progress = (displayValue / 100) * circumference

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40",
    xl: "w-48 h-48",
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox="0 0 120 120"
      >
        <defs>
          {variant === "gradient" && (
            <linearGradient id="gaugeGradient\" x1="0%\" y1="0%\" x2="100%\" y2="0%">
              <stop offset="0%\" stopColor={gradientColors[0]} />
              <stop offset="100%" stopColor={gradientColors[1]} />
            </linearGradient>
          )}
        </defs>
        
        <circle
          className="text-gray-200"
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          r="53"
          cx="60"
          cy="60"
        />
        
        <circle
          className={cn(
            variant === "default" ? "text-blue-500" : "stroke-[url(#gaugeGradient)]",
            "transition-all duration-1000 ease-in-out"
          )}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="53"
          cx="60"
          cy="60"
        />
      </svg>
      
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold">{displayValue}%</span>
          {valueLabel && (
            <span className="text-sm text-gray-500 mt-1">{valueLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}