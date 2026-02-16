"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    // Ako postoji error
    if (error) {
      // ✅ fallback za zauzet email
      if (error.message.toLowerCase().includes("already registered")) {
        setErrorMessage("This email is already in use. Please login instead.")
      } else {
        setErrorMessage(error.message)
      }
      return
    }

    // Signup uspješan → redirect
    router.push("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="glass p-8 rounded-2xl space-y-4 w-80"
      >
        <h2 className="text-xl font-bold">Sign Up</h2>

        {/* Email input */}
        <div className="flex flex-col">
          <input
            type="email"
            className={`w-full p-2 rounded bg-white/10 ${
              errorMessage?.toLowerCase().includes("email") ? "border border-red-400" : ""
            }`}
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errorMessage?.toLowerCase().includes("email") && (
            <span className="text-red-400 text-sm mt-1">{errorMessage}</span>
          )}
        </div>

        {/* Password input */}
        <div className="flex flex-col">
          <input
            type="password"
            className={`w-full p-2 rounded bg-white/10 ${
              errorMessage?.toLowerCase().includes("password") ? "border border-red-400" : ""
            }`}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errorMessage?.toLowerCase().includes("password") && (
            <span className="text-red-400 text-sm mt-1">{errorMessage}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 p-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  )
}
