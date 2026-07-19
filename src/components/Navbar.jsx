import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'
import MobileNav from './MobileNav'

export default function Navbar({ items, brand, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId] = useState(items?.[0]?.id ?? 'services')

  useEffect(() => {
    const ids = items.map((x) => x.id)
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActiveId(visible.target.id)
      },
      { root: null, threshold: [0.2, 0.35, 0.5] }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [items])

  function navigate(id) {
    setMobileOpen(false)
    onNavigate?.(id)
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 -z-10" />
      <div className="w-[min(1400px,96%)] mx-auto pt-4 pb-3">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between rounded-3xl bg-transparent px-4 md:px-6 py-3"
        >
          <button
            onClick={() => navigate(items?.[0]?.id ?? 'services')}
            className="flex items-center gap-3"
            aria-label="Go to top"
            type="button"
          >
            <div className="text-left">
              <div className="text-black font-black text-xl tracking-wide uppercase leading-none">{brand?.short ?? 'Repair & Build'}</div>
              <div className="text-[13px] text-black/60 mt-1 font-semibold uppercase tracking-wider">PC • Printer • Build • Apps</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-4">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => navigate(it.id)}
                className={`px-3 py-2 rounded-2xl text-[15px] uppercase tracking-[0.15em] font-black transition border border-transparent ${
                  activeId === it.id ? 'text-black' : 'text-black/50 hover:text-black'
                }`}
                type="button"
              >
                {it.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex">
              <Button
                href="tel:+919647530263"
                variant="primary"
                className="whitespace-nowrap shadow-md shadow-brand/20"
              >
                Call Now
                <span aria-hidden>→</span>
              </Button>
            </div>

            <button
              className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-2xl bg-transparent border border-black/20 hover:bg-black/5 transition"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
              type="button"
            >
              <span className="text-black font-bold">☰</span>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <MobileNav open={mobileOpen} items={items} activeId={activeId} onNavigate={navigate} />
      </div>
    </header>
  )
}

