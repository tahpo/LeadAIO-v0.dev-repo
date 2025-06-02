"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingSpinner() {
  const [show, setShow] = useState(false)
  
  useEffect(() => {
    // Only show spinner if load takes longer than 200ms
    const timer = setTimeout(() => setShow(true), 200)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
      >
        <div className="relative">
          <motion.div 
            className="w-12 h-12 border-4 border-gray-200 rounded-full"
            style={{ borderTopColor: "#000" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-black rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}