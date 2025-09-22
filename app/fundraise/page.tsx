"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function FundraisePage() {
  const [formData, setFormData] = useState({
    clientDomain: "",
    stage: "",
    ticketSize: "",
    location: "",
    investorType: "",
    investorFeedName: "",
  })
  const [results, setResults] = useState([])
  const [competitorResults, setCompetitorResults] = useState([])
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
      const response = await fetch("/api/investors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setResults(data.investors || [])
        setCompetitorResults(data.competitorInvestors || [])
      }
    } catch (error) {
      console.error("Error fetching investors:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-['Inter',system-ui,-apple-system,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <header className="flex items-center justify-between p-6">
        <Link href="/">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/CreedCap-Logo%281%29-BWP2yDW2zvkM0EoxZ7oKbpuE3jPUMf.png"
            alt="CREEDCAP"
            width={160}
            height={40}
            className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            priority
          />
        </Link>
      </header>

      <main className="flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 mb-4 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Back
          </Link>

          <section className="bg-[#DAFBE6] rounded-[10px] p-8 mb-8">
            <h1 className="text-2xl font-bold text-[#101828] mb-3">Find Investors</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Client Domain Field */}
              <div>
                <label htmlFor="clientDomain" className="block text-[13px] font-semibold text-[#334155] mb-2">
                  Client Domain
                </label>
                <input
                  type="text"
                  id="clientDomain"
                  name="clientDomain"
                  value={formData.clientDomain}
                  onChange={handleInputChange}
                  placeholder="Enter Client Domain (e.g. tracxn.com)"
                  className="w-full h-11 px-3 text-sm text-[#101828] bg-transparent border border-[#CDEED6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630] focus:ring-opacity-20 placeholder:text-[#94A3B8]"
                />
              </div>

              {/* Stage Field */}
              <div>
                <label htmlFor="stage" className="block text-[13px] font-semibold text-[#334155] mb-2">
                  Stage
                </label>
                <select
                  id="stage"
                  name="stage"
                  value={formData.stage}
                  onChange={handleInputChange}
                  className="w-full h-11 px-3 text-sm text-[#101828] bg-transparent border border-[#CDEED6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630] focus:ring-opacity-20"
                  required
                >
                  <option value="">Select Stage</option>
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                </select>
              </div>

              {/* Ticket Size Field */}
              <div>
                <label htmlFor="ticketSize" className="block text-[13px] font-semibold text-[#334155] mb-2">
                  Ticket Size (USD)
                </label>
                <input
                  type="text"
                  id="ticketSize"
                  name="ticketSize"
                  value={formData.ticketSize}
                  onChange={handleInputChange}
                  placeholder="1000000"
                  className="w-full h-11 px-3 text-sm text-[#101828] bg-transparent border border-[#CDEED6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630] focus:ring-opacity-20 placeholder:text-[#94A3B8]"
                />
              </div>

              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-[13px] font-semibold text-[#334155] mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="San Francisco, CA"
                  className="w-full h-11 px-3 text-sm text-[#101828] bg-transparent border border-[#CDEED6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630] focus:ring-opacity-20 placeholder:text-[#94A3B8]"
                />
              </div>

              {/* Investor Type Field */}
              <div>
                <label htmlFor="investorType" className="block text-[13px] font-semibold text-[#334155] mb-2">
                  Investor Type
                </label>
                <select
                  id="investorType"
                  name="investorType"
                  value={formData.investorType}
                  onChange={handleInputChange}
                  className="w-full h-11 px-3 text-sm text-[#101828] bg-transparent border border-[#CDEED6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630] focus:ring-opacity-20"
                >
                  <option value="">Select Investor Type</option>
                  <option value="Corporate Investors">Corporate Investors</option>
                  <option value="Angel Investors">Angel Investors</option>
                </select>
              </div>

              {/* Investor Feed Field */}
              <div>
                <label htmlFor="investorFeedName" className="block text-[13px] font-semibold text-[#334155] mb-2">
                  Investor Feed
                </label>
                <select
                  id="investorFeedName"
                  name="investorFeedName"
                  value={formData.investorFeedName}
                  onChange={handleInputChange}
                  className="w-full h-11 px-3 text-sm text-[#101828] bg-transparent border border-[#CDEED6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630] focus:ring-opacity-20"
                >
                  <option value="">Select Investor Feed</option>
                  <option value="Venture Capital Funds">Venture Capital Funds</option>
                  <option value="Private Equity Funds">Private Equity Funds</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#016630] hover:bg-[#014f29] disabled:opacity-50 text-white font-semibold text-base rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Finding Investors...
                  </>
                ) : (
                  "Find Investors"
                )}
              </button>
            </form>
          </section>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#101828] mb-4">Potential Investors:</h2>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {results.map((investor: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-[#101828] mb-2">{investor.name}</h3>
                    <p className="text-[#334155] text-sm">{investor.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-[#334155]">
                <p>No potential investors found yet. Use the form above to search for investors.</p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#101828] mb-4">Competitor Investors:</h2>
            {competitorResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {competitorResults.map((investor: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-[#101828] mb-2">{investor.name}</h3>
                    <p className="text-[#334155] text-sm">{investor.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-[#334155]">
                <p>No competitor investors found yet. Use the form above to search for investors.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
