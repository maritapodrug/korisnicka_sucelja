"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { rooms } from "../lib/roomData"


const slides = [
  "/hero/picture1.png",
  "/hero/picture2.jpg",
  "/hero/picture3.png"
]

const steps = [
  {
    title: "Book Online",
    text: "Choose your room and preferred time slot. Reserve your escape adventure in seconds.",
    icon: "/icons/step1.png"
  },
  {
    title: "Arrive & Get Briefed",
    text: "Meet your game master who will explain the rules and immerse you in the story.",
    icon: "/icons/step2.png"
  },
  {
    title: "Escape in 70 Minutes",
    text: "Work together, solve puzzles, and beat the clock to escape before time runs out.",
    icon: "/icons/step3.png"
  }
]

const testimonials = [
  {
    name: "Ana K.",
    text: "Best escape room in Split! The Masterpiece Heist was incredibly immersive. We barely made it out!",
  },
  {
    name: "Marco P.",
    text: "Mind-blowing experience! The puzzles were challenging but fair. Our team had an amazing time.",
  },
  {
    name: "Sarah M.",
    text: "The Curse of the Pharaoh was absolutely thrilling! Great attention to detail and atmosphere",
  }
]

export default function Page() {
  const [index, setIndex] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const room = rooms.find(r => r.id === selectedRoom)

  return (
    <main className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">

        {slides.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            quality={100}
            className={`object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-600/20 blur-[120px]" />

        {/* Content */}
       {/* Content */}
<div className="relative z-10 text-center max-w-4xl px-6 sm:px-8">
  <h1 className="
    text-4xl
    sm:text-5xl
    md:text-6xl
    lg:text-[72px]
    leading-tight
    font-extrabold
    tracking-widest
    sm:tracking-[0.25em]
    mb-6
    sm:mb-8
  ">
    ENTER THE<br />UNKNOWN
  </h1>

          <p className="
    text-lg
    sm:text-xl
    md:text-xl
    text-white
    mb-10
    sm:mb-12
    max-w-2xl
    mx-auto
    leading-relaxed
  ">
    Can you escape in time?<br />
    Each room is a world of mystery, logic and adrenaline.
  </p>
        <div className="flex justify-center gap-6">
          <Link href="/booknow">
          <button className="px-10 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold shadow-lg shadow-purple-600/40">
            BOOK NOW
          </button>
          </Link>
        <button
          onClick={() => {
            const el = document.getElementById("rooms")
            if (el) {
              el.scrollIntoView({ behavior: "smooth" })
            } else {
              window.location.href = "/#rooms"
            }
          }}
          className="px-10 py-4 bg-white/40 font-semibold border-white/30 rounded-lg hover:bg-purple-700/50"
        >
          VIEW ROOMS
        </button>
        </div>
      </div>
    </section>

    {/* FEATURED ROOMS */}
    <section id="rooms" className="relative py-32 bg-gradient-to-b from-[#120018] to-[#05000a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#3b0a5f30,transparent_60%)]" />
        <h2 className="text-center text-4xl tracking-widest font-bold mb-4">FEATURED ROOMS</h2>
        <p className="text-center text-gray-400 mb-20">Test your mind. Discover your limits.</p>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-8 relative z-10">
          {rooms.map(room => (
            <div key={room.id} className="glass rounded-2xl overflow-hidden hover:-translate-y-3 transition-all duration-500 shadow-xl shadow-purple-900/30">
              <div className="relative h-56">
                <Image src={room.img} alt={room.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" quality={100} />
              </div>
              <div className="p-8">
                <h3 className="font-bold text-lg mb-2 tracking-wider">{room.title}</h3>
                <p className="text-sm text-gray-400 mb-6">{room.description}</p>
                <button onClick={() => setSelectedRoom(room.id)} className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:text-[#ca7ef6]">
                <span className="relative">
                      LEARN MORE
                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#ca7ef6] transition-all duration-300 group-hover:w-full"></span>
                    </span>

                  <span className="transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#ca7ef6]">
                      →
                  </span>
                  </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    {/* HOW IT WORKS */}    

<section className="relative py-32 bg-gradient-to-b from-[#0a0214] to-[#05000a] overflow-hidden">

  {/* Background glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#ca7ef620,transparent_70%)]" />

  <div className="relative z-10 max-w-6xl mx-auto px-6">

    {/* Header */}
    <div className="text-center mb-24">
      <h2 className="text-1xl md:text-4xl font-extrabold tracking-[0.3em] mb-6">
        HOW IT WORKS
      </h2>
      <p className="text-gray-400 max-w-xl mx-auto">
        From booking to escape — it only takes three simple steps.
      </p>
    </div>

    {/* Timeline Wrapper */}
    <div className="relative">

      {/* Central Line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ca7ef6] to-transparent hidden md:block" />
      <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ca7ef6] to-transparent md:hidden" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-24 md:gap-0">

        {steps.map((step, i) => (
          <div key={i} className="relative flex flex-col items-center text-center md:w-1/3 group">

            {/* Step Circle */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#ca7ef6] to-purple-800 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-[#ca7ef6]/30 transition-transform duration-500 group-hover:scale-110">
              0{i + 1}
            </div>

            {/* Desktop Content */}
            <div className="mt-10 md:mt-16 max-w-xs">
              <h3 className="font-semibold tracking-widest mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.text}
              </p>
            </div>

          </div>
        ))}

      </div>
    </div>

  </div>
</section>

    {/* TESTIMONIALS */}
    <section className="relative py-32 bg-[rgba(202,126,246,0.15)]">

      <h2 className="text-center text-4xl tracking-[0.3em] font-bold mb-20">
        WHAT ESCAPERS SAY
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-8">

        {testimonials.map((t,i) => (
          <div
          key={i}
          className="relative p-10 rounded-2xl shadow-xl hover:-translate-y-3 transition duration-500
            bg-[#13021d]
             backdrop-blur-md
             border border-white/10">

            {/* stars */}
            <div className="text-[#ca7ef6] mb-4 tracking-widest">
              ★★★★★
            </div>

            <p className="italic text-[rgba(255, 255, 255, 0.8)] mb-6 leading-relaxed">
              “{t.text}”
            </p>

            <span className="text-[#ca7ef6] font-semibold text-sm">
              {t.name}
            </span>
          </div>
        ))}
      </div>
    </section>

        <section className="relative py-32 bg-[#05000a]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,var(--color-brand)/10,transparent_70%)]" />

        <h2 className="text-center text-4xl tracking-[0.3em] font-bold mb-20">
          VISIT US
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 px-8 relative z-10">

          {/* LEFT – Contact Info */}
          <div className="space-y-14">

            {/* Address */}
            <div className="flex gap-6 items-start">
              <div className="w-auto h-auto rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
                <Image src="/icons/location.png" alt="" width={24} height={24} />
              </div>

              <div>
                <p className="uppercase tracking-widest text-xs text-[var(--color-brand)] mb-2">
                  Visit Us
                </p>
                <p className="text-lg font-semibold">Ulica Slobode 14</p>
                <p className="text-gray-400">Split, Croatia</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-6 items-start">
              <div className="w-auto h-auto rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
                <Image src="/icons/phone.png" alt="" width={24} height={24} />
              </div>

              <div>
                <p className="uppercase tracking-widest text-xs text-[var(--color-brand)] mb-2">
                  Give Us A Call
                </p>
                <p className="text-lg font-semibold">(+385) 11 223 344</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-6 items-start">
              <div className="w-auto h-auto rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
                <Image src="/icons/clock.png" alt="" width={24} height={24} />
              </div>

              <div>
                <p className="uppercase tracking-widest text-xs text-[var(--color-brand)] mb-2">
                  Open Hours
                </p>
                <p className="text-lg font-semibold">9:00am – 11:00pm</p>
                <p className="text-gray-400">Every day</p>
              </div>
            </div>

          </div>

          {/* RIGHT – Google Map */}
          <div className="relative h-[480px] rounded-2xl overflow-hidden glass shadow-xl">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Ulica%20Slobode%2014%20Split&output=embed"
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>

        </div>
      </section>

    {/* ROOM DETAILS MODAL */}
      {selectedRoom && room && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#13021d] rounded-2xl shadow-xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh] p-8">
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-purple-400"
            >
              ✕
            </button>
            <h2 className="text-3xl font-extrabold mb-4">{room.title}</h2>
            <p className="text-gray-400 mb-6">{room.description}</p>
            <div className="relative h-72 rounded-xl overflow-hidden mb-6">
              <Image src={room.img} alt={room.title} fill className="object-cover" />
            </div>
            <div className="text-gray-200">{room.details}</div>
            <div className="flex justify-end mt-8">
            <Link href="/booknow">
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold">
                BOOK NOW
              </button>
            </Link>
            </div>
          </div>
        </div>
      )}  

    </main>
  );
}
