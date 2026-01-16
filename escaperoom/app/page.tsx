"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

const slides = [
  "/hero/picture1.jpg",
  "/hero/picture2.jpg",
  "/hero/picture31.png"
]
const rooms = [
  {
    id: "time-machine",
    title: "CHRONOCRASH: THE TIME RIFT",
    description: "Trapped in a broken time machine, you're jumping through timelines. Fix the machine — or be erased from history.",
    img: "/rooms/room11.jpg"
  },
  {
    id: "the-heist",
    title: "THE MASTERPIECE HEIST",
    description: "Infiltrate the city's most secure museum and steal a priceless painting. The plan was perfect — until the alarms went off. The clock is ticking.",
    img: "/rooms/room22.jpg"
  },
  {
    id: "pharaohs-curse",
    title: "CURSE OF THE PHARAOH",
    description: "You've entered a long-lost pharaoh's tomb, but the door has sealed behind you. Solve ancient puzzles and escape the curse — or be buried forever.",
    img: "/rooms/room3.jpg"
  }
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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

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
        <div className="relative z-10 text-center max-w-4xl px-8">
          <h1 className="text-[72px] leading-[1] font-extrabold tracking-[0.3em] mb-8">
            ENTER THE<br />UNKNOWN
          </h1>

          <p className="text-gray-300 mb-12 max-w-xl mx-auto">
            Can you escape in time?<br />
            Each room is a world of mystery, logic and adrenaline.
          </p>

        <div className="flex justify-center gap-6">
          <Link href="/booknow">
          <button className="px-10 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold shadow-lg shadow-purple-600/40">
            BOOK NOW
          </button>
          </Link>
          <Link href="/rooms">
          <button className="px-10 py-4 border border-white/30 rounded-lg hover:bg-white/10">
              VIEW ROOMS
          </button>
          </Link>
        </div>
      </div>
    </section>

    {/* FEATURED ROOMS */}
    <section className="relative py-32 bg-gradient-to-b from-[#120018] to-[#05000a]">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#3b0a5f30,transparent_60%)]" />
        <h2 className="text-center text-4xl tracking-widest font-bold mb-4">
          FEATURED ROOMS
        </h2>
        <p className="text-center text-gray-400 mb-20">
          Test your mind. Discover your limits.
        </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-8 relative z-10">
        {rooms.map(room => (
        <div
          key={room.id}
          className="glass rounded-2xl overflow-hidden hover:-translate-y-3 transition-all duration-500 shadow-xl shadow-purple-900/30"
          >
          <div className="relative h-56">
            <Image
              src={room.img}
              alt={room.title}
              fill
              className="object-cover"
              quality={100}
            />
          </div>

            <div className="p-8">
              <h3 className="font-bold text-lg mb-2 tracking-wider">
                {room.title}
              </h3>

              <p className="text-sm text-gray-400 mb-6">
                {room.description}
              </p>

              <Link
                href={`/rooms/${room.id}`}
                className="inline-block border border-white/20 px-5 py-2 rounded-lg text-sm hover:bg-white/10 transition"
              >
                LEARN MORE →
              </Link>
            </div>
          </div>
          ))}
        </div>

    </section>

    {/* HOW IT WORKS */}    
    <section className="relative py-32 bg-[#05000a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#3b0a5f20,transparent_70%)]" />

        <h2 className="text-center text-4xl tracking-[0.3em] font-bold mb-6">
          HOW IT WORKS
        </h2>
        <p className="text-center text-gray-400 mb-20 max-w-xl mx-auto">
          From booking to escape — it only takes three simple steps.
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-8 relative z-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-10 text-center relative overflow-hidden group"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-purple-600/10 blur-2xl" />

              {/* Icon */}
              <div className="relative w-20 h-20 mx-auto mb-8">
                <Image
                  src={step.icon}
                  alt={step.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Number */}
              <div className="absolute top-6 right-6 text-purple-500/20 text-6xl font-extrabold">
                0{i + 1}
              </div>

              <h3 className="relative font-bold tracking-widest mb-4">
                {step.title}
              </h3>

              <p className="relative text-gray-400 text-sm leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>



    <section className="relative py-32 bg-gradient-to-b from-[var(--color-brand-text-strong)] to-black">

      <h2 className="text-center text-4xl tracking-[0.3em] font-bold mb-20">
        WHAT ESCAPERS SAY
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-8">

        {testimonials.map((t,i) => (
          <div
            key={i}
            className="relative glass p-10 rounded-2xl shadow-xl hover:-translate-y-3 transition duration-500 group"
          >
            {/* glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[var(--color-brand)]/10 blur-2xl" />

      
            {/* stars */}
            <div className="text-[var(--color-brand)] mb-4 tracking-widest">
              ★★★★★
            </div>

            <p className="italic text-gray-300 mb-6 leading-relaxed">
              “{t.text}”
            </p>

            <span className="text-[var(--color-brand)] font-semibold text-sm">
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
        <div className="w-12 h-12 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
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
        <div className="w-12 h-12 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
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
        <div className="w-12 h-12 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
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

    </main>
  );
}
