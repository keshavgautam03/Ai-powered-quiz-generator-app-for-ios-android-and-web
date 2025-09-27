import { generateQuizQuestions } from "@/lib/ai-service"

export async function POST(req: Request) {
  try {
    const { topic } = await req.json()

    if (!topic) {
      return Response.json({ error: "Topic is required" }, { status: 400 })
    }

    const questions = await generateQuizQuestions(topic)
    return Response.json({ questions })
  } catch (error) {
    console.error("Error generating questions:", error)
    return Response.json({ error: "Failed to generate questions" }, { status: 500 })
  }
}
