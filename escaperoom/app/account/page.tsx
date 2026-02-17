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

// Skeleton loader
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

export default function AccountPage() {
  const user = useUser()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    async function fetchBookings() {
      setLoading(true)

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setBookings(data)
      }

      setLoading(false)
    }

    fetchBookings()
  }, [user])

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
                className="glass rounded-xl p-5 space-y-2"
              >
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
