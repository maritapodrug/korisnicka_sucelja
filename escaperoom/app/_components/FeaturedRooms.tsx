// app/_components/FeaturedRooms.tsx
"use client"

import Image from "next/image"
import { Room } from "../../lib/roomData"

interface Props {
  rooms: Room[]
  onSelectRoom: (id: string) => void
}

export default function FeaturedRooms({ rooms, onSelectRoom }: Props) {
  return (
    <section  id="rooms" className="relative py-32 bg-gradient-to-b from-[#120018] to-[#05000a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-8 relative z-10">
        {rooms.map(room => (
          <div key={room.id} className="glass rounded-2xl overflow-hidden hover:-translate-y-3 transition-all duration-500 shadow-xl shadow-purple-900/30">
            <div className="relative h-56">
              <Image src={room.img} alt={room.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" quality={75} placeholder={room.blurDataURL ? "blur" : undefined} blurDataURL={room.blurDataURL} />
            </div>
            <div className="p-8">
              <h3 className="font-bold text-lg mb-2 tracking-wider">{room.title}</h3>
              <p className="text-sm text-gray-400 mb-6">{room.description}</p>
              <button onClick={() => onSelectRoom(room.id)} className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:text-[#ca7ef6]">
                <span className="relative">
                  LEARN MORE
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#ca7ef6] transition-all duration-300 group-hover:w-full"></span>
                </span>
                <span className="transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#ca7ef6]">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}