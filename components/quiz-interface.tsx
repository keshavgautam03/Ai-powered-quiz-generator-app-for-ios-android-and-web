"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import type { QuizQuestion } from "@/types/quiz"

interface QuizInterfaceProps {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  answers: number[]
  onAnswerSelect: (questionIndex: number, answerIndex: number) => void
  onNavigate: (direction: "prev" | "next") => void
  onComplete: () => void
}

export function QuizInterface({
  questions,
  currentQuestionIndex,
  answers,
  onAnswerSelect,
  onNavigate,
  onComplete,
}: QuizInterfaceProps) {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const hasAnswered = answers[currentQuestionIndex] !== undefined

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setSelectedAnswer(answers[currentQuestionIndex] ?? null)
  }, [currentQuestionIndex, answers])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    onAnswerSelect(currentQuestionIndex, answerIndex)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Enhanced Progress Bar with Timer */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {formatTime(timeElapsed)}
              </div>
              <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Enhanced Question Card with Animation */}
        <Card className="bg-card border-border mb-6 transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-card-foreground text-balance">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full text-left justify-start p-4 h-auto whitespace-normal transition-all duration-200 transform hover:scale-[1.02] ${
                    selectedAnswer === index
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card hover:bg-accent text-card-foreground hover:text-accent-foreground"
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="font-medium mr-3 flex-shrink-0">{String.fromCharCode(65 + index)}.</span>
                  <span className="text-pretty">{option}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => onNavigate("prev")}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={onComplete}
              disabled={!hasAnswered}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            >
              Complete Quiz
            </Button>
          ) : (
            <Button
              onClick={() => onNavigate("next")}
              disabled={!hasAnswered}
              className="flex items-center gap-2 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Enhanced Answer Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                answers[index] !== undefined
                  ? "bg-primary scale-110"
                  : index === currentQuestionIndex
                    ? "bg-accent border-2 border-primary animate-pulse"
                    : "bg-muted hover:bg-muted-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
