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
      <header
        className="fixed top-0 left-0 w-full z-50
        bg-[#13021d] border-b border-white/10"
      >
        <div
          className="
          max-w-7xl mx-auto h-20 px-6 md:px-10
          flex items-center justify-between
        "
        >
          {/* LOGO – LEFT */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo.png"
              alt="Escape Room"
              width={80}
              height={80}
              priority
            />
          </Link>

          {/* DESKTOP NAV – CENTER */}
          <nav
            className="
            hidden md:flex
            absolute left-1/2 -translate-x-1/2
            gap-12 text-xs tracking-[0.25em]
          "
          >
            {links.map(link => {
              const active = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative pb-2 transition-colors duration-200
                    ${active
                      ? "text-white"
                      : "text-white/70 hover:text-white"}
                  `}
                >
                  {link.name}

                  {active && (
                    <span
                      className="absolute left-0 -bottom-[2px]
                      w-full h-[2px] bg-[#ca7ef6]"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* DESKTOP ICONS */}
            <div className="hidden md:flex items-center gap-4">
              {[ "facebook1", "instagram1"].map(icon => (
                <button
                  key={icon}
                  className="
                    w-9 h-9 flex items-center justify-center
                    rounded-full border border-white/20
                    hover:border-[#ca7ef6] transition
                  "
                >
                  <Image
                    src={`/icons/${icon}.png`}
                    alt={icon}
                    width={16}
                    height={16}
                    className="invert opacity-80"
                  />
                </button>
              ))}
            </div>

            {/* HAMBURGER – MOBILE ONLY */}
            <button
              onClick={() => setMenuOpen(true)}
              className="
                md:hidden w-10 h-10
                flex items-center justify-center
                border border-white/20
                rounded-lg text-2xl
              "
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div
          className="
          fixed inset-0 z-[999]
          bg-black/95 backdrop-blur-xl
          flex flex-col items-center justify-center
          text-center gap-10
        "
        >
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="
                text-xl tracking-[0.3em]
                hover:text-[#ca7ef6]
                transition
              "
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
