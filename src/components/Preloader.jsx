import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const duration = 1200
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
        }, 300)
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [onComplete])

  const text = "CREATIVE DESIGNER • CREATIVE DESIGNER • "
  const chars = text.split("")
  const radius = 300

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#f4f4f4] overflow-hidden"
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      style={{ perspective: '1000px' }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Outer 3D Rotating Text Ring */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ 
            rotateY: [0, 360],
            rotateX: [10, -20, 15, -15, 10],
            rotateZ: [0, -10, 15, -5, 0],
            y: [0, -30, 20, -15, 0],
            x: [0, 20, -20, 15, 0]
          }}
          transition={{ 
            rotateY: { repeat: Infinity, duration: 40, ease: "linear" },
            rotateX: { repeat: Infinity, duration: 35, ease: "easeInOut" },
            rotateZ: { repeat: Infinity, duration: 30, ease: "easeInOut" },
            y: { repeat: Infinity, duration: 25, ease: "easeInOut" },
            x: { repeat: Infinity, duration: 28, ease: "easeInOut" }
          }}
        >
          {chars.map((char, i) => (
            <span
              key={`outer-${i}`}
              className="absolute text-4xl md:text-6xl font-black text-black uppercase"
              style={{
                transform: `rotateY(${i * (-360 / chars.length)}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'visible',
              }}
            >
              {char}
            </span>
          ))}
        </motion.div>

        {/* Lower Smaller 3D Rotating Text Ring */}
        <motion.div
          className="absolute flex items-center justify-center mt-32 md:mt-48"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ 
            rotateY: [360, 0],
            rotateX: [-10, 20, -15, 15, -10],
            rotateZ: [10, -5, 0, 15, 10],
            y: [0, 10, -10, 10, 0],
          }}
          transition={{ 
            rotateY: { repeat: Infinity, duration: 35, ease: "linear" },
            rotateX: { repeat: Infinity, duration: 40, ease: "easeInOut" },
            rotateZ: { repeat: Infinity, duration: 35, ease: "easeInOut" },
            y: { repeat: Infinity, duration: 25, ease: "easeInOut" },
          }}
        >
          {chars.map((char, i) => (
            <span
              key={`inner-${i}`}
              className="absolute text-xl md:text-2xl font-bold text-black/60 uppercase"
              style={{
                transform: `rotateY(${i * (-360 / chars.length)}deg) translateZ(${radius - 100}px)`,
                backfaceVisibility: 'visible',
              }}
            >
              {char}
            </span>
          ))}
        </motion.div>

        {/* Percentage Indicator */}
        <motion.div 
          className="absolute bottom-[15%] text-xl font-bold text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  )
}
