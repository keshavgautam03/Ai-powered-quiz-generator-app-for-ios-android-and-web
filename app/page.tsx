"use client"

import { useState, useCallback } from "react"
import { TopicSelection } from "@/components/topic-selection"
import { LoadingScreen } from "@/components/loading-screen"
import { QuizInterface } from "@/components/quiz-interface"
import { ResultsScreen } from "@/components/results-screen"
import { ErrorBoundary } from "@/components/error-boundary"
import { generateQuizQuestions, generateFeedback } from "@/lib/ai-service"
import { generateQuizQuestions as generateQuizQuestionsMobile, generateFeedback as generateFeedbackMobile } from "@/lib/mobile-ai-service"
import { Capacitor } from '@capacitor/core'
import type { QuizQuestion, QuizScreen } from "@/types/quiz"

export default function QuizApp() {
  const [currentScreen, setCurrentScreen] = useState<QuizScreen>("topic-selection")
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const handleTopicSelect = useCallback(async (topic: string) => {
    console.log("[v0] Topic selected:", topic)
    setSelectedTopic(topic)
    setCurrentScreen("loading")
    setError(null)

    try {
      // Use mobile-optimized service when running on mobile
      const isMobile = Capacitor.isNativePlatform()
      const generatedQuestions = isMobile 
        ? await generateQuizQuestionsMobile(topic)
        : await generateQuizQuestions(topic)
      setQuestions(generatedQuestions)
      setAnswers(new Array(generatedQuestions.length).fill(undefined))
      setCurrentScreen("quiz")
      console.log("[v0] Quiz ready with", generatedQuestions.length, "questions")
    } catch (error) {
      console.error("[v0] Failed to generate questions:", error)
      setError(error instanceof Error ? error.message : "Failed to generate questions")
      setCurrentScreen("topic-selection")
    }
  }, [])

  const handleAnswerSelect = useCallback(
    (questionIndex: number, answerIndex: number) => {
      console.log("[v0] Answer selected:", questionIndex, answerIndex)
      const newAnswers = [...answers]
      newAnswers[questionIndex] = answerIndex
      setAnswers(newAnswers)
    },
    [answers],
  )

  const handleNavigate = useCallback(
    (direction: "prev" | "next") => {
      if (direction === "prev" && currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
      } else if (direction === "next" && currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    },
    [currentQuestionIndex, questions.length],
  )

  const handleQuizComplete = useCallback(async () => {
    console.log("[v0] Quiz completed, calculating results")
    // Calculate score
    const finalScore = questions.reduce((acc, question, index) => {
      return acc + (answers[index] === question.correctAnswer ? 1 : 0)
    }, 0)

    setScore(finalScore)
    setCurrentScreen("loading")

    try {
      // Use mobile-optimized service when running on mobile
      const isMobile = Capacitor.isNativePlatform()
      const generatedFeedback = isMobile 
        ? await generateFeedbackMobile(selectedTopic, finalScore, questions.length)
        : await generateFeedback(selectedTopic, finalScore, questions.length)
      setFeedback(generatedFeedback)
      setCurrentScreen("results")
      console.log("[v0] Results ready with personalized feedback")
    } catch (error) {
      console.error("[v0] Failed to generate feedback:", error)
      // Use fallback feedback
      const percentage = Math.round((finalScore / questions.length) * 100)
      setFeedback(
        `Great job completing the ${selectedTopic} quiz! You scored ${finalScore} out of ${questions.length} (${percentage}%). Keep learning and exploring new topics!`,
      )
      setCurrentScreen("results")
    }
  }, [questions, answers, selectedTopic])

  const handleRestart = useCallback(() => {
    console.log("[v0] Restarting quiz")
    setCurrentScreen("topic-selection")
    setSelectedTopic("")
    setQuestions([])
    setCurrentQuestionIndex(0)
    setAnswers([])
    setScore(0)
    setFeedback("")
    setError(null)
  }, [])

  const renderScreen = () => {
    switch (currentScreen) {
      case "topic-selection":
        return <TopicSelection onTopicSelect={handleTopicSelect} error={error} />

      case "loading":
        return <LoadingScreen topic={selectedTopic} />

      case "quiz":
        return (
          <QuizInterface
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            onAnswerSelect={handleAnswerSelect}
            onNavigate={handleNavigate}
            onComplete={handleQuizComplete}
          />
        )

      case "results":
        return (
          <ResultsScreen
            topic={selectedTopic}
            questions={questions}
            answers={answers}
            score={score}
            feedback={feedback}
            onRestart={handleRestart}
          />
        )

      default:
        return <TopicSelection onTopicSelect={handleTopicSelect} error={error} />
    }
  }

  return <ErrorBoundary>{renderScreen()}</ErrorBoundary>
}
