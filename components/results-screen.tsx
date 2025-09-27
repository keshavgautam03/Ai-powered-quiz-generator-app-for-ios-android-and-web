"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RotateCcw } from "lucide-react"
import type { QuizQuestion } from "@/types/quiz"

interface ResultsScreenProps {
  topic: string
  questions: QuizQuestion[]
  answers: number[]
  score: number
  feedback: string
  onRestart: () => void
}

export function ResultsScreen({ topic, questions, answers, score, feedback, onRestart }: ResultsScreenProps) {
  const percentage = Math.round((score / questions.length) * 100)

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-500"
    if (percentage >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 80) return { text: "Excellent!", variant: "default" as const }
    if (percentage >= 60) return { text: "Good Job!", variant: "secondary" as const }
    return { text: "Keep Learning!", variant: "outline" as const }
  }

  const scoreBadge = getScoreBadge(percentage)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* Score Summary */}
        <Card className="bg-card border-border mb-8">
          <CardHeader className="text-center">
            <div className="mb-4">
              <div className={`text-6xl font-bold ${getScoreColor(percentage)}`}>{percentage}%</div>
              <Badge variant={scoreBadge.variant} className="mt-2">
                {scoreBadge.text}
              </Badge>
            </div>
            <CardTitle className="text-2xl font-semibold text-card-foreground">Quiz Complete: {topic}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground mb-4">
              You scored <span className="font-semibold text-foreground">{score}</span> out of{" "}
              <span className="font-semibold text-foreground">{questions.length}</span> questions
            </p>

            {feedback && (
              <div className="bg-accent/50 rounded-lg p-4 mb-6">
                <p className="text-accent-foreground text-pretty">{feedback}</p>
              </div>
            )}

            <Button onClick={onRestart} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Another Quiz
            </Button>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-card-foreground">Question Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = answers[index]
                const isCorrect = userAnswer === question.correctAnswer

                return (
                  <div key={question.id} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground mb-2 text-pretty">
                          {index + 1}. {question.question}
                        </h4>

                        <div className="space-y-1 text-sm">
                          <p className="text-muted-foreground">
                            Your answer:{" "}
                            <span className={isCorrect ? "text-green-500" : "text-red-500"}>
                              {question.options[userAnswer]}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-muted-foreground">
                              Correct answer:{" "}
                              <span className="text-green-500">{question.options[question.correctAnswer]}</span>
                            </p>
                          )}
                          {question.explanation && (
                            <p className="text-accent-foreground bg-accent/30 rounded p-2 mt-2 text-pretty">
                              {question.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
