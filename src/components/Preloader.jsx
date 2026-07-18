import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const duration = 800 // 0.8 seconds to reach 100%
    const intervalTime = 16
    const steps = duration / intervalTime
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100)
      setProgress(newProgress)

      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          onComplete()
        }, 200) // brief pause at 100%
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#f4f4f4]"
      initial={{ y: 0 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        {/* Rotating Text Ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" style={{ overflow: 'visible' }}>
            <path
              id="circlePath"
              d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
              fill="none"
            />
            <text>
              <textPath href="#circlePath" className="text-[12px] font-bold tracking-[3px] uppercase fill-black">
                CREATIVE DESIGNER • CREATIVE DESIGNER • 
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Percentage */}
        <div className="absolute text-2xl md:text-3xl font-bold text-black tabular-nums">
          {progress}%
        </div>
      </div>
    </motion.div>
  )
}
