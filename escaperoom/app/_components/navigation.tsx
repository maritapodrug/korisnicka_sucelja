"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useUser } from "../hooks/useUser"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const user = useUser()

  const links = [
    { name: "HOME", href: "/" },
    { name: "ROOMS", href: "/rooms" },
    { name: "BLOG", href: "/blog" },
    { name: "BOOK NOW", href: "/booknow" },
    { name: "CONTACT US", href: "/contact" },
  ]

  async function logout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  function getInitials(email: string) {
    const name = email.split("@")[0]
    const parts = name.split(".")
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name.slice(0, 2).toUpperCase()
  }

  // zatvaranje dropdowna klikom izvan
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (!target.closest("#avatar-dropdown")) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#13021d] border-b border-white/10">
        <div className="max-w-7xl mx-auto h-20 px-6 md:px-10 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/logo.png" alt="Escape Room" width={80} height={80} priority />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-12 text-xs tracking-[0.25em] h-full">
            {links.map(link => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative h-full flex items-center px-4 whitespace-nowrap text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 ${active && "text-white"}`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute left-0 -bottom-[2px] w-full h-[2px] bg-[#ca7ef6]" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* AUTH AREA */}
            {user ? (
  <div id="avatar-dropdown" className="relative hidden md:flex items-center gap-3">
    {/* Avatar circle */}
    <button
      onClick={() => setDropdownOpen(prev => !prev)}
      className="
        w-10 h-10 rounded-full bg-purple-600 text-white
        flex items-center justify-center font-semibold text-sm uppercase
        transition-transform duration-200 ease-in-out
        hover:scale-110 hover:shadow-lg cursor-pointer
      "
    >
      {getInitials(user.email!)}
    </button>

    {/* Dropdown menu */}
    {dropdownOpen && (
      <div className="absolute top-full mt-2 right-0 w-40 bg-[#1a0d2a] rounded-lg shadow-lg flex flex-col border border-white/10 overflow-hidden z-50">
        <button
          onClick={() => {
            router.push("/account")
            setDropdownOpen(false)
          }}
          className="w-full text-left px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white transition cursor-pointer"
        >
          Account
        </button>
        <button
          onClick={() => {
            logout()
            setDropdownOpen(false)
          }}
          className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 hover:text-red-300 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    )}
  </div>

            ) : (
              <div className="hidden md:flex items-center gap-3 text-xs tracking-widest">
                {/* LOGIN */}
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition"
                >
                  LOGIN
                </Link>

                {/* SIGNUP */}
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-[#ca7ef6] text-white font-semibold hover:brightness-110 transition"
                >
                  SIGN UP
                </Link>
              </div>
            )}

            {/* HAMBURGER */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center border border-white/20 rounded-lg text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center text-center gap-10">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="w-full py-6 text-xl tracking-[0.3em] text-white flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:text-[#ca7ef6]"
            >
              {link.name}
            </Link>
          ))}

          {/* MOBILE AUTH */}
          {user ? (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => router.push("/account")}
                className="
                w-16 h-16 rounded-full bg-purple-600 text-white
                flex items-center justify-center font-semibold text-lg uppercase
                transition-transform duration-200 ease-in-out
                hover:scale-110 hover:shadow-lg
              "
            >
                {getInitials(user.email!)}
              </button>

              <button
                onClick={() => {
                  logout()
                  setMenuOpen(false)
                }}
                className="
                  w-full
                  py-4
                  text-white
                  font-semibold
                  text-lg
                  hover:text-red-500
                  transition-all
                  shadow-md
                "
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full px-10">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="py-4 rounded-xl border border-white/20 text-white text-lg hover:bg-white/10"
              >
                LOGIN
              </Link>

              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="py-4 rounded-xl bg-[#ca7ef6] text-white text-lg font-semibold"
              >
                SIGN UP
              </Link>
            </div>
          )}

          {/* CLOSE */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-3xl"
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}
