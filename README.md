# AI-Powered Quiz App - Cross-Platform Mobile & Web Application

## 📹 Demo Videos

### Web Application Demo

[![Web App Demo](https://img.youtube.com/vi/HiaSE-MPHlk/0.jpg)](https://youtu.be/HiaSE-MPHlk)

### iOS Application Demo

[![iOS App Demo](https://img.youtube.com/vi/3ZQYkmFywP0/0.jpg)](https://www.youtube.com/watch?v=3ZQYkmFywP0)

### Android Application Demo

[![Android App Demo](https://img.youtube.com/vi/gPZxLKUpxX4/0.jpg)](https://youtu.be/gPZxLKUpxX4)

A comprehensive quiz application that generates personalized questions using AI and provides intelligent feedback. Built with Next.js, Capacitor, and Google Gemini AI, supporting both web and native mobile platforms (iOS & Android).

## 🚀 Quick Start

### Web Application

```bash
npm install
npm run dev
```

Launch at `http://localhost:3000`

### Mobile Development

```bash
# iOS
npm run build:ios

# Android
npm run build:android

# Development with live reload
npm run live:ios    # iOS
npm run live:android # Android
```

## 📱 Features

- **Cross-Platform**: Web, iOS, and Android support
- **AI-Powered**: Google Gemini integration for question generation and feedback
- **Mobile-First**: Optimized for touch interactions and mobile devices
- **Offline Capable**: Works without server dependencies on mobile
- **Responsive Design**: Seamless experience across all device sizes

## 🎯 How It Works

1. **Topic Selection**: Choose from 6 curated topics (Wellness, Tech Trends, History, Science, Arts & Culture, Sports)
2. **Question Generation**: AI generates 5 multiple-choice questions with loading states
3. **Interactive Quiz**: Navigate through questions with progress tracking and answer selection
4. **Results & Feedback**: AI analyzes performance and provides personalized feedback

## 🤖 AI Feedback Generation Prompt

The app uses the following prompt to generate personalized feedback for users:

```
Generate personalized feedback for a quiz about ${topic}.
The user scored ${score} out of ${totalQuestions} questions (${percentage}%).

Provide encouraging and constructive feedback that:
- Acknowledges their performance level appropriately.
- Offers specific insights about their knowledge in ${topic}.
- Suggests areas for improvement if score is below 80%.
- Celebrates strong performance if score is 80% or above.
- Remains positive and motivating.
- Is concise (2-3 sentences for 'feedback' and 'encouragement' fields).
- Include 1-3 specific 'suggestions' for further learning.
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Mobile**: Capacitor for native iOS/Android apps
- **AI**: Google Gemini 2.5 Flash

## 🏗️ Architecture & State Management

### Project Structure

```
app/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Main app component with state management
│   ├── layout.tsx              # Root layout with fonts and styling
│   ├── globals.css             # Global styles and design tokens
│   └── api/                    # API routes (web only)
│       ├── generate-questions/ # AI question generation endpoint
│       └── generate-feedback/  # AI feedback generation endpoint
├── components/                  # React components
│   ├── topic-selection.tsx     # Topic selection screen
│   ├── loading-screen.tsx      # Loading states with animations
│   ├── quiz-interface.tsx      # Main quiz navigation and display
│   ├── results-screen.tsx      # Results and feedback display
│   ├── mobile-layout.tsx       # Mobile-specific layout wrapper
│   ├── error-boundary.tsx      # Error handling component
│   └── ui/                     # Reusable UI components (shadcn/ui)
├── lib/                        # Utility libraries
│   ├── ai-service.ts           # Web AI service (uses API routes)
│   ├── mobile-ai-service.ts    # Mobile AI service (direct API calls)
│   └── utils.ts                # Utility functions
├── types/                      # TypeScript definitions
│   └── quiz.ts                 # Quiz interfaces and types
├── ios/                        # iOS native project (Capacitor)
├── android/                    # Android native project (Capacitor)
└── public/                     # Static assets
```

### State Management Strategy

**React useState + Props Pattern:**

- **Main State**: Centralized in `app/page.tsx` using `useState`
- **Screen Navigation**: Simple enum-based screen state (`QuizScreen` type)
- **Quiz Data**: Immutable state updates for questions and answers
- **Error Handling**: Separate error states for different failure modes

**Why This Approach:**

- **Simplicity**: No external state management needed for this scope
- **Performance**: Minimal re-renders with proper state structure
- **Maintainability**: Clear data flow and easy to debug
- **Scalability**: Easy to migrate to Context API or Redux if needed
- **Mobile Compatibility**: Works seamlessly with static export

### Component Architecture

**Reusable Components:**

- `QuizInterface`: Handles question display, navigation, and progress
- `LoadingScreen`: Animated loading states with topic-specific messaging
- `TopicSelection`: Grid-based topic selection with hover effects
- `ResultsScreen`: Score display and AI-generated feedback
- `ErrorBoundary`: Graceful error handling with user-friendly messages

**Design Patterns:**

- **Composition**: Components receive data via props, maintain single responsibility
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Platform Detection**: Automatic switching between web and mobile AI services

### Mobile Architecture

**Capacitor Integration:**

- **Static Export**: Next.js configured for static export (`output: 'export'`)
- **Native Wrapper**: Capacitor provides native iOS/Android wrappers
- **Direct API Calls**: Mobile service bypasses Next.js API routes
- **Offline Capability**: Works without server dependencies

**Platform-Specific Optimizations:**

- **Safe Area Handling**: Support for devices with notches and rounded corners
- **Touch Optimizations**: 44px minimum touch targets, 16px input font size
- **Native Plugins**: Splash screen, status bar, keyboard, and haptic feedback
- **Performance**: Optimized bundle size and lazy loading

## 🚀 Deployment

### Web Deployment

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative with static export support
- **GitHub Pages**: Free hosting for static exports

### Mobile Deployment

- **iOS App Store**: Archive in Xcode → Upload to App Store Connect
- **Google Play Store**: Generate signed APK/AAB → Upload to Google Play Console

## 🔧 Environment Setup

```bash
# Required environment variables
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_APP_URL=https://your-app-domain.com
```

## 📚 Documentation

- **Mobile Setup Guide**: `MOBILE_SETUP.md`
- **Mobile README**: `README_MOBILE.md`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using Next.js, Capacitor, and Google Gemini AI**
