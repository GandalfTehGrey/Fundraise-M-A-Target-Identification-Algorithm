import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "CreedCap Platform",
  description: "Your comprehensive platform for fundraising, mergers, acquisitions, and strategic exits",
  icons: {
    icon: "/favicon.ico",
  },
  generator: 'CreedCap'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
