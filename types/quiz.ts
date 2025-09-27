export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface QuizState {
  topic: string
  questions: QuizQuestion[]
  currentQuestionIndex: number
  answers: number[]
  score: number
  isComplete: boolean
  feedback?: string
}

export type QuizScreen = "topic-selection" | "loading" | "quiz" | "results"

export interface Topic {
  id: string
  name: string
  description: string
  icon: string
}
