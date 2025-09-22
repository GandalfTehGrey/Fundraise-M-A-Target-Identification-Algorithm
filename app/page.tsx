"use client"

import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white transition-colors font-['Inter',system-ui,-apple-system,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/CreedCap-Logo%281%29-QWb3zM1ygFoDqRTnRaO7Le5oiWqlQh.png"
          alt="CREEDCAP"
          width={160}
          height={40}
          className="h-10 w-auto"
          priority
        />
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered M&A & Fundraising Platform</h1>
          <p className="text-gray-600 text-lg">Choose your analysis type to get started</p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl w-full">
          <Link href="/fundraise" className="group">
            <div className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-lg transition-all duration-200 text-center shadow-lg hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fundraise</h3>
              <p className="text-green-100 text-sm">Find investors for your funding round</p>
            </div>
          </Link>

          <Link href="/merger" className="group">
            <div className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-lg transition-all duration-200 text-center shadow-lg hover:shadow-xl">
              <div className="flex justify-center mb-4">
                {/* Updated Mergers SVG */}
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h7l-3-3m0 6l3-3h11" />
                  <path d="M21 12h-7l3-3m0 6l-3-3H3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mergers</h3>
              <p className="text-green-100 text-sm">Identify strategic merger opportunities</p>
            </div>
          </Link>

          <Link href="/acquisitions" className="group">
            <div className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-lg transition-all duration-200 text-center shadow-lg hover:shadow-xl">
              <div className="flex justify-center mb-4">
                {/* Improved Acquisitions SVG */}
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="8" width="18" height="12" rx="2" ry="2"/>
                  <path d="M12 3v11"/>
                  <path d="m8 10 4 4 4-4"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Acquisitions</h3>
              <p className="text-green-100 text-sm">Find acquisition targets and analyze synergies</p>
            </div>
          </Link>

          <Link href="/exit" className="group">
            <div className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-lg transition-all duration-200 text-center shadow-lg hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                  <path d="M3 12a9 9 0 0 1 9-9 9 9 0 1 1-9 9Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Exits</h3>
              <p className="text-green-100 text-sm">Plan and execute your exit strategy</p>
            </div>
          </Link>
        </div>

        {/* AI Analysis Capabilities */}
        <div className="max-w-6xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Analysis Capabilities</h2>
            <p className="text-gray-600">Our AI evaluates multiple synergy dimensions for comprehensive insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#016630" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
                </svg>
                <h3 className="text-lg font-semibold text-green-600 ml-3">Product/Service Fit</h3>
              </div>
              <p className="text-gray-600 text-sm">Cross-selling opportunities and product synergies</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#016630" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <h3 className="text-lg font-semibold text-green-600 ml-3">Geographic Expansion</h3>
              </div>
              <p className="text-gray-600 text-sm">Market expansion and regional growth potential</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#016630" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20V10"/>
                  <path d="M18 20V4"/>
                  <path d="M6 20v-4"/>
                </svg>
                <h3 className="text-lg font-semibold text-green-600 ml-3">Cost Savings</h3>
              </div>
              <p className="text-gray-600 text-sm">Operational efficiency and cost reduction opportunities</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#016630" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
                  <path d="m6 6 12 12"/>
                </svg>
                <h3 className="text-lg font-semibold text-green-600 ml-3">Supply Chain Control</h3>
              </div>
              <p className="text-gray-600 text-sm">Vertical integration and supply chain synergies</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#016630" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 11 3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                <h3 className="text-lg font-semibold text-green-600 ml-3">Tech/IP Synergies</h3>
              </div>
              <p className="text-gray-600 text-sm">Technology compatibility and IP value</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#016630" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <h3 className="text-lg font-semibold text-green-600 ml-3">AI-Powered Scoring</h3>
              </div>
              <p className="text-gray-600 text-sm">Comprehensive analysis with Google integration</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
