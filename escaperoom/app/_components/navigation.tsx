"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { name: "HOME", href: "/" },
    { name: "ROOMS", href: "/rooms" },
    { name: "BLOG", href: "/blog" },
    { name: "BOOK NOW", href: "/booknow" },
    { name: "CONTACT US", href: "/contact" },
    { name: "LOGIN / REGISTER", href: "/login" },
  ]

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10
        bg-gradient-to-b from-[#1a0626] to-[#12001b]">
        
        <div className="max-w-7xl mx-auto h-20 px-6 md:px-10
          grid grid-cols-[auto_1fr_auto] items-center">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Escape Room"
              width={60}
              height={60}
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex justify-center gap-12 text-xs tracking-[0.25em]">
            {links.map(link => {
              const active = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative pb-2 transition-colors duration-200
                    ${active
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    }`}
                >
                  {link.name}

                  {active && (
                    <span className="absolute left-0 -bottom-[2px]
                      w-full h-[2px] bg-[#c77dff]" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* RIGHT ICONS + HAMBURGER */}
          <div className="flex items-center gap-3">

            {/* HAMBURGER – MOBILE ONLY */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center
                border border-white/20 rounded-lg text-xl"
            >
              ☰
            </button>

            {/* DESKTOP ICONS */}
            <div className="hidden md:flex items-center gap-4">
              {["search1", "facebook1", "instagram1"].map(icon => (
                <button
                  key={icon}
                  className="w-8 h-8 rounded-full border border-white/15
                    flex items-center justify-center
                    hover:border-[#c77dff] transition"
                >
                  <Image
                    src={`/icons/${icon}.png`}
                    alt={icon}
                    width={14}
                    height={14}
                    className="invert opacity-70"
                  />
                </button>
              ))}
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl
          flex flex-col items-center justify-center gap-8">

          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg tracking-widest hover:text-[#c77dff] transition"
            >
              {link.name}
            </Link>
          ))}

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
