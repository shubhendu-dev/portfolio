import { AnimatePresence, motion } from 'framer-motion'

const sectionColors = {
  services: '#3b82f6', // blue
  portfolio: '#8b5cf6', // violet
  skills: '#10b981', // emerald
  contact: '#f59e0b', // amber
  process: '#ec4899', // pink
}

export default function SectionTransition({ active, section }) {
  const color = sectionColors[section] || '#000000'
  const title = section ? section.toUpperCase() : ''

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{ backgroundColor: color }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-white text-4xl md:text-6xl font-black tracking-widest uppercase"
          >
            {title}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
