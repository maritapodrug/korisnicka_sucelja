import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "./_components/navigation";
import { Footer } from "./_components/footer"
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
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
