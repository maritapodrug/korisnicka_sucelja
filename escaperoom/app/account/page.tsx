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
        className={`relative glass border border-red-500/30 p-6 rounded-2xl max-w-sm w-full space-y-4 z-10 transform transition-all duration-300 ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold text-white">Delete Booking?</h2>

        <p className="text-white/70">
          Delete reservation for{" "}
          <strong className="text-purple-400">
            {rooms.find(r => r.id === booking.room_id)?.title || booking.room_id}
          </strong>
          <br />
          {booking.date} — {booking.time}
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 transition"
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
        <h1 className="text-2xl font-bold text-white">You are not logged in</h1>
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
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-10 py-24 px-6">

      {/* SIDEBAR */}
      <div className="w-full md:w-72 glass rounded-3xl p-8 flex flex-col items-center md:items-start gap-6 border border-purple-500/20">

        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-purple-600/30">
          {user.user_metadata?.first_name && user.user_metadata?.last_name
            ? `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`
            : user.email?.slice(0,2).toUpperCase()}
        </div>

        <div className="text-xl font-semibold text-white text-center md:text-left">
          {user.user_metadata?.first_name && user.user_metadata?.last_name
            ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
            : "No Name"}
        </div>

        <div className="text-white/50 text-sm break-all">
          {user.email}
        </div>
      </div>

      {/* BOOKINGS */}
      <div className="flex-1 space-y-8">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          My Bookings
        </h1>

        {loading ? (
          <div className="text-white/60">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center text-white/60 border border-white/5">
            No upcoming bookings.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => {
              const { min, max } = getRoomLimits(b.room_id)

              return (
                <div
                  key={b.id}
                  className="glass rounded-2xl p-6 flex flex-col sm:flex-row justify-between gap-6 border border-white/5 hover:border-purple-500/30 hover:-translate-y-1 transition"
                >
                  <div>
                    <div className="text-xl font-semibold text-purple-300">
                      {rooms.find(r => r.id === b.room_id)?.title || b.room_id}
                    </div>
                    <div className="text-sm text-white/50">{b.date}</div>
                    <div className="text-sm text-purple-400 font-medium">{b.time}</div>
                  </div>

                  <div className="flex flex-col items-center gap-3">

                    <div className="flex items-center gap-3 bg-black/30 px-3 py-2 rounded-xl border border-purple-500/20">
                      <button
                        onClick={() => changePlayers(b.id, -1)}
                        disabled={b.players <= min}
                        className="w-8 h-8 flex items-center justify-center bg-purple-600/20 rounded-lg hover:bg-purple-600/40 transition disabled:opacity-30"
                      >-</button>

                      <div className="min-w-[36px] text-center px-3 py-1 rounded-lg bg-black/40 border border-purple-500/30 text-purple-300 font-semibold">
                        {b.players}
                      </div>

                      <button
                        onClick={() => changePlayers(b.id, 1)}
                        disabled={b.players >= max}
                        className="w-8 h-8 flex items-center justify-center bg-purple-600/20 rounded-lg hover:bg-purple-600/40 transition disabled:opacity-30"
                      >+</button>
                    </div>

                    {b.players !== b.originalPlayers && (
                      <button
                        onClick={() => confirmPlayersChange(b.id)}
                        className="px-4 py-1.5 text-sm bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg hover:brightness-110 transition"
                      >
                        Confirm Change
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setModalBooking(b)}
                    disabled={deletingId === b.id}
                    className="px-4 py-1.5 text-sm bg-red-600/80 rounded-lg hover:bg-red-600 transition self-start"
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-xl border border-purple-500/30 shadow-lg">
          {message}
        </div>
      )}
    </div>
  )
}