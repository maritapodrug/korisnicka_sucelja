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
 
    <section className="relative min-h-[calc(100vh-80px)] pt-20 flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {slides.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`hero ${i + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={85} 
            loading={i === index ? "eager" : "lazy"}
            className={
              
              `absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out will-change-opacity ` +
              (i === index ? "opacity-100" : "opacity-0") +
             
              " object-center sm:object-center"
            }
            
             style={{ objectPosition: 'center 20%' }} 
          />
        ))}
      </div>

      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-600/20 blur-[120px]" />
      <div className="relative z-10 text-center max-w-4xl px-6 sm:px-8 mt-16 sm:mt-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-widest mb-8">ENTER THE<br/>UNKNOWN</h1>
        <p className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto">Can you escape in time?<br/>Each room is a world of mystery, logic and adrenaline.</p>
        <div className="flex justify-center gap-6 mt-10 flex-wrap">
          <Link href="/booknow" onMouseEnter={() => router.prefetch('/booknow')}
            className="px-10 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all duration-300">
            BOOK NOW
          </Link>
          <Link href="/#rooms" onMouseEnter={() => router.prefetch('/#rooms')}
            className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-purple-700/50 transition-all duration-300">
            VIEW ROOMS
          </Link>
        </div>
      </div>
    </section>
  )
}