import { useEffect, useMemo, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Section from './components/Section'
import AnimatedHeading from './components/AnimatedHeading'
import Button from './components/Button'
import Preloader from './components/Preloader'
import SectionTransition from './components/SectionTransition'
import VisitorCount from './components/VisitorCount'
import { Mail, MapPin, Phone } from 'lucide-react'
import { SiGmail, SiInstagram, SiFacebook } from 'react-icons/si'
import {
  brand,
  navItems,
  services,
  portfolioItems,
  skills,
  processSteps,
} from './data/content'


function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-black/80 shadow-sm">
      {children}
    </span>
  )
}

function Modal({ open, onClose, item }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-[min(900px,96%)] rounded-3xl border border-black/10 bg-white/95 p-5 md:p-7 overflow-hidden shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex gap-2 flex-wrap">
                  <Chip>{item.tag}</Chip>
                </div>
                <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-black">
                  {item.title}
                </h3>
                <p className="mt-3 text-black/70 max-w-2xl">{item.desc}</p>
              </div>
              <button
                onClick={onClose}
                className="h-11 w-11 rounded-2xl bg-gray-100 border border-black/10 hover:bg-gray-200 transition text-black"
                type="button"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-3xl bg-gray-50 border border-black/10 p-4">
                <div className="text-xs uppercase tracking-widest text-black/60">
                  What we did
                </div>
                <ul className="mt-3 space-y-2 text-black/80 text-sm">
                  <li>• Diagnosis & setup planning</li>
                  <li>• Clean installation / driver fixing</li>
                  <li>• Testing for speed + stability</li>
                  <li>• Delivery support</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-gray-50 border border-black/10 p-4">
                <div className="text-xs uppercase tracking-widest text-black/60">
                  Tech stack
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip>React</Chip>
                  <Chip>Node/Express</Chip>
                  <Chip>Python</Chip>
                  <Chip>Power BI</Chip>
                </div>
                <p className="mt-3 text-black/70 text-sm">
                  Tailored to your problem — repair services + modern automation.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="text-xs text-black/60">
                Replace placeholders with your real case studies later.
              </div>
              <div className="flex gap-2">
                <Button variant="primary" href="tel:+919647530263">
                  Book Repair
                </Button>
                <Button
                  variant="green"
                  href="#contact"
                  className="scroll-smooth"
                  onClick={(e) => {
                    e?.preventDefault?.()
                    onClose()
                    setTimeout(() => scrollToId('contact'), 80)
                  }}
                >
                  Contact
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default function App() {
  const [selected, setSelected] = useState(null)
  const modalOpen = Boolean(selected)
  const [isLoaded, setIsLoaded] = useState(false)
  const [transitionState, setTransitionState] = useState({ active: false, section: null })

  const fileInputRef = useRef(null)
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150')

  const handleNavigate = (id) => {
    if (id === 'home' || id === '') {
      scrollToId(id)
      return
    }

    setTransitionState({ active: true, section: id })

    setTimeout(() => {
      scrollToId(id)
      setTimeout(() => {
        setTransitionState({ active: false, section: null })
      }, 600)
    }, 800)
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setAvatar(event.target.result)
      reader.readAsDataURL(file)
    }
  }

  const quickStats = useMemo(
    () => [
      { k: '24–48h', v: 'Typical turnaround' },
      { k: 'PC • Printer', v: 'Repair + setup' },
      { k: 'Custom Build', v: 'Game PC assembly' },
    ],
    []
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen">
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      <SectionTransition active={transitionState.active} section={transitionState.section} />

      {/* NEW LIGHT THEME HERO */}
      <section className="relative min-h-screen bg-[#f4f4f4] text-black overflow-hidden flex flex-col pt-6 px-6 lg:px-12 font-['Outfit'] z-10">
        {/* Custom Nav for Hero */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-between items-start text-sm md:text-base font-semibold tracking-widest uppercase mb-auto z-20"
        >
          <div className="w-1/3 leading-tight">
            SHUBHENDU NATH<br />BISWAS
          </div>
          <div className="hidden md:flex gap-4 lg:gap-8 w-1/3 justify-center text-xs lg:text-sm">
            <a href="#services" className="hover:opacity-60 transition whitespace-nowrap" onClick={(e) => { e.preventDefault(); handleNavigate('services') }}>[ SERVICES ]</a>
            <a href="#portfolio" className="hover:opacity-60 transition whitespace-nowrap" onClick={(e) => { e.preventDefault(); handleNavigate('portfolio') }}>[ PROJECTS ]</a>
            <a href="#skills" className="hover:opacity-60 transition whitespace-nowrap" onClick={(e) => { e.preventDefault(); handleNavigate('skills') }}>[ SKILLS ]</a>
            <a href="#contact" className="hover:opacity-60 transition whitespace-nowrap" onClick={(e) => { e.preventDefault(); handleNavigate('contact') }}>[ CONNECT ]</a>
          </div>
          <div className="w-1/3 flex items-center justify-end gap-4 md:gap-8">
            <VisitorCount />
            <a href="#contact" className="hover:opacity-60 transition" onClick={(e) => { e.preventDefault(); handleNavigate('contact') }}>CONTACT ME ↗</a>
          </div>
        </motion.nav>

        {/* Central Content */}
        <div className="relative flex-grow flex flex-col items-center justify-center mt-8 md:-mt-10 z-10">
          <div className="absolute top-[-5%] md:top-[10%] left-[5%] md:left-[10%] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">I AM</div>

          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-6 md:mt-0 flex flex-wrap justify-center text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] whitespace-nowrap text-center leading-none font-black tracking-tighter text-black uppercase z-20 mix-blend-difference"
          >
            {"CREATIVE DESIGNER".split("").map((char, i) => {
              // Create a staggered/scattered baseline effect
              const offsets = [0, 8, -12, 10, -5, 15, -8, 5, 0, -15, 12, -10, 8, -5, 15, -12, 0]
              const isOutline = i < 8 // "CREATIVE" is outlined
              return (
                <span 
                  key={i} 
                  style={{ 
                    transform: `translateY(${offsets[i] || 0}px)`,
                    WebkitTextStroke: isOutline ? '2px black' : '0',
                    color: isOutline ? 'transparent' : 'black',
                    display: 'inline-block'
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              )
            })}
          </motion.h1>

          <div className="relative mt-8 md:mt-12 w-[150px] md:w-[220px] h-[200px] md:h-[280px] z-10 overflow-hidden shadow-2xl rounded-sm">
            <motion.img
              initial={{ y: '-100%' }}
              animate={{ y: isLoaded ? 0 : '-100%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              src="/profile.avif"
              alt="Shubhendu Nath Biswas"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop' }}
            />
          </div>

          <div className="absolute right-[5%] md:right-[10%] top-[45%] hidden md:block text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">
            BASED IN INDIA
          </div>
        </div>

        {/* Bottom Elements */}
        <div className="relative flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 lg:gap-0 pb-8 z-0 text-xs md:text-sm font-bold tracking-widest uppercase mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-col gap-1 w-full lg:w-1/3 text-center lg:text-left items-center lg:items-start"
          >
            <div>/ WEB DEVELOPMENT</div>
            <div>/ APP DESIGN (UI/UX)</div>
            <div>/ HARDWARE & NETWORKS</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="w-full lg:w-1/3 text-center leading-relaxed opacity-70"
          >
            I'M AN EXPERIENCED DEVELOPER AND DESIGNER, WHO BUILDS MEMORABLE EXPERIENCES FOR BRANDS OF ALL SIZES
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="w-full lg:w-1/3 flex flex-col items-center lg:items-end"
          >
            <div className="mb-2">AVAILABLE FOR COLLABORATION ↘</div>
            <a href="mailto:01234sumon@gmail.com" className="lowercase font-semibold flex items-center gap-2 hover:opacity-70 transition border-b border-transparent hover:border-black pb-0.5">
              <SiGmail size={14} /> 01234sumon@gmail.com
            </a>
            <a href="#" className="lowercase font-semibold flex items-center gap-2 mt-1 hover:opacity-70 transition border-b border-transparent hover:border-black pb-0.5">
              <SiInstagram size={14} /> shubhendu00
            </a>
            <a href="#" className="lowercase font-semibold flex items-center gap-2 mt-1 hover:opacity-70 transition border-b border-transparent hover:border-black pb-0.5">
              <SiFacebook size={14} /> shubhendu00
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main layout sticky navbar for the dark mode sections below */}
      <div className="sticky top-0 z-50">
        <Navbar items={navItems} brand={brand} onNavigate={handleNavigate} />
      </div>

      <Section id="services">
        <AnimatedHeading
          eyebrow="Repair Services"
          title="Fast diagnosis, clean fixes, and reliable performance"
          subtitle="PC/laptop repair, printer/xerox/scanner setup, upgrades, and custom game PC assembly—plus tech development and automation dashboards."
        />

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {services.map((s, idx) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.04 }}
              className="group rounded-[2rem] bg-white border border-black/10 overflow-hidden hover:bg-gray-50 transition flex flex-col shadow-sm"
            >
              <div className="h-48 w-full overflow-hidden relative">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-5">
                  <div className="text-3xl mr-3">{s.icon}</div>
                  <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-black font-extrabold text-sm leading-relaxed">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-black font-extrabold text-sm mb-6">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand mt-px" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button
                    variant="primary"
                    href="tel:+919647530263"
                    className="w-full"
                  >
                    Request a Quote
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="portfolio">
        <AnimatedHeading
          eyebrow="Portfolio"
          title="Repair work + builds + software projects"
          subtitle="Animated project cards with a modal preview. Replace placeholders with your real photos and case studies anytime."
          align="left"
        />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map((p, idx) => (
            <motion.button
              key={p.title}
              type="button"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.04 }}
              className="text-left rounded-[2rem] bg-white border border-black/10 overflow-hidden hover:bg-gray-50 transition group flex flex-col shadow-sm"
              onClick={() => setSelected(p)}
            >
              <div className="h-40 w-full overflow-hidden relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 left-3">
                  <Chip>{p.tag}</Chip>
                </div>
                <div className="absolute top-3 right-3 text-black/60 bg-white/60 backdrop-blur p-2 rounded-full">↗</div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-black group-hover:text-black/80 transition">{p.title}</h3>
                <p className="mt-2 text-black/70 text-sm leading-relaxed line-clamp-2">{p.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <Modal open={modalOpen} item={selected ?? portfolioItems[0]} onClose={() => setSelected(null)} />
      </Section>

      <Section id="skills" className="pt-0">
        <AnimatedHeading
          eyebrow="Tech Skills"
          title="Web, apps, AI/ML, automation, and dashboards"
          subtitle="Animations included: skill chips + progress bars."
        />

        <div className="mt-10 grid lg:grid-cols-3 gap-4">
          {skills.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.03 }}
              className="rounded-[2rem] bg-white border border-black/10 p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-black font-semibold">{s.label}</div>
                  <div className="text-xs text-black/60 mt-1">Confidence: {s.value}%</div>
                </div>
                <div className="h-11 w-11 rounded-2xl bg-gray-100 border border-black/10 flex items-center justify-center text-black">
                  ⚙️
                </div>
              </div>

              <div className="mt-5">
                <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="h-full rounded-full bg-black"
                  />
                </div>
                <div className="mt-3 text-xs text-black/60">High-impact delivery for real tasks.</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 rounded-[2rem] bg-gray-100 border border-black/10 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-black font-semibold text-lg">Need a repair or a development project?</div>
              <div className="mt-1 text-black/70 text-sm">
                We can do both: fix devices and build tools that improve your workflow.
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button href="tel:+919647530263" variant="green">Repair Booking</Button>
              <Button href="mailto:01234sumon@gmail.com" variant="primary">Email</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section id="process" className="pt-0">
        <AnimatedHeading
          eyebrow="Process"
          title="How we work (simple and reliable)"
          subtitle="A clear flow—from diagnosis to testing and support."
        />

        <div className="mt-10 grid md:grid-cols-4 gap-4">
          {processSteps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="rounded-[2rem] bg-white border border-black/10 p-5 shadow-sm"
            >
              <div className="text-black/60 text-xs uppercase tracking-widest">Step {idx + 1}</div>
              <div className="mt-2 text-black font-semibold text-lg">{s.title}</div>
              <div className="mt-2 text-black/70 text-sm leading-relaxed">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="contact" className="pt-0">
        <AnimatedHeading
          eyebrow="Contact"
          title="Get a quote or book a repair"
          subtitle="Send your issue, device model, and preferred time. We’ll respond quickly."
        />

        <div className="mt-10 grid lg:grid-cols-2 gap-4 items-start">
          <div className="rounded-[2rem] bg-white border border-black/10 p-6 md:p-7 shadow-sm">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                alert('Message saved! (Demo) — Connect this form to backend later.')
              }}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-black/70 text-sm">Your Name</span>
                  <input
                    required
                    className="mt-2 w-full rounded-2xl bg-gray-100 border border-black/10 px-4 py-3 text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g., Sumit"
                  />
                </label>
                <label className="block">
                  <span className="text-black/70 text-sm">Phone</span>
                  <input
                    required
                    className="mt-2 w-full rounded-2xl bg-gray-100 border border-black/10 px-4 py-3 text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g., 9xxxxxxxxx"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-black/70 text-sm">Issue / Requirement</span>
                <textarea
                  required
                  rows={5}
                  className="mt-2 w-full resize-none rounded-2xl bg-gray-100 border border-black/10 px-4 py-3 text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-black"
                  placeholder="PC not booting, printer not printing, need a game PC build..."
                />
              </label>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="text-xs text-black/60">
                  By submitting you agree to be contacted.
                </div>
                <Button variant="green" className="w-full sm:w-auto">
                  Submit Request
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <div className="rounded-[2rem] bg-white border border-black/10 p-6 md:p-7 shadow-sm">
              <div className="text-black font-semibold text-lg">Direct contact</div>
              <div className="mt-3 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-black/60">Location</div>
                    <div className="text-black/80 mt-2">{brand.location}</div>
                  </div>
                  <div className="text-2xl">📍</div>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-black/60">Phone</div>
                    <a className="text-black/80 mt-2 block hover:opacity-70 transition" href={`tel:${brand.phone.replaceAll('-', '')}`}
                    >{brand.phone}</a
                    >
                  </div>
                  <div className="text-2xl">📞</div>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-black/60">Email</div>
                    <a className="text-black/80 mt-2 block hover:opacity-70 transition" href={`mailto:${brand.email}`}>{brand.email}</a>
                  </div>
                  <div className="text-2xl">✉️</div>
                </div>
              </div>

              <div className="mt-5 flex gap-2 flex-wrap">
                <Button variant="primary" href={`mailto:${brand.email}`}>Email</Button>
                <Button variant="green" href={`tel:+919647530263`}>Call Now</Button>
              </div>
            </div>

            <div className="rounded-[2rem] bg-gray-100 border border-black/10 p-6 md:p-7 overflow-hidden relative shadow-sm">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white blur-2xl" />
              <div className="relative">
                <div className="text-black font-semibold text-lg">Social</div>
                <div className="mt-3 text-black/70 text-sm">
                  Placeholders: update with your real Instagram/Facebook links.
                </div>

                <div className="mt-5 flex gap-4 flex-wrap">
                  <a className="px-6 py-4 rounded-2xl bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 hover:shadow-lg hover:-translate-y-1 transition text-white text-sm font-bold flex items-center gap-3" href={`https://instagram.com/${brand.insta}`}>
                    <SiInstagram size={20} /> Instagram
                  </a>
                  <a className="px-6 py-4 rounded-2xl bg-[#1877F2] hover:shadow-lg hover:-translate-y-1 transition text-white text-sm font-bold flex items-center gap-3" href={`https://facebook.com/${brand.fb}`}>
                    <SiFacebook size={20} /> Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <footer className="py-10">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="rounded-[2rem] bg-white border border-black/10 p-6 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
            <div className="text-black/80 text-sm">
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
              <div className="text-black/60 mt-1">{brand.location}</div>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {navItems.map((it) => (
                <button
                  key={it.id}
                  onClick={() => scrollToId(it.id)}
                  className="px-4 py-2 rounded-2xl bg-gray-100 border border-black/10 hover:bg-gray-200 transition text-black/80 text-sm"
                  type="button"
                >
                  {it.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {/* placeholder to keep framer-motion tree stable */}
      </AnimatePresence>
    </div>
  )
}

