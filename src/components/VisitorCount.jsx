import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function VisitorCount() {
  const [count, setCount] = useState('...')

  useEffect(() => {
    // We use a free counter API to track hits across the site globally
    fetch('https://api.counterapi.dev/v1/shubhendu-portfolio-app/visits/up')
      .then(res => res.json())
      .then(data => {
        if (data && data.count !== undefined) {
          setCount(data.count.toString())
        }
      })
      .catch(err => {
        console.error("Counter API failed", err)
        setCount('1') // Fallback so it still renders something if blocked
      })
  }, [])

  return (
    <div className="fixed top-24 right-6 md:top-32 md:right-12 z-[9999] bg-black/90 backdrop-blur-md border border-white/10 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold text-[10px] md:text-xs tracking-widest shadow-2xl flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
      <span className="opacity-70">VIEWS:</span>
      <div className="flex gap-[2px]">
        {count.split('').map((digit, i) => (
          <motion.span
            key={i}
            className="inline-block bg-white/20 text-white px-1.5 py-0.5 rounded-sm tabular-nums"
            animate={digit !== '.' ? { 
              y: [0, -3, 0, 3, 0],
              rotate: [0, -5, 5, -5, 0]
            } : {}}
            transition={{
              repeat: Infinity,
              duration: 0.4,
              ease: "linear",
              repeatDelay: 2 + (i * 0.5) // staggered vibration
            }}
          >
            {digit}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
