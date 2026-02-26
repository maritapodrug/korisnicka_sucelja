"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("Booking Question")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hp, setHp] = useState("") // honeypot
  const toastTimeout = useRef<number | null>(null)

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)

  try {
    await emailjs.send(
      "service_4xit7mb",
      "template_28msx7l",
      { name, email, phone, subject, message },
      "FFMt7iEcrbqX8wRJH"
    )

    setSuccessMsg("Email sent!")
  } catch (err) {
    setError("Failed to send email")
  } finally {
    setLoading(false)
  }
}

  function showToastTemporarily() {
    if (toastTimeout.current) window.clearTimeout(toastTimeout.current)
    toastTimeout.current = window.setTimeout(() => setSuccessMsg(null), 4500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#05000a] to-[#030007] text-white py-20 px-6 pt-32">
      <div className="max-w-6xl mx-auto">

        {/* Page heading */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have a question about bookings, group events, or accessibility? Send us a message and our team will get back within 24 hours.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT: FORM PANEL */}
          <div>
            <div className="relative rounded-2xl p-1" aria-hidden="true" style={{ background: "linear-gradient(180deg, rgba(202,126,246,0.18), rgba(124,58,237,0.08))" }}>
              <div className="bg-[#0f0812] rounded-2xl p-8 shadow-xl border border-white/6">
                <h2 className="text-2xl font-semibold mb-3">Send a message</h2>
                <p className="text-sm text-gray-400 mb-6">Prefer email? Use the form — we reply fast. For urgent matters call us directly.</p>

                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
                  {/* hidden honeypot */}
                  <input
                    aria-hidden
                    style={{ display: "none" }}
                    name="hp"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <label className="text-xs text-gray-400">Full name</label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400">Email</label>
                    <input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400">Phone (optional)</label>
                    <input
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="+385..."
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400">Subject</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option>Booking Question</option>
                      <option>Group Event</option>
                      <option>Birthday Party</option>
                      <option>Corporate Event</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400">Message</label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={6}
                      className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Tell us about your request..."
                      required
                    />
                  </div>

                  {error && <div role="alert" className="text-red-400 text-sm">{error}</div>}
                  {successMsg && <div role="status" className="text-green-400 text-sm">{successMsg}</div>}

                  <div className="flex items-center gap-4">
                    <button
                      disabled={loading}
                      type="submit"
                      className="flex items-center gap-3 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition focus:ring-2 focus:ring-purple-300"
                    >
                      <svg className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 12h18" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {loading ? "Sending..." : "Send message"}
                    </button>

                    <a href="tel:+38511223344" className="text-sm text-gray-300 underline-offset-2 hover:underline">Or call us</a>
                  </div>
                </form>
              </div>
            </div>

            {/* subtle accent divider */}
            <div className="mt-6 flex gap-3">
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded" />
              <div className="w-8 h-1 bg-white/10 rounded" />
            </div>
          </div>

          {/* RIGHT: CONTACT CARDS */}
          <aside className="space-y-6">

            <div className="p-6 rounded-2xl bg-white/4 border border-white/6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-700/30 to-black/30 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M22 16.92V20a1 1 0 01-1.11 1 19.8 19.8 0 01-8.63-3.16 19.5 19.5 0 01-6-6A19.8 19.8 0 013 3.11 1 1 0 014 2h3.09a1 1 0 01.95.68l1.2 4.03a1 1 0 01-.25.95L8.7 9.7a14 14 0 006 6l1.03-1.03a1 1 0 01.95-.25l4.03 1.2A1 1 0 0122 16.92z" stroke="#E9D5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-300 uppercase tracking-widest">Call</div>
                <a href="tel:+38511223344" className="font-semibold text-white hover:text-purple-300">(+385) 11 223 344</a>
                
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/4 border border-white/6 shadow-sm flex items-center gap-4">
              {/* location icon (inline svg) */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-700/30 to-black/30 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="#E9D5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 7v5l3.5 1.8" stroke="#E9D5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="0.7" fill="#E9D5FF" />
                    </svg>
                </div>
              <div>
                  <div className="text-sm text-gray-300 uppercase tracking-widest">Hours</div>
                  <div className="font-semibold text-white">9:00am – 11:00pm</div>
                  <div className="text-sm text-gray-400">Open every day</div>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/4 border border-white/6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-700/30 to-black/30 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="#E9D5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0118 0z" stroke="#E9D5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
                <div>
                <div className="text-sm text-gray-300 uppercase tracking-widest">Visit</div>
                <div className="font-semibold text-white">Ulica Slobode 14</div>
                <div className="text-sm text-gray-400"></div>
                </div>

              </div>

              {/* small map preview */}
              <div className="mt-4 rounded-md overflow-hidden h-36">
                <iframe
                  className="w-full h-full border-0"
                  loading="lazy"
                  src="https://www.google.com/maps?q=Ulica%20Slobode%2014%20Split&output=embed"
                  title="Map"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Toast */}
      <div
        aria-live="polite"
        className={`fixed right-6 bottom-6 z-50 transform transition-all ${
          successMsg ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg">
          {successMsg ?? "Sent"}
        </div>
      </div>
    </main>
  )
}