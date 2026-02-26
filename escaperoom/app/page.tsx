
import HomeClient from "./_components/HomeClient"
import { rooms } from "../lib/roomData"

const steps = [
  { title: "Book Online", text: "Choose your room and preferred time slot. Reserve your escape adventure in seconds.", icon: "/icons/step1.png" },
  { title: "Arrive & Get Briefed", text: "Meet your game master who will explain the rules and immerse you in the story.", icon: "/icons/step2.png" },
  { title: "Escape in 70 Minutes", text: "Work together, solve puzzles, and beat the clock to escape before time runs out.", icon: "/icons/step3.png" }
]

const testimonials = [
  {
    name: "Ana M.",
    text: "One of the most immersive escape rooms we've ever played. The atmosphere was insane!",
    rating: 5,
    tag: "Date Night",
  },
  {
    name: "Marko K.",
    text: "Perfect team-building experience. Challenging, creative and extremely fun.",
    rating: 4.9,
    tag: "Corporate Event",
  },
  {
    name: "Ivana P.",
    text: "The puzzles were clever and the staff was amazing. Highly recommended!",
    rating: 5,
    tag: "Birthday Party",
  },
]

export default function Page() {

  return (
    <main className="flex flex-col">
      <HomeClient rooms={rooms} steps={steps} testimonials={testimonials} />
    </main>
  )
}