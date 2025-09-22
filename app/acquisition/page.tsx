"use client"

import Image from "next/image"
import Link from "next/link"

export default function AcquisitionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Image
                src="/Fundraise-M-A-Target-Identification-Algorithm-master/resources/CreedCap-Logo.png"
                alt="CreedCap Logo"
                width={150}
                height={60}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
              ← Back to Home
            </Link>
          </div>

          <h1 className="form-title">Acquisition Targets</h1>
          <p className="text-center text-gray-600 mb-8">
            Discover acquisition targets that align with your strategic objectives
          </p>

          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏢</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coming Soon</h2>
            <p className="text-gray-600">
              Our acquisition target identification system is being developed. This will help you find companies that
              match your acquisition criteria.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
