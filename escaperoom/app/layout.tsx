import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "./_components/navigation";
import { Footer } from "./_components/footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
<script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

export const metadata: Metadata = {
  title: "EscapeRoom",
  description: "Enter the unknown",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b0214] text-white antialiased">
        <NuqsAdapter>
          <Navigation />
          {children}
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
