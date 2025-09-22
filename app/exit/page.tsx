"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ExitPage() {
  const [formData, setFormData] = useState({
    industry: "",
    geography: "",
  })
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/exit-targets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setResults(data.targets || [])
      }
    } catch (error) {
      console.error("Error fetching exit targets:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-['Inter',system-ui,-apple-system,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <Link href="/">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/CreedCap-Logo%281%29-2xweWWHUo9FxESzktgZ92ludy6BAeE.png"
            alt="CreedCap Logo"
            width={150}
            height={40}
            className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            priority
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-md mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
          >
            ← Back
          </Link>
        </div>

        <div className="w-full max-w-md bg-[#DAFBE6] rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Exit Targets</h1>
            <p className="text-gray-600 text-sm">Identify strategic exit opportunities and potential acquirers</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                placeholder="e.g. Technology, Healthcare"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
                required
              />
            </div>

            <div>
              <label htmlFor="geography" className="block text-sm font-medium text-gray-700 mb-2">
                Geography
              </label>
              <input
                type="text"
                id="geography"
                name="geography"
                value={formData.geography}
                onChange={handleInputChange}
                placeholder="e.g. North America, Europe"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Finding Exit Targets...
                </>
              ) : (
                <>Find Exit Targets</>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="w-full max-w-4xl mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Potential Exit Targets:</h2>
            <div className="grid grid-cols-1 gap-6">
              {results.map((target: any, index: number) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{target.name}</h3>
                  <p className="text-gray-600 mb-4">{target.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      {target.industry}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {target.geography}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
