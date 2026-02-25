"use client"

import { useState } from "react"
import Calendar from "./calendar"
import { supabase } from "@/lib/supabase"
import { useUser } from "../hooks/useUser"
import { rooms, Room } from "@/lib/roomData"
import emailjs from "@emailjs/browser"

function getRoomsForDate(date: Date): (Room & { times: string[] })[] {
  const day = date.getDate()

  return rooms.map((room) => {
    let times: string[] = []

    switch (room.id) {
      case "time-machine":
        times = day % 2 === 0 ? ["10:00", "12:00", "18:00"] : ["08:00", "13:00", "17:00"]
        break
      case "the-heist":
        times = day % 2 === 0 ? ["09:00", "15:00", "20:00"] : ["10:00", "16:00"]
        break
      case "pharaohs-curse":
        times = day % 2 === 0 ? ["11:00", "14:00", "19:00"] : ["12:00", "18:00", "21:00"]
        break
    }

    return { ...room, times }
  })
}

function formatLocalDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export default function BookingClient() {
  const user = useUser()

  const [date, setDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [players, setPlayers] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")

  const roomsForDate = date ? getRoomsForDate(date) : []

  async function fetchBookings(selectedDate: Date) {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("date", formatLocalDate(selectedDate))

    if (data) setBookings(data)
  }

  async function bookSlot() {
    if (!date || !selectedSlot) return

    if (!user && (!guestName || !guestEmail)) {
      setMessage("Please enter your name and email.")
      return
    }

    setLoading(true)
    setMessage("")

    const [roomId, time] = selectedSlot.split("|")
    const roomObj = rooms.find((r) => r.id === roomId)

    if (!roomObj) {
      setMessage("Room not found.")
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from("bookings")
      .insert({
        user_id: user?.id ?? null,
        guest_name: user ? null : guestName,
        guest_email: user?.email ?? guestEmail,
        room_id: roomId,
        date: formatLocalDate(date),
        time: time.trim(),
        players: players ?? roomObj.minPlayers,
      })

    if (error) {
      console.log(error)
      setMessage(error.message)
      setLoading(false)
      return
    }

    try {
      emailjs.init("FFMt7iEcrbqX8wRJH")

      await emailjs.send("service_4xit7mb", "template_3z1l6bo", {
        email: user?.email ?? guestEmail,
        room: roomObj.title,
        date: formatLocalDate(date),
        time,
        players,
      })

      emailjs.init("WGsQdLyQKpLPg2j1n")

      await emailjs.send("service_0t7blpp", "template_me39jym", {
        email: user?.email ?? guestEmail,
        room: roomObj.title,
        date: formatLocalDate(date),
        time,
        players,
      })

      setMessage("Your reservation is successful! 🎉")
    } catch (err) {
      console.log("EMAIL ERROR:", err)
      setMessage("Booking saved, but email failed.")
    }

    setLoading(false)
    setSelectedSlot(null)
    setGuestName("")
    setGuestEmail("")
    fetchBookings(date)
  }

  return (
    <div className="flex flex-col items-center gap-10 py-20">

      <Calendar
        onSelectDate={(d) => {
          setDate(d)
          setSelectedSlot(null)
          setMessage("")
          fetchBookings(d)
        }}
      />

      {date && (
        <div className="text-sm tracking-widest">
          Selected date: <span className="text-purple-400">{date.toDateString()}</span>
        </div>
      )}

      {date && (
        <div className="w-full max-w-2xl space-y-6">
          {roomsForDate.map((room) => (
            <div key={room.id} className="glass rounded-2xl p-5 space-y-3">
              <h4 className="font-semibold tracking-wide text-purple-300">
                {room.title}
              </h4>

              <div className="flex flex-wrap gap-2">
                {room.times.map((time) => {
                  const value = `${room.id}|${time}`

                  const existingBooking = bookings.find(
                    (b) =>
                      b.room_id === room.id &&
                      b.time?.trim() === time
                  )

                  const isMine =
                    user && existingBooking?.user_id === user.id

                  const isTaken = existingBooking && !isMine

                  const [h, m] = time.split(":").map(Number)
                  const slotDateTime = new Date(date)
                  slotDateTime.setHours(h, m, 0, 0)

                  const isPast =
                    slotDateTime.getTime() < new Date().getTime()

                  const active = selectedSlot === value

                let tooltip = ""
                if (isTaken) tooltip = "Already reserved"

                  return (
                    <button
                      key={time}
                      disabled={isMine || isTaken || isPast}
                      title={tooltip}
                      onClick={() => {
                        if (!isMine && !isTaken && !isPast) {
                          setSelectedSlot(value)
                          setPlayers(room.minPlayers)
                          setMessage("")
                        }
                      }}
                      className={`px-4 py-2 rounded-lg text-sm transition ${
                        isMine || isTaken || isPast
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : active
                          ? "bg-purple-600 text-white"
                          : "bg-white/5 hover:bg-purple-600/20"
                      }`}
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

      {selectedSlot && (() => {
        const [roomId, time] = selectedSlot.split("|")
        const roomData = rooms.find((r) => r.id === roomId)
        if (!roomData) return null

        return (
          <div className="flex flex-col items-center gap-4">

            <div className="text-gray-400 tracking-wide">
              Selected: {roomData?.title}-{time}
            </div>

            <div className="flex items-center gap-6 bg-white/5 px-6 py-3 rounded-2xl">
              <button
                onClick={() =>
                  setPlayers((prev) =>
                    prev && prev > roomData.minPlayers
                      ? prev - 1
                      : prev
                  )
                }
                disabled={!players || players <= roomData.minPlayers}
                className="w-10 h-10 bg-purple-600/20 rounded-xl disabled:opacity-30"
              >
                −
              </button>

              <div className="text-2xl text-purple-400 w-10 text-center">
                {players ?? roomData.minPlayers}
              </div>

              <button
                onClick={() =>
                  setPlayers((prev) =>
                    prev && prev < roomData.maxPlayers
                      ? prev + 1
                      : prev
                  )
                }
                disabled={players === roomData.maxPlayers}
                className="w-10 h-10 bg-purple-600/20 rounded-xl disabled:opacity-30"
              >
                +
              </button>
            </div>

        <div className="text-xs text-gray-400">
          Allowed players: {roomData.minPlayers} – {roomData.maxPlayers}
        </div>

            {!user && (
              <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
                <input
                  type="text"
                  placeholder="Full name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/5"
                />

                <input
                  type="email"
                  placeholder="Email address"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/5"
                />
              </div>
            )}

            <button
              onClick={bookSlot}
              disabled={loading || !players}
              className="px-6 py-3 bg-purple-600 rounded-xl text-white disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm booking"}
            </button>
          </div>
        )
      })()}

      {message && (
        <div className="text-sm text-green-300 text-center max-w-md">
          {message}
        </div>
      )}
    </div>
  )
}