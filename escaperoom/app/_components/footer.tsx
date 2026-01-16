import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#0d0015] to-[#160021] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* BRAND */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Escape Room" width={80} height={80} />
            
          </div>

          <div className="flex gap-4">
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white tracking-widest text-xs mb-4">
            QUICK LINKS
          </h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/rooms">Rooms</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/login">Register</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white tracking-widest text-xs mb-4">
            CONTACT
          </h4>
          <p className="text-sm text-white/60">
            info@escaperoom.com
          </p>
          <p className="text-sm text-white/60">
            +385 12 123344
          </p>
        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Escape Room. All rights reserved.
      </div>
    </footer>
  )
}
