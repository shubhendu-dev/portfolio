import { useEffect, useState } from 'react'

export default function VisitorCount() {
  const [count, setCount] = useState('...')

  useEffect(() => {
    // We use a free counter API to track hits across the site globally
    fetch('https://api.counterapi.dev/v1/shubhendu-portfolio-app/visits/up')
      .then(res => res.json())
      .then(data => {
        if (data && data.count !== undefined) {
          setCount(data.count)
        }
      })
      .catch(err => {
        console.error("Counter API failed", err)
        setCount('1') // Fallback so it still renders something if blocked
      })
  }, [])

  return (
    <div className="fixed top-6 right-6 md:right-12 z-[100] bg-black text-white px-5 py-2.5 rounded-full font-bold text-[10px] md:text-xs tracking-widest shadow-2xl flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
      PAGE VISITS: {count}
    </div>
  )
}
