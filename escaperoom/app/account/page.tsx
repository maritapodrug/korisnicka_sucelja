"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useUser } from "../hooks/useUser"
import Link from "next/link"
import { rooms } from "@/lib/roomData"

type Booking = {
  id: string
  room: string
  date: string
  time: string
  players: number
  created_at: string
  originalPlayers?: number // dodano za praćenje promjene
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

// Simple Modal component
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
    setTimeout(onCancel, 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          show ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* modal content */}
      <div
        className={`relative bg-gray-800 text-white p-6 rounded-xl max-w-sm w-full space-y-4 z-10 transform transition-all duration-300 ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold">Delete Booking?</h2>
        <p>
          Are you sure you want to delete the reservation for{" "}
          <strong>{booking.room}</strong> on {booking.date} at {booking.time}?
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
  const [showMessage, setShowMessage] = useState(false)


  useEffect(() => {
    if (!user) return

    async function fetchBookings() {
      setLoading(true)
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })

      if (!error && data) {
        // dodaj originalPlayers za praćenje promjena
        const bookingsWithOriginal = data.map(b => ({
          ...b,
          originalPlayers: b.players
        }))
        setBookings(bookingsWithOriginal)
      }
      setLoading(false)
    }

    fetchBookings()
  }, [user])

  function getRoomLimits(roomTitle: string) {
    const room = rooms.find(r => r.title === roomTitle)
    return room ? { min: room.minPlayers, max: room.maxPlayers } : { min: 1, max: 99 }
  }

  function changePlayers(id: string, delta: number) {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== id) return b
        const { min, max } = getRoomLimits(b.room)
        const newPlayers = Math.min(max, Math.max(min, b.players + delta))
        return { ...b, players: newPlayers }
      })
    )
  }

  async function confirmPlayersChange(id: string) {
    const booking = bookings.find(b => b.id === id)
    if (!booking) return

    const newPlayers = Number(booking.players)

    const { data, error } = await supabase
      .from("bookings")
      .update({ players: newPlayers })
      .eq("id", id)
      .select()

    if (error) {
      setMessage("Failed to update players.")
      return
    }

    // update lokalnog state-a
    setBookings(prev =>
      prev.map(b =>
        b.id === id
          ? { ...b, players: data[0].players, originalPlayers: data[0].players }
          : b
      )
    )

    // postavi privremenu poruku
setMessage("Players updated successfully!")
  setShowMessage(true)
  setTimeout(() => setShowMessage(false), 5000) // nestaje nakon 5s
  }

  async function handleDelete(id: string) {
    setDeletingId(id)

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id)

    if (error) {
      setMessage("Failed to delete booking.")
      setDeletingId(null)
      return
    }

    setBookings(prev => prev.filter(b => b.id !== id))
    setDeletingId(null)
    setModalBooking(null)
    setMessage("Booking deleted successfully!")
    setTimeout(() => setMessage(null), 5500)
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center gap-6">
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
  {/* LEFT SIDEBAR */}
  <div className="flex flex-col items-center md:items-start w-full md:w-64 bg-[#1a0d2a] p-6 rounded-2xl space-y-6">
    {/* Avatar */}
    <div
      className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-2xl"
    >
      {user.user_metadata?.first_name && user.user_metadata?.last_name
        ? `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`
        : user.email?.slice(0,2).toUpperCase()}
    </div>

    {/* Name */}
    <div className="text-white font-semibold text-lg text-center md:text-left">
      {user.user_metadata?.first_name && user.user_metadata?.last_name
        ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
        : "No Name"}
    </div>

    {/* Email */}
    <div className="text-white/60 text-sm text-center md:text-left break-all">
      {user.email}
    </div>
  </div>

  {/* RIGHT CONTENT (bookings) */}
  <div className="flex-1 space-y-8">
    <h1 className="text-3xl font-bold tracking-wide text-white">My Bookings</h1>

    {loading ? (
      <BookingSkeleton />
    ) : bookings.length === 0 ? (
      <div className="text-white/60">You don't have any bookings yet.</div>
    ) : (
      <div className="space-y-4">
        {bookings.map(b => {
          const { min, max } = getRoomLimits(b.room)
          return (
            <div
              key={b.id}
              className="glass rounded-xl p-5 space-y-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >
              {/* Booking info */}
              <div>
                <div className="text-purple-300 font-semibold text-lg">{b.room}</div>
                <div className="text-sm text-white/60">Date: {b.date}</div>
                <div className="text-sm text-green-400">Time: {b.time}</div>
              </div>

              {/* Players adjustment */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changePlayers(b.id, -1)}
                    className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                    disabled={b.players <= min}
                  >
                    -
                  </button>

                  <div className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 text-purple-400 font-semibold text-lg">
                    {b.players}
                  </div>

                  <button
                    onClick={() => changePlayers(b.id, 1)}
                    className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                    disabled={b.players >= max}
                  >
                    +
                  </button>
                </div>

                {b.players !== b.originalPlayers && (
                  <button
                    onClick={() => confirmPlayersChange(b.id)}
                    className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition"
                  >
                    Confirm Change
                  </button>
                )}
              </div>

              {/* Delete button */}
              <button
                onClick={() => setModalBooking(b)}
                disabled={deletingId === b.id}
                className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-lg text-white transition self-start"
              >
                {deletingId === b.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          )
        })}
      </div>
    )}
  </div>

  {/* Delete Modal */}
  {modalBooking && (
    <DeleteModal
      booking={modalBooking}
      onConfirm={() => handleDelete(modalBooking.id)}
      onCancel={() => setModalBooking(null)}
    />
  )}
</div>

  )
}
