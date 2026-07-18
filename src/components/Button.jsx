import { motion } from 'framer-motion'

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm md:text-[15px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 '

  const variants = {
    primary:
      'bg-black text-white hover:opacity-90 shadow-lg',
    green:
      'bg-gray-100 text-black hover:bg-gray-200 border border-black/10',
  }

  const cls = `${base}${variants[variant] ?? variants.primary} ${className}`

  const MotionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  }

  if (href) {
    return (
      <motion.a href={href} className={cls} {...MotionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" className={cls} onClick={onClick} {...MotionProps}>
      {children}
    </motion.button>
  )
}

