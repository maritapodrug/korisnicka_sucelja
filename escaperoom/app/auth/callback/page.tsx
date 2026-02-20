"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      // Ovo parsira token iz URL-a i sprema session
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        return
      }

      router.replace("/")
    }

    handleAuth()
  }, [router])

  return <p>Logging you in...</p>
}
