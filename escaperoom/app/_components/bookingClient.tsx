"use client"

import { useState } from "react"
import Calendar from "./calendar"

export default function BookingClient() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <div className="flex flex-col items-center gap-10 py-20">
      <Calendar onSelectDate={setDate} />

      {date && (
        <div className="text-sm tracking-widest">
          Selected date:{" "}
          <span className="text-purple-400">
            {date.toDateString()}
          </span>
        </div>
      )}
    </div>
  )
}
