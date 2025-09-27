import { generateFeedback } from "@/lib/ai-service"

export async function POST(req: Request) {
  try {
    const { topic, score, totalQuestions } = await req.json()

    if (!topic || score === undefined || !totalQuestions) {
      return Response.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const feedback = await generateFeedback(topic, score, totalQuestions)
    return Response.json({ feedback })
  } catch (error) {
    console.error("Error generating feedback:", error)
    return Response.json({ error: "Failed to generate feedback" }, { status: 500 })
  }
}
