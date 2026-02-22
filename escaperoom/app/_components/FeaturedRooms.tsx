"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Room } from "../../lib/roomData"
import Link from "next/link"
interface Props {
  rooms: Room[]
  onSelectRoom: (id: string) => void
}

export default function FeaturedRooms({ rooms }: Props) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  // ESC zatvaranje
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedRoom(null)
    }
    if (selectedRoom) {
      document.addEventListener("keydown", handleEsc)
    }
    return () => document.removeEventListener("keydown", handleEsc)
  }, [selectedRoom])

  return (
    <section id="rooms" className="relative py-32 bg-gradient-to-b from-[#120018] to-[#05000a]">
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
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                quality={75}
                placeholder={room.blurDataURL ? "blur" : undefined}
                blurDataURL={room.blurDataURL}
              />
            </div>

            <div className="p-8">
              <h3 className="font-bold text-lg mb-2 tracking-wider">{room.title}</h3>
              <p className="text-sm text-gray-400 mb-6">{room.description}</p>

              <button
                onClick={() => setSelectedRoom(room)}
                className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:text-[#ca7ef6]"
              >
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

      {/* ================= POPUP MODAL ================= */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedRoom(null)}
          />

          {/* modal */}
          <div className="relative z-10 w-full max-w-5xl bg-gradient-to-b from-[#0d0213] to-[#050009] rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-scaleIn">

            <div className="flex flex-col md:flex-row">

              {/* IMAGE */}
              <div className="relative md:w-1/2 h-64 md:h-auto">
                <Image
                  src={selectedRoom.img}
                  alt={selectedRoom.title}
                  fill
                  className="object-cover"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="md:w-1/2 p-8 flex flex-col gap-6">

                {/* Close */}
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-xl"
                >
                  ✕
                </button>

                <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
                  {selectedRoom.title}
                </h2>

                {/* Info badges */}
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-white/5 rounded-lg text-sm">
                    👥 {selectedRoom.minPlayers}–{selectedRoom.maxPlayers} Players
                  </div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg text-sm">
                    ⏳ 60 Minutes
                  </div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg text-sm">
                    🧠 {selectedRoom.details.includes("Hard") ? "Hard" : "Medium-Hard"}
                  </div>
                </div>

                {/* Details text */}
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {selectedRoom.details}
                </div>

                {/* CTA */}
                <Link href="/booknow">
                  <button className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#9e6bf5] to-[#ca7ef6] text-black hover:opacity-95 transition">
                    BOOK THIS ROOM
                  </button>
                </Link >

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simple Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </section>
  )
}