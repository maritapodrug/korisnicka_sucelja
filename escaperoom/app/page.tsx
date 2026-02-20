// app/page.tsx
import HomeClient from "./_components/HomeClient"
import { rooms } from "../lib/roomData"

// steps/testimonials mogu ostati ovdje (server) pa ih možemo proslijediti dalje ili prikazati ovdje
const steps = [
  { title: "Book Online", text: "Choose your room and preferred time slot. Reserve your escape adventure in seconds.", icon: "/icons/step1.png" },
  { title: "Arrive & Get Briefed", text: "Meet your game master who will explain the rules and immerse you in the story.", icon: "/icons/step2.png" },
  { title: "Escape in 70 Minutes", text: "Work together, solve puzzles, and beat the clock to escape before time runs out.", icon: "/icons/step3.png" }
]

const testimonials = [
  { name: "Ana K.", text: "Best escape room in Split! The Masterpiece Heist was incredibly immersive. We barely made it out!" },
  { name: "Marco P.", text: "Mind-blowing experience! The puzzles were challenging but fair. Our team had an amazing time." },
  { name: "Sarah M.", text: "The Curse of the Pharaoh was absolutely thrilling! Great attention to detail and atmosphere" }
]

export default function Page() {
  // Page stays a server component — only renders HomeClient (interactive island)
  return (
    <main className="flex flex-col">
      <HomeClient rooms={rooms} steps={steps} testimonials={testimonials} />
      {/* Ako želiš, dodatne statične sekcije (server) možeš ovdje staviti — ali ja ih uključio u HomeClient radi jednostavnosti */}
    </main>
  )
}