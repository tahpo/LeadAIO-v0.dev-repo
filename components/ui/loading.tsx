"use client"

import { useEffect, useState } from "react"

export function LoadingBar() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const handleStart = () => {
      setIsVisible(true)
      setProgress(0)
      
      // Quickly move to 30%
      timeout = setTimeout(() => {
        setProgress(30)
        
        // Then slowly progress to 90%
        timeout = setTimeout(() => {
          setProgress(90)
        }, 500)
      }, 100)
    }

    const handleComplete = () => {
      setProgress(100)
      // Fade out after reaching 100%
      setTimeout(() => {
        setIsVisible(false)
        setProgress(0)
      }, 200)
    }

    // Listen for route change events
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleStart)
      window.addEventListener("load", handleComplete)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleStart)
        window.removeEventListener("load", handleComplete)
      }
      if (timeout) clearTimeout(timeout)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div
        className="h-full bg-orange-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}