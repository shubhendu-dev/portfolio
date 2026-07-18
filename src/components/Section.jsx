import { motion } from 'framer-motion'

export default function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative py-16 md:py-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mx-auto w-[min(1100px,92%)]"
      >
        {children}
      </motion.div>
    </section>
  )
}

