"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import type { Topic } from "@/types/quiz"

const topics: Topic[] = [
  {
    id: "wellness",
    name: "Wellness & Health",
    description: "Test your knowledge about physical and mental wellness",
    icon: "🏃‍♂️",
  },
  {
    id: "tech-trends",
    name: "Tech Trends",
    description: "Stay updated with the latest technology developments",
    icon: "💻",
  },
  {
    id: "science",
    name: "Science & Nature",
    description: "Explore the wonders of science and natural world",
    icon: "🔬",
  },
  {
    id: "history",
    name: "History & Culture",
    description: "Journey through historical events and cultural knowledge",
    icon: "🏛️",
  },
  {
    id: "business",
    name: "Business & Finance",
    description: "Test your understanding of business and financial concepts",
    icon: "📈",
  },
  {
    id: "arts",
    name: "Arts & Literature",
    description: "Dive into the world of arts, music, and literature",
    icon: "🎨",
  },
]

interface TopicSelectionProps {
  onTopicSelect: (topic: string) => void
  error?: string | null
}

export function TopicSelection({ onTopicSelect, error }: TopicSelectionProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">AI Knowledge Quiz</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Choose a topic and test your knowledge with AI-generated questions
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8 max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-border bg-card"
              onClick={() => onTopicSelect(topic.name)}
            >
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {topic.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-card-foreground">{topic.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground mb-4 text-pretty">
                  {topic.description}
                </CardDescription>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation()
                    onTopicSelect(topic.name)
                  }}
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Each quiz contains 5 AI-generated questions with personalized feedback
          </p>
        </div>
      </div>
    </div>
  )
}
