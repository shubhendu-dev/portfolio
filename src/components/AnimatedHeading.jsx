import { motion } from 'framer-motion'

export default function AnimatedHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}) {
  return (
    <div className={`text-${align} ${align === 'center' ? 'mx-auto' : ''}`}>
      {eyebrow ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm tracking-widest uppercase text-black/60"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-black"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
          className="mt-3 text-black/70 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  )
}

