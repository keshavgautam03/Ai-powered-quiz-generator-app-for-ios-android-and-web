"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  topic: string
}

const loadingMessages = [
  "Analyzing your topic...",
  "Crafting thoughtful questions...",
  "Adding educational explanations...",
  "Finalizing your personalized quiz...",
]

export function LoadingScreen({ topic }: LoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card border-border">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-card-foreground mb-3">Generating Quiz</h2>

          <p className="text-muted-foreground mb-4 text-pretty">
            AI is creating personalized questions about <span className="font-medium text-foreground">{topic}</span>
          </p>

          <div className="min-h-[24px] mb-4">
            <p className="text-sm text-accent-foreground animate-pulse transition-opacity duration-500">
              {loadingMessages[messageIndex]}
            </p>
          </div>

          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
