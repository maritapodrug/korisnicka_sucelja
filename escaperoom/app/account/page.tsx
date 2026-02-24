"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useUser } from "../hooks/useUser"
import Link from "next/link"
import { rooms } from "@/lib/roomData"

type Booking = {
  id: string
  room_id: string
  date: string
  time: string
  players: number
  created_at: string
  originalPlayers?: number
}

function BookingSkeleton() {
  return (
    <div className="w-full max-w-3xl space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="glass rounded-xl p-5 space-y-3">
          <div className="h-5 w-1/2 bg-white/20 rounded" />
          <div className="h-4 w-1/3 bg-white/10 rounded" />
          <div className="h-px bg-white/10" />
          <div className="h-4 w-1/4 bg-white/10 rounded" />
        </div>
      ))}
    </div>
  )
}

function DeleteModal({
  booking,
  onConfirm,
  onCancel,
}: {
  booking: Booking
  onConfirm: () => void
  onCancel: () => void
}) {
  const [show, setShow] = useState(false)

  useEffect(() => setShow(true), [])

  function handleClose() {
    setShow(false)
    setTimeout(onCancel, 250)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          show ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative bg-gray-800 text-white p-6 rounded-xl max-w-sm w-full space-y-4 z-10 transform transition-all duration-300 ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold">Delete Booking?</h2>

        <p>
          Delete reservation for <strong>{booking.room_id}</strong>
          <br />
          {booking.date} — {booking.time}
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AccountPage() {
  const user = useUser()

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [modalBooking, setModalBooking] = useState<Booking | null>(null)
  const [message, setMessage] = useState<string | null>(null)

function isFutureBooking(b: Booking) {
  const [year, month, day] = b.date.split("-").map(Number)
  const [h, m] = b.time.split(":").map(Number)

  const dt = new Date(year, month - 1, day, h, m, 0, 0)
  return dt >= new Date()
}

  useEffect(() => {
    if (!user) return

    async function fetchBookings() {
      setLoading(true)

const { data, error } = await supabase
  .from("bookings")
  .select("*")
  .eq("user_id", user?.id)

console.log("ALL BOOKINGS:", data)
      if (!error && data) {
        const future = data
          .filter(isFutureBooking)
          .map(b => ({
            ...b,
            originalPlayers: b.players
          }))
          .sort((a, b) => {
            const da = new Date(a.date + " " + a.time)
            const db = new Date(b.date + " " + b.time)
            return da.getTime() - db.getTime()
          })

        setBookings(future)
      }

      setLoading(false)
    }

    fetchBookings()
  }, [user])

  // auto remove expired bookings every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setBookings(prev => prev.filter(isFutureBooking))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  function getRoomLimits(roomId: string) {
    const room = rooms.find(r => r.id === roomId)
    return room ? { min: room.minPlayers, max: room.maxPlayers } : { min: 1, max: 99 }
  }

  function changePlayers(id: string, delta: number) {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== id) return b
        const { min, max } = getRoomLimits(b.room_id)
        const next = Math.min(max, Math.max(min, b.players + delta))
        return { ...b, players: next }
      })
    )
  }

  async function confirmPlayersChange(id: string) {
    const booking = bookings.find(b => b.id === id)
    if (!booking) return

    const { data, error } = await supabase
      .from("bookings")
      .update({ players: booking.players })
      .eq("id", id)
      .select()

    if (error || !data) {
      setMessage("Update failed.")
      return
    }

    setBookings(prev =>
      prev.map(b =>
        b.id === id
          ? { ...b, originalPlayers: data[0].players }
          : b
      )
    )

    setMessage("Players updated ✓")
    setTimeout(() => setMessage(null), 3000)
  }

  async function handleDelete(id: string) {
    setDeletingId(id)

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id)

    if (error) {
      setMessage("Delete failed.")
      setDeletingId(null)
      return
    }

    setBookings(prev => prev.filter(b => b.id !== id))
    setDeletingId(null)
    setModalBooking(null)

    setMessage("Booking deleted ✓")
    setTimeout(() => setMessage(null), 3000)
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6">
        <h1 className="text-2xl font-bold">You are not logged in</h1>
        <Link
          href="/login"
          className="px-6 py-3 bg-purple-600 rounded-xl text-white hover:brightness-110 transition"
        >
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row w-full max-w-5xl gap-8 py-20 px-6">

      {/* SIDEBAR */}
      <div className="flex flex-col items-center md:items-start w-full md:w-64 bg-[#1a0d2a] p-6 rounded-2xl space-y-6">

        <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-2xl">
          {user.user_metadata?.first_name && user.user_metadata?.last_name
            ? `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`
            : user.email?.slice(0,2).toUpperCase()}
        </div>

        <div className="text-white font-semibold text-lg text-center md:text-left">
          {user.user_metadata?.first_name && user.user_metadata?.last_name
            ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
            : "No Name"}
        </div>

        <div className="text-white/60 text-sm break-all">
          {user.email}
        </div>
      </div>

      {/* BOOKINGS */}
      <div className="flex-1 space-y-8">

        <h1 className="text-3xl font-bold text-white">My Bookings</h1>

        {loading ? (
          <BookingSkeleton />
        ) : bookings.length === 0 ? (
          <div className="text-white/60">No upcoming bookings.</div>
        ) : (
          <div className="space-y-4">
    {bookings.map(b => {
      const { min, max } = getRoomLimits(b.room_id)
      const isPast = !isFutureBooking(b) // proveravamo da li je rezervacija prošla

      return (
        <div
          key={b.id}
          className={`glass rounded-xl p-5 flex flex-col sm:flex-row justify-between gap-4 ${
            isPast ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div>
          <div className="text-purple-300 font-semibold text-lg">
            {rooms.find(r => r.id === b.room_id)?.title || b.room_id}
          </div>            <div className="text-sm text-white/60">{b.date}</div>
            <div className="text-sm text-green-400">{b.time}</div>
          </div>

          <div className="flex flex-col items-center gap-2">

            <div className="flex items-center gap-2">
              <button
                onClick={() => changePlayers(b.id, -1)}
                disabled={b.players <= min || isPast}
                className="px-2 py-1 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-30"
              >-</button>

              <div className="px-3 py-1 bg-white/5 rounded-xl border border-purple-500/20 text-purple-400 font-semibold">
                {b.players}
              </div>

              <button
                onClick={() => changePlayers(b.id, 1)}
                disabled={b.players >= max || isPast}
                className="px-2 py-1 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-30"
              >+</button>
            </div>

            {b.players !== b.originalPlayers && !isPast && (
              <button
                onClick={() => confirmPlayersChange(b.id)}
                className="px-3 py-1 text-sm bg-purple-600 rounded hover:bg-purple-700"
              >
                Confirm Change
              </button>
            )}
      </div>

      <button
        onClick={() => setModalBooking(b)}
        disabled={deletingId === b.id || isPast}
        className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700 self-start"
      >
        {deletingId === b.id ? "Deleting..." : "Delete"}
      </button>
    </div>
  )
})}
          </div>
        )}
      </div>

      {modalBooking && (
        <DeleteModal
          booking={modalBooking}
          onConfirm={() => handleDelete(modalBooking.id)}
          onCancel={() => setModalBooking(null)}
        />
      )}

      {message && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-xl backdrop-blur">
          {message}
        </div>
      )}

    </div>
  )
}