"use client"

import { useState } from "react"
import Calendar from "./calendar"

type Room = {
  id: string
  name: string
  times: string[]
}

// fake data generator
function getRoomsForDate(date: Date): Room[] {
  const day = date.getDate()

  // mijenjaj termine po danu (fake logika)
  if (day % 2 === 0) {
    return [
      { id: "a", name: "CHRONOCRASH: THE TIME RIFT", times: ["10:00", "12:00", "18:00"] },
      { id: "b", name: "THE MASTERPIECE HEIST", times: ["09:00", "15:00", "20:00"] },
      { id: "c", name: "CURSE OF THE PHARAOH", times: ["11:00", "14:00", "19:00"] },
    ]
  }

  return [
    { id: "a", name: "CHRONOCRASH: THE TIME RIFT", times: ["08:00", "13:00", "17:00"] },
    { id: "b", name: "THE MASTERPIECE HEIST", times: ["10:00", "16:00"] },
    { id: "c", name: "CURSE OF THE PHARAOH", times: ["12:00", "18:00", "21:00"] },
  ]
}

export default function BookingClient() {
  const [date, setDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  const rooms = date ? getRoomsForDate(date) : []

  return (
    <div className="flex flex-col items-center gap-10 py-20">
      <Calendar onSelectDate={(d) => {
        setDate(d)
        setSelectedSlot(null)
      }} />

      {/* Selected date */}
      {date && (
        <div className="text-sm tracking-widest animate-fadeIn">
          Selected date:{" "}
          <span className="text-purple-400">
            {date.toDateString()}
          </span>
        </div>
      )}

      {/* Rooms */}
      {date && (
        <div className="w-full max-w-2xl space-y-6 animate-slideUp">
          {rooms.map(room => (
            <div
              key={room.id}
              className="glass rounded-2xl p-5 space-y-3"
            >
              <h4 className="font-semibold tracking-wide text-purple-300">
                {room.name}
              </h4>

              <div className="flex flex-wrap gap-2">
                {room.times.map(time => {
                  const value = `${room.name}-${time}`
                  const active = selectedSlot === value

                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedSlot(value)}
                      className={`
                        px-4 py-2 rounded-lg text-sm transition
                        ${active
                          ? "bg-purple-600 text-white"
                          : "bg-white/5 hover:bg-purple-600/20"}
                      `}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Final selection */}
      {selectedSlot && (
        <div className="text-sm tracking-widest text-yellow-400 animate-fadeIn">
          Selected slot: {selectedSlot}
        </div>
      )}
    </div>
  )
}
