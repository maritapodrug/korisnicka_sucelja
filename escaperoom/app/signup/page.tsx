"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

 
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Please enter both your first and last name.")
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    setLoading(false)

    if (error) {
      if (error.message.toLowerCase().includes("already registered")) {
        setErrorMessage("This email is already in use. Please login instead.")
      } else {
        setErrorMessage(error.message)
      }
      return
    }

    if (!data.session) {
      setSuccessMessage("Check your email to confirm your account.")
      return
    }

    router.push("/")
  }

  async function handleGoogleSignup() {
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
        onSubmit={handleSignup}
        className="glass p-8 rounded-2xl space-y-4 w-80"
      >
        <h2 className="text-xl font-bold text-center">Sign Up</h2>

        {successMessage && (
          <div className="text-green-400 text-sm text-center">
            {successMessage}
          </div>
        )}

        {/* First Name */}
        <div className="flex flex-col">
          <input
            type="text"
            className="w-full p-2 rounded bg-white/10"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <input
            type="text"
            className="w-full p-2 rounded bg-white/10"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>

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
          {loading ? "Creating..." : "Create account"}
        </button>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-xs text-white/50">OR</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-white text-black p-2 rounded hover:bg-gray-200 transition"
          disabled={loading}
        >
          Continue with Google
        </button>
      </form>
    </div>
  )
}
