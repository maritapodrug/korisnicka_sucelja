"use client"

import { useEffect, useState } from "react"
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
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("date", selectedDate.toISOString().split("T")[0])

    if (!error && data) setBookings(data)
  }

  async function bookSlot() {
  if (!date || !selectedSlot) return

  if (!user && (!guestName || !guestEmail)) {
    setMessage("Please enter your name and email.")
    return
  }

  setLoading(true)
  setMessage("")

  const [roomTitle, time] = selectedSlot.split("-")

const { data, error } = await supabase
  .from("bookings")
  .insert({
    user_id: user?.id ?? null,
    guest_name: user ? null : guestName,
    guest_email: user ? null : guestEmail,
    room: roomTitle,
    date: date.toISOString().split("T")[0],
    time,
    players,
  })
  .select("id")

  if (error || !data) {
    setMessage("There is an error with this reservation.")
    return
  }

try{
  // -------------------------
  // 1️⃣ Email korisniku
  // -------------------------
  emailjs.init("FFMt7iEcrbqX8wRJH")

  const userTemplateParams = {
    email: user?.email ?? guestEmail,
    room: roomTitle,
    date: date.toISOString().split("T")[0],
    time,
    players,
  }

    await emailjs.send(
      "service_4xit7mb",
      "template_3z1l6bo",
      userTemplateParams
    )

  // -------------------------
  // 2️⃣ Email adminu (NOVI TEMPLATE)
  // -------------------------
    emailjs.init("WGsQdLyQKpLPg2j1n")

const adminTemplateParams = {
  email: user?.email ?? guestEmail,
  room: roomTitle,
  date: date.toISOString().split("T")[0],
  time,
  players,
}

    await emailjs.send(
      "service_0t7blpp",
      "template_me39jym",
      userTemplateParams
    )

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
              <h4 className="font-semibold tracking-wide text-purple-300">{room.title}</h4>

              <div className="flex flex-wrap gap-2">
                {room.times.map((time) => {
                  const value = `${room.title}-${time}`
                  const existingBooking = bookings.find((b) => b.room === room.title && b.time === time)
                  const isMine = user && existingBooking?.user_id === user.id
                  const isTaken = existingBooking && !isMine                  
                  const active = selectedSlot === value

                  return (
                    <button
                      key={time}
                      disabled={isMine || isTaken}
                      onClick={() => {
                        if (!isMine && !isTaken) {
                          setSelectedSlot(value)
                          setPlayers(room.minPlayers)
                          setMessage("")
                        }
                      }}
                      className={`px-4 py-2 rounded-lg text-sm transition ${
                        isMine
                          ? "bg-purple-700 text-white cursor-not-allowed"
                          : isTaken
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
        const [roomTitle] = selectedSlot.split("-")
        const roomData = roomsForDate.find((r) => r.title === roomTitle)
        if (!roomData) return null

        return (
          <div className="flex flex-col items-center gap-4">

            <div className="text-gray-400 tracking-wide">Selected: {selectedSlot}</div>

            <div className="flex flex-col items-center gap-3">
              <div className="text-sm text-gray-300 tracking-wide">Number of players</div>

              <div className="flex items-center gap-6 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-purple-500/20">
                <button
                  onClick={() => setPlayers((prev) => (prev && prev > roomData.minPlayers ? prev - 1 : prev))}
                  disabled={!players || players <= roomData.minPlayers}
                  className="w-10 h-10 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 transition disabled:opacity-30"
                >
                  −
                </button>

                <div className="text-2xl font-semibold text-purple-400 w-10 text-center">
                  {players ?? roomData.minPlayers}
                </div>

                <button
                  onClick={() =>
                    setPlayers((prev) =>
                      prev ? (prev < roomData.maxPlayers ? prev + 1 : prev) : roomData.minPlayers
                    )
                  }
                  disabled={players === roomData.maxPlayers}
                  className="w-10 h-10 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 transition disabled:opacity-30"
                >
                  +
                </button>
              </div>

              <div className="text-xs text-gray-400">
                Allowed: {roomData.minPlayers} – {roomData.maxPlayers} players
              </div>
            </div>

            {!user && (
              <div className="flex flex-col gap-3 w-full max-w-xs mt-2">

                <p className="text-xs text-purple-300 text-center">
                  Booking as guest
                </p>

                <input
                  type="text"
                  placeholder="Full name"
                  value={guestName}
                  onChange={(e)=>setGuestName(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
                />

                <input
                  type="email"
                  placeholder="Email address"
                  value={guestEmail}
                  onChange={(e)=>setGuestEmail(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
                />

              </div>
            )}

        <button
          onClick={bookSlot}
          disabled={loading || !players}
          className="px-6 py-3 bg-purple-600 rounded-xl text-white hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Booking...
            </>
          ) : (
            "Confirm booking"
          )}
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