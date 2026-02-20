"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setErrorMessage(error.message)
      return
    }

    router.push("/")
  }

  async function handleGoogleLogin() {
    setLoading(true)
    setErrorMessage(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="glass p-8 rounded-2xl space-y-4 w-80"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        {/* Email input */}
        <div className="flex flex-col">
          <input
            type="email"
            className="w-full p-2 rounded bg-white/10"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password input */}
        <div className="flex flex-col">
          <input
            type="password"
            className="w-full p-2 rounded bg-white/10"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="text-red-400 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 p-2 rounded hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-xs text-white/50">OR</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Google login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black p-2 rounded hover:bg-gray-200 transition"
          disabled={loading}
        >
          Continue with Google
        </button>
      </form>
    </div>
  )
}
