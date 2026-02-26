"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Room } from "../../lib/roomData"
import HeroSlider from "./HeroSlider"
import FeaturedRooms from "./FeaturedRooms"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  rooms: Room[]
  steps?: { title: string; text: string; icon: string }[]
  testimonials?: { name: string; text: string }[]
}

export default function HomeClient({ rooms, steps = [], testimonials = [] }: Props) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const router = useRouter()
  const room = rooms.find(r => r.id === selectedRoom)

  useEffect(() => {
    router.prefetch("/rooms")
    router.prefetch("/booknow")
  }, [router])

    const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const center = testimonials[index]
  const left = testimonials[(index - 1 + testimonials.length) % testimonials.length]
  const right = testimonials[(index + 1) % testimonials.length]

  function Card({ item, active }: any) {
    return (
      <motion.div
        initial={{ opacity: 0.6, scale: 0.9 }}
        animate={{ opacity: active ? 1 : 0.6, scale: active ? 1 : 0.9 }}
        transition={{ duration: 0.4 }}
        className={`rounded-2xl p-8 backdrop-blur-xl border border-white/10
        ${active ? "bg-gradient-to-b from-purple-900/40 to-black/40 shadow-[0_0_40px_rgba(202,126,246,0.3)]" : "bg-black/30"}
        w-full max-w-xl`}
      >
        <div className="mb-4 text-purple-400 tracking-widest text-sm">
          {item.rating.toFixed(1)} ★
        </div>

        <p className="text-gray-300 italic leading-relaxed mb-6">
          “{item.text}”
        </p>

        <div className="text-sm text-gray-400">
          <span className="font-semibold text-white">{item.name}</span> · {item.tag}
        </div>
      </motion.div>
    )
  }

  return (
    <>
      {/* HERO */}
      <HeroSlider />

      {/* FEATURED ROOMS */}
      <FeaturedRooms rooms={rooms} onSelectRoom={setSelectedRoom} />

      {/* HOW IT WORKS */}
      <section className="relative py-32 bg-gradient-to-b from-[#0a0214] to-[#05000a] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#ca7ef620,transparent_70%)]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-1xl md:text-4xl font-extrabold tracking-[0.3em] mb-6">HOW IT WORKS</h2>
            <p className="text-gray-400 max-w-xl mx-auto">From booking to escape — it only takes three simple steps.</p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ca7ef6] to-transparent hidden md:block" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-24 md:gap-0">
              {steps.map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center md:w-1/3 group">
                  <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#ca7ef6] to-purple-800 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-[#ca7ef6]/30 transition-transform duration-500 group-hover:scale-110">
                    0{i + 1}
                  </div>
                  <div className="mt-10 md:mt-16 max-w-xs">
                    <h3 className="font-semibold tracking-widest mb-4 text-white">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
    <section className="py-28 relative bg-[rgba(202,126,246,0.15)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ca7ef620,transparent_80%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold tracking-[0.3em] mb-4">
          WHAT ESCAPERS SAY
        </h2>
        <p className="text-gray-400 mb-16">
          Rated 4.9/5 by over 300 players
        </p>

        <div className="flex items-center justify-center gap-6">
          <div className="hidden md:block w-1/4">
            <Card item={left} active={false} />
          </div>

          <div className="w-full md:w-1/2">
            <AnimatePresence mode="wait">
              <Card key={center.name} item={center} active={true} />
            </AnimatePresence>
          </div>

          <div className="hidden md:block w-1/4">
            <Card item={right} active={false} />
          </div>
        </div>
      </div>
    </section>

      {/* VISIT US */}
      <section className="relative py-32 bg-[#05000a]"> 
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,var(--color-brand)/10,transparent_70%)]" />
        <h2 className="text-center text-4xl tracking-[0.3em] font-bold mb-20">VISIT US</h2> 
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 px-8 relative z-10"> 
          <div className="space-y-14"> 
            {/* Address, phone, hours */} 
            <div className="flex gap-6 items-start"> 
              <div className="w-auto h-auto rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center"> 
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-700/30 to-black/30 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="#E9D5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0118 0z" stroke="#E9D5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              </div> 
              <div> 
                <p className="uppercase tracking-widest text-sm text-[var(--color-brand)] mb-2">Visit Us</p> 
                <p className="text-2xl font-bold">Ulica Slobode 14</p> <p className="text-lg text-gray-400">Split, Croatia</p> 
                </div> 
              </div> {/* Phone */} 
              <div className="flex gap-4 items-start"> 
                <div className="w-auto h-auto rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center"> 
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-700/30 to-black/30 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M22 16.92V20a1 1 0 01-1.11 1 19.8 19.8 0 01-8.63-3.16 19.5 19.5 0 01-6-6A19.8 19.8 0 013 3.11 1 1 0 014 2h3.09a1 1 0 01.95.68l1.2 4.03a1 1 0 01-.25.95L8.7 9.7a14 14 0 006 6l1.03-1.03a1 1 0 01.95-.25l4.03 1.2A1 1 0 0122 16.92z" stroke="#E9D5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
                </div> 
                <div> 
                  <p className="uppercase tracking-widest text-sm text-[var(--color-brand)] mb-2">Give Us A Call</p>
                   <p className="text-2xl font-bold">(+385) 11 223 344</p> 
                   </div> 
                   </div> 
              {/* Hours */} 
              <div className="flex gap-6 items-start"> 
                <div className="w-auto h-auto rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center"> 
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-700/30 to-black/30 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="#E9D5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 7v5l3.5 1.8" stroke="#E9D5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="0.7" fill="#E9D5FF" />
                    </svg>
                </div>
                </div> 
                <div> 
                  <p className="uppercase tracking-widest text-sm text-[var(--color-brand)] mb-2">Open Hours</p> 
                  <p className="text-2xl font-bold">9:00am – 11:00pm</p> <p className="text-lg text-gray-400">Every day</p> 
                  </div> 
                  </div> 
                  </div> 
                  {/* RIGHT – Google Map */} 
                  <div className="relative h-[430px] rounded-2xl overflow-hidden glass shadow-xl"> 
                    <iframe className="absolute inset-0 w-full h-full border-0" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Ulica%20Slobode%2014%20Split&output=embed" /> 
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" /> 
                    </div> 
                    </div> 
                    
                    </section>

            
      {/* ROOM DETAILS MODAL */}
      {selectedRoom && room && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#13021d] rounded-2xl shadow-xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh] p-8">
            <button onClick={() => setSelectedRoom(null)} className="absolute top-4 right-4 text-white text-2xl hover:text-purple-400">✕</button>
            <h2 className="text-3xl font-extrabold mb-4">{room.title}</h2>
            <p className="text-gray-400 mb-6">{room.description}</p>
            <div className="relative h-72 rounded-xl overflow-hidden mb-6">
              <Image src={room.img} alt={room.title} fill className="object-cover" placeholder={room.blurDataURL ? "blur" : undefined} blurDataURL={room.blurDataURL ?? undefined} quality={75} />
            </div>
            <div className="text-gray-200">{room.details}</div>
            <div className="flex justify-end mt-8">
              <Link href="/booknow">
                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold">BOOK NOW</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}