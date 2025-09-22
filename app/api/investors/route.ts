import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // This is where you would integrate with your backend API
    // For now, returning mock data to demonstrate the UI
    const mockInvestors = [
      {
        name: "Sequoia Capital",
        description: "Leading venture capital firm focused on technology companies",
        type: "Venture Capital",
      },
      {
        name: "Andreessen Horowitz",
        description: "Venture capital firm investing in bold entrepreneurs",
        type: "Venture Capital",
      },
    ]

    const mockCompetitorInvestors = [
      {
        name: "Accel Partners",
        description: "Global venture capital firm partnering with exceptional entrepreneurs",
        type: "Venture Capital",
      },
    ]

    return NextResponse.json({
      investors: mockInvestors,
      competitorInvestors: mockCompetitorInvestors,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch investors" }, { status: 500 })
  }
}
