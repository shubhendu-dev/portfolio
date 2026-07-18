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
    <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
      <span className="opacity-70">VIEWS:</span>
      <div className="flex gap-[1px]">
        {count.split('').map((digit, i) => (
          <motion.span
            key={i}
            className="inline-block tabular-nums text-black font-bold"
            animate={digit !== '.' ? { 
              y: [0, -2, 0, 2, 0]
            } : {}}
            transition={{
              repeat: Infinity,
              duration: 0.4,
              ease: "linear",
              repeatDelay: 2 + (i * 0.5) 
            }}
          >
            {digit}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
