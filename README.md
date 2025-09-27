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

## 2. Problem Understanding

### Core Challenge

Create a cross-platform quiz application that generates personalized questions using AI and provides intelligent feedback across web, iOS, and Android platforms.

### Key Requirements

- **AI Integration**: Generate 5 multiple-choice questions per topic using Google Gemini
- **Cross-Platform**: Single codebase for web and mobile (iOS/Android)
- **User Experience**: Smooth navigation, loading states, and responsive design
- **Feedback System**: AI-powered personalized feedback based on quiz performance
- **Mobile Optimization**: Touch-friendly interface with native app capabilities

### Assumptions Made

- Users have internet connectivity for AI question generation
- Google Gemini API will provide consistent, structured responses
- Mobile users prefer touch-optimized interfaces over complex navigation
- Static export approach is sufficient for mobile app functionality
- 5 questions per quiz provides optimal user engagement without fatigue

## 3. AI Prompts & Iterations

### Initial Challenges

- **Inconsistent JSON Structure**: AI responses varied in format and completeness
- **Malformed Questions**: Occasional duplicate options or missing correct answers
- **Difficulty Inconsistency**: Questions ranged from too easy to overly complex
- **Network Reliability**: Mobile environments had intermittent API failures

### Question Generation Prompt Evolution

**Initial Prompt:**

```
Generate 5 quiz questions about ${topic}
```

**Issues Faced:**

- No structure specification led to inconsistent formats
- Missing validation for correct answer indices
- No difficulty level guidance

**Refined Prompt:**

```
Generate 5 multiple choice questions about ${topic}.
Each question must be clear, educational, have exactly 4 options (index 0 to 3), and include a brief explanation.
Ensure questions are diverse, moderately challenging, and test different knowledge areas within the topic.
The correct answer index must be an integer between 0 and 3.
```

**System Instruction:**

```
You are an expert quiz question generator. Your only task is to generate five multiple-choice questions in the requested JSON structure.
```

### Feedback Generation Prompt Evolution

**Initial Approach:**

```
Give feedback for ${score}/${totalQuestions} correct answers.
```

**Issues Faced:**

- Too generic and not personalized
- No topic-specific insights
- Inconsistent tone and length

**Final Refined Prompt:**

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

### Key Improvements Made

1. **Structured Output**: Implemented Gemini JSON Schema validation
2. **Error Handling**: Added retry logic with exponential backoff (3 retries for questions, 2 for feedback)
3. **Mobile Optimization**: Created separate mobile-optimized AI service for static export compatibility
4. **Fallback Systems**: Graceful degradation when AI services fail
5. **Prompt Engineering**: Refined prompts for better question quality and feedback relevance

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

## 6. Known Issues / Improvements

### Current Limitations

1. **AI Response Time**

   - Occasional delays in question generation (3-5 seconds)
   - Network dependency for AI functionality
   - No offline question caching

2. **Mobile-Specific Issues**

   - Static export limitations (no server-side features)
   - API routes don't work in mobile builds
   - Limited offline functionality

3. **User Experience**

   - No adaptive difficulty based on user performance
   - No progress tracking across sessions
   - Limited accessibility features

4. **Technical Debt**
   - Hardcoded API key in source code (needs environment variables)
   - No environment variable management
   - Limited error logging and analytics

### Potential Improvements

#### Short-term (Next Sprint)

1. **Environment Configuration**

   - Move API keys to environment variables
   - Add proper error logging
   - Implement user analytics

2. **Performance Optimizations**

   - Implement question caching
   - Add loading state improvements
   - Optimize bundle size

3. **User Experience**
   - Add keyboard navigation support
   - Improve accessibility (ARIA labels, screen reader support)
   - Add haptic feedback for mobile

#### Medium-term (Next Quarter)

1. **Advanced Features**

   - User accounts and progress tracking
   - Adaptive difficulty system
   - Question difficulty ratings
   - Social features (share results, compete with friends)

2. **Mobile Enhancements**

   - Progressive Web App (PWA) features
   - Offline question caching
   - Push notifications for daily quizzes
   - Native device integrations (camera, location)

3. **AI Improvements**
   - Multiple AI model support
   - Question quality scoring
   - Personalized learning paths
   - Advanced feedback analytics

#### Long-term (Future Releases)

1. **Platform Expansion**

   - Desktop applications (Electron)
   - Smart TV applications
   - Voice assistant integration

2. **Advanced Analytics**

   - Learning progress tracking
   - Performance analytics dashboard
   - A/B testing for question formats
   - Machine learning for personalized content

3. **Enterprise Features**
   - Multi-tenant support
   - Custom branding
   - Admin dashboard
   - Bulk question import/export

## 7. Bonus Work

### Extra Polish & Features Added

1. **Smooth Animations**

   - Loading spinners with topic-specific messaging
   - Smooth transitions between quiz screens
   - Progress bar animations
   - Hover effects on topic selection cards

2. **Enhanced UI/UX**

   - Mobile-first responsive design
   - Touch-optimized interface (44px minimum touch targets)
   - Safe area handling for devices with notches
   - Consistent design system using shadcn/ui components

3. **Error Handling & Resilience**

   - Comprehensive error boundaries
   - Retry logic with exponential backoff
   - Graceful fallbacks when AI services fail
   - User-friendly error messages

4. **Cross-Platform Optimization**

   - Separate AI services for web and mobile
   - Platform detection and automatic service switching
   - Native mobile app capabilities (splash screen, status bar)
   - Static export optimization for mobile builds

5. **Developer Experience**

   - TypeScript for type safety
   - Modular component architecture
   - Comprehensive documentation
   - Mobile development setup guides

6. **Performance Optimizations**

   - Lazy loading of components
   - Optimized bundle size
   - Efficient state management
   - Mobile-specific performance tuning

7. **Accessibility Features**
   - Semantic HTML structure
   - Keyboard navigation support
   - Screen reader compatibility
   - High contrast support

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
