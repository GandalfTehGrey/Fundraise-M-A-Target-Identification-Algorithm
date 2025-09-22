"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import * as XLSX from "xlsx"

export default function AcquisitionsPage() {
  const [formData, setFormData] = useState({
    industry: "",
    geography: "",
    clientDescription: "",
  })
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/acquisition-targets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("API data:", data)
        setResults(data.targets || [])
      }
    } catch (error) {
      console.error("Error fetching acquisition targets:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportToExcel = () => {
    if (results.length === 0) return

    const worksheet = XLSX.utils.json_to_sheet(results)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Acquisition Targets")

    XLSX.writeFile(workbook, "acquisition_targets.xlsx")
  }

  return (
    <div className="min-h-screen bg-white font-['Inter',system-ui,-apple-system,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      {/* Header */}
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
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 mb-4 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Back
          </Link>

          {/* Form Section */}
          <section className="bg-[#DAFBE6] rounded-[10px] p-8 mb-8">
            <h1 className="text-2xl font-bold text-[#101828] mb-3">
              Strategic Acquisition Finder
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="industry"
                  className="block text-[13px] font-semibold text-[#334155] mb-2"
                >
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="e.g. Technology, Healthcare"
                  className="w-full h-11 px-3 text-sm text-[#101828] bg-transparent border border-[#CDEED6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630] focus:ring-opacity-20 placeholder:text-[#94A3B8]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="geography"
                  className="block text-[13px] font-semibold text-[#334155] mb-2"
                >
                  Geography
                </label>
                <input
                  type="text"
                  id="geography"
                  name="geography"
                  value={formData.geography}
                  onChange={handleInputChange}
                  placeholder="e.g. North America, Europe"
                  className="w-full h-11 px-3 text-sm text-[#101828] bg-transparent border border-[#CDEED6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630] focus:ring-opacity-20 placeholder:text-[#94A3B8]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="clientDescription"
                  className="block text-[13px] font-semibold text-[#334155] mb-2"
                >
                  Client Description
                </label>
                <textarea
                  id="clientDescription"
                  name="clientDescription"
                  value={formData.clientDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your client's business, goals, and strategic objectives..."
                  rows={4}
                  className="w-full px-3 py-3 text-sm text-[#101828] bg-transparent border border-[#CDEED6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#016630] focus:ring-opacity-20 placeholder:text-[#94A3B8] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#016630] hover:bg-[#014f29] disabled:opacity-50 text-white font-semibold text-base rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Analyzing Targets...
                  </>
                ) : (
                  "Analyze Targets"
                )}
              </button>
            </form>
          </section>

          {/* Synergy Section */}
          <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#101828] mb-4">Synergy Categories</h3>
            <div className="space-y-3">
              {[
                ["bg-blue-500", "Product/Service Fit", "Does the target's product help the client's customers?"],
                ["bg-green-500", "Geographic Expansion", "Does the target operate where the client wants to grow?"],
                ["bg-purple-500", "Supply Chain Control", "Does the target own factories/tech the client needs?"],
                ["bg-orange-500", "Cost Savings", "Can merging cut expenses (e.g., layoffs, shared offices)?"],
                ["bg-red-500", "Tech/IP", "Does the target have patents the client wants?"],
              ].map(([dot, title, desc], i) => (
                <div className="flex items-start gap-3" key={i}>
                  <div className={`w-3 h-3 ${dot} rounded-full mt-1 flex-shrink-0`}></div>
                  <div>
                    <span className="font-semibold text-[#101828]">{title}</span>
                    <p className="text-sm text-[#334155]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#101828]">
                Potential Acquisition Targets
              </h2>
              {/* Export button always visible but disabled if no results */}
              <button
                onClick={exportToExcel}
                disabled={results.length === 0}
                className={`inline-flex items-center gap-2 px-4 py-2 text-white font-medium rounded-lg transition-colors text-sm ${
                  results.length > 0
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6v-1h8v1H6zm0 2v-1h8v1H6zm0 2v-1h8v1H6z" />
                </svg>
                Export to Excel
              </button>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((target, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-[#101828] mb-2">{target.name}</h3>
                    <p className="text-[#334155] text-sm mb-3">{target.description}</p>
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
            ) : (
              <div className="text-center py-6 text-[#334155]">
                <p>No acquisition targets found yet. Use the form above to analyze targets.</p>
              </div>
            )}
          </div>

          {/* Analysis Process */}
          <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#101828] mb-4">Analysis Process</h3>
            <div className="space-y-3">
              {[
                ["bg-green-500", "text-green-800", "Tier 1: Industry & Geography Filter", true],
                ["bg-gray-400", "text-gray-600", "Tier 2: Strategic Fit Analysis", false],
                ["bg-gray-400", "text-gray-600", "Tier 3: Financial Viability", false],
                ["bg-gray-400", "text-gray-600", "Tier 4: Banker Review", false],
              ].map(([circle, text, label, active], i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 ${
                    active ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                  } rounded-lg`}
                >
                  <div className={`w-6 h-6 ${circle} text-white rounded-full flex items-center justify-center text-xs font-bold`}>
                    {i + 1}
                  </div>
                  <span className={`font-semibold ${text}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
