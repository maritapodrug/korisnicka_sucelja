"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // ✅ error state

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null) // reset prije svakog submit

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setErrorMessage(error.message) // inline prikaz
      return
    }

    // login uspješan → redirect
    router.push("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="glass p-8 rounded-2xl space-y-4 w-80"
      >
        <h2 className="text-xl font-bold">Login</h2>

        <div className="flex flex-col">
          <input
            className="w-full p-2 rounded bg-white/10"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errorMessage?.toLowerCase().includes("email") && (
            <span className="text-red-400 text-sm mt-1">{errorMessage}</span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            className="w-full p-2 rounded bg-white/10"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errorMessage && (
            <span className="text-red-400 text-sm mt-1">{errorMessage}</span>
          )}
        </div>

        <button type="submit" className="w-full bg-purple-600 p-2 rounded">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}
