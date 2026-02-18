"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useUser } from "../hooks/useUser"
import Link from "next/link"

type Booking = {
  id: string
  room: string
  date: string
  time: string
  created_at: string
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

  useEffect(() => {
    setShow(true) // trigger animacije kad se modal mount-a
  }, [])

  function handleClose() {
    setShow(false)
    setTimeout(onCancel, 300) // čekamo da animacija završi prije zatvaranja
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

useEffect(() => {
  if (!user) return  // <-- ako user ne postoji, prekini effect

  async function fetchBookings() {
    setLoading(true)

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false })

    if (!error && data) {
      setBookings(data)
    }

    setLoading(false)
  }

  fetchBookings()
}, [user])


  async function handleDelete(id: string) {
    setDeletingId(id)

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Failed to delete booking: " + error.message)
      setDeletingId(null)
      return
    }

    setBookings(prev => prev.filter(b => b.id !== id))
    setDeletingId(null)
    setModalBooking(null)
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
    <div className="flex flex-col items-center py-20 px-6">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold tracking-wide">
          My Bookings
        </h1>

        {loading ? (
          <BookingSkeleton />
        ) : bookings.length === 0 ? (
          <div className="text-white/60">
            You don't have any bookings yet.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="glass rounded-xl p-5 space-y-2 flex justify-between items-start"
              >
                <div>
                  <div className="text-purple-300 font-semibold text-lg">
                    {b.room}
                  </div>

                  <div className="text-sm text-white/60">
                    Date: {b.date}
                  </div>

                  <div className="text-sm text-green-400">
                    Time: {b.time}
                  </div>
                </div>

                <button
                  onClick={() => setModalBooking(b)}
                  disabled={deletingId === b.id}
                  className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
                >
                  {deletingId === b.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
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
