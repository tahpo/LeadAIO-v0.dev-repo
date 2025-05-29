import React, { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ContainerScrollProps {
  children: React.ReactNode
  className?: string
}

export function ContainerScroll({ children, className = "" }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        opacity,
        scale,
      }}
    >
      {children}
    </motion.div>
  )
}