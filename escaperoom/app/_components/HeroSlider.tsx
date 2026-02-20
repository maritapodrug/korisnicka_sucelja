// app/_components/HeroSlider.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"

const slides = [
  "/hero/picture1.webp",
  "/hero/picture2.avif",
  "/hero/picture3.webp"
]


export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const router = useRouter()
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const nextIndex = (index + 1) % slides.length
    if (typeof window !== "undefined") {
      const pre = new window.Image()
      pre.src = slides[nextIndex]
    }
  }, [index])

  return (
    <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
      <Image
        key={slides[index]}
        src={slides[index]}
        alt=""
        fill
        priority={index === 0}
        quality={75}
        sizes="100vw"
        className="object-cover transition-opacity duration-1000"
      />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-600/20 blur-[120px]" />
      <div className="relative z-10 text-center max-w-4xl px-6 sm:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-widest mb-8">ENTER THE<br/>UNKNOWN</h1>
        <p className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto">Can you escape in time?<br/>Each room is a world of mystery, logic and adrenaline.</p>
      <div className="flex justify-center gap-6 mt-10 flex-wrap">
        <Link 
          href="/booknow"
          onMouseEnter={() => router.prefetch('/booknow')}
          className="px-10 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all duration-300"
        >
          BOOK NOW
        </Link>

        <Link 
          href="/#rooms"
          onMouseEnter={() => router.prefetch('/#rooms')}
          className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-purple-700/50 transition-all duration-300"
        >
          VIEW ROOMS
        </Link>
      </div>
      </div>
    </section>
  )
}

