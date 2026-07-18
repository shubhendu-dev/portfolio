import { AnimatePresence, motion } from 'framer-motion'

export default function MobileNav({ open, items, activeId, onNavigate }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute left-0 right-0 top-full z-50 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl mx-3 mt-3"
        >
          <div className="p-2">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => onNavigate(it.id)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition hover:bg-white/10 flex items-center justify-between ${
                  activeId === it.id ? 'text-white' : 'text-white/80'
                }`}
              >
                <span>{it.label}</span>
                {activeId === it.id ? <span className="text-brand">●</span> : <span />}
              </button>
            ))}
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  )
}

