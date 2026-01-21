"use client"

import { useState } from "react"

type CalendarProps = {
  onSelectDate?: (date: Date) => void
}

export default function Calendar({ onSelectDate }: CalendarProps) {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const daysInMonth = lastDayOfMonth.getDate()
  const startDay = (firstDayOfMonth.getDay() + 6) % 7 // Monday start

  const days = Array.from({ length: startDay + daysInMonth })

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  })

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  function selectDate(day: number) {
    const date = new Date(year, month, day)
    setSelectedDate(date)
    onSelectDate?.(date)
  }

  function isPast(day: number) {
    const date = new Date(year, month, day)
    return date < new Date(today.setHours(0, 0, 0, 0))
  }

  return (
    <div className="glass rounded-2xl p-6 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="px-3 py-1 rounded hover:bg-white/10">
          ←
        </button>

        <h3 className="font-bold tracking-widest text-sm uppercase">
          {monthName}
        </h3>

        <button onClick={nextMonth} className="px-3 py-1 rounded hover:bg-white/10">
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((_, i) => {
          const day = i - startDay + 1
          if (day < 1 || day > daysInMonth) {
            return <div key={i} />
          }

          const isSelected =
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year

          const disabled = isPast(day)

          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => selectDate(day)}
              className={`
                h-10 rounded-lg text-sm transition
                ${disabled
                  ? "text-gray-600 cursor-not-allowed"
                  : "hover:bg-purple-600/20"}
                ${isSelected
                  ? "bg-purple-600 text-white"
                  : ""}
              `}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
