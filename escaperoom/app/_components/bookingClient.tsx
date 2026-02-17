"use client"

import { useState } from "react"
import Calendar from "./calendar"
import { supabase } from "@/lib/supabase"
import { useUser } from "../hooks/useUser"

type Room = {
  id: string
  name: string
  times: string[]
}

// fake data generator
function getRoomsForDate(date: Date): Room[] {
  const day = date.getDate()

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
  const user = useUser()

  const [date, setDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const rooms = date ? getRoomsForDate(date) : []

  // BOOKING FUNKCIJA
  async function bookSlot() {
    if (!user) {
      setMessage("Moraš biti prijavljen.")
      return
    }

    if (!date || !selectedSlot) return

    setLoading(true)
    setMessage("")

    const [room, time] = selectedSlot.split("-")

    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      room,
      date: date.toISOString().split("T")[0],
      time,
    })

    setLoading(false)

    if (error) {
      setMessage("There is an error with this reservation.")
    } else {
      setMessage("Your reservation is succesful! 🎉")

      // reset selection
      setSelectedSlot(null)
    }
  }

  return (
    <div className="flex flex-col items-center gap-10 py-20">
      {/* CALENDAR */}
      <Calendar
        onSelectDate={(d) => {
          setDate(d)
          setSelectedSlot(null)
          setMessage("")
        }}
      />

      {/* Selected date */}
      {date && (
        <div className="text-sm tracking-widest">
          Selected date:{" "}
          <span className="text-purple-400">{date.toDateString()}</span>
        </div>
      )}

      {/* ROOMS */}
      {date && (
        <div className="w-full max-w-2xl space-y-6">
          {rooms.map((room) => (
            <div key={room.id} className="glass rounded-2xl p-5 space-y-3">
              <h4 className="font-semibold tracking-wide text-purple-300">
                {room.name}
              </h4>

              <div className="flex flex-wrap gap-2">
                {room.times.map((time) => {
                  const value = `${room.name}-${time}`
                  const active = selectedSlot === value

                  return (
                    <button
                      key={time}
                      onClick={() => {
                        setSelectedSlot(value)
                        setMessage("")
                      }}
                      className={`
                        px-4 py-2 rounded-lg text-sm transition
                        ${
                          active
                            ? "bg-purple-600 text-white"
                            : "bg-white/5 hover:bg-purple-600/20"
                        }
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

      {/* CONFIRM BOOKING */}
      {selectedSlot && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-yellow-400 tracking-wide">
            Selected: {selectedSlot}
          </div>

          <button
            onClick={bookSlot}
            disabled={loading}
            className="px-6 py-3 bg-purple-600 rounded-xl text-white hover:brightness-110 transition disabled:opacity-50"
          >
            {loading ? "Booking..." : "Confirm booking"}
          </button>
        </div>
      )}

      {/* MESSAGE */}
      {message && (
        <div className="text-sm text-green-300 text-center">{message}</div>
      )}
    </div>
  )
}
