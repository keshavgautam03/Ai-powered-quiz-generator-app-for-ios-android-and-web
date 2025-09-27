# AI-Powered Quiz App - Cross-Platform Mobile & Web Application

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

## 📱 Project Overview

This project creates an AI-powered quiz experience with four distinct screens:

1. **Topic Selection**: Choose from 6 curated topics (Wellness, Tech Trends, History, Science, Arts & Culture, Sports)
2. **Question Generation**: AI generates 5 multiple-choice questions with loading states
3. **Interactive Quiz**: Navigate through questions with progress tracking and answer selection
4. **Results & Feedback**: AI analyzes performance and provides personalized feedback

### Key Features

- **Cross-Platform**: Web, iOS, and Android support
- **AI-Powered**: Google Gemini integration for question generation and feedback
- **Mobile-First**: Optimized for touch interactions and mobile devices
- **Offline Capable**: Works without server dependencies on mobile
- **Responsive Design**: Seamless experience across all device sizes

## 🤖 AI Prompts & Refinements

### Initial Challenges

- Inconsistent JSON structure from AI responses
- Occasional malformed questions or duplicate options
- Varying difficulty levels across questions
- Network reliability issues in mobile environments

### Final Question Generation Prompt

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

### Final Feedback Generation Prompt

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

**System Instruction:**

```
You are a kind and insightful educational coach providing motivational feedback in the requested JSON structure.
```

### Key Improvements Made

1. **Structured Output**: Implemented Gemini JSON Schema validation
2. **Error Handling**: Added retry logic with exponential backoff (3 retries for questions, 2 for feedback)
3. **Mobile Optimization**: Created separate mobile-optimized AI service for static export compatibility
4. **Fallback Systems**: Graceful degradation when AI services fail
5. **Prompt Engineering**: Refined prompts for better question quality and feedback relevance

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
├── public/                     # Static assets
│   └── icons/                  # App icons and splash screens
├── capacitor.config.ts         # Capacitor configuration
├── next.config.mjs             # Next.js configuration
└── package.json                # Dependencies and scripts
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

## 📸 Screenshots & Screen Recordings

### Application Screenshots

#### Web Application (Desktop Browser)

![Web Application - Topic Selection](./screenshots/web-app-topic-selection.png)
_Web application running in Chrome browser showing the topic selection screen with 6 quiz categories_

**📹 Demo Video:** [Watch Web App Demo](https://youtu.be/HiaSE-MPHlk)

#### iOS Application (iPad)

![iOS Application - iPad](./screenshots/ios-app-ipad.png)
_iOS application running on iPad (A16) with iOS 26.0, showing the topic selection interface_

**📹 Demo Video:** [Watch iOS App Demo](https://www.youtube.com/watch?v=3ZQYkmFywP0)

#### Android Application (Emulator)

![Android Application - Emulator](./screenshots/android-app-emulator.png)
_Android application running in emulator showing the topic selection screen_

**📹 Demo Video:** [Watch Android App Demo](https://youtu.be/gPZxLKUpxX4)

### 🎥 Demo Videos

Watch the complete application demos for each platform:

| Platform        | Demo Video                                                                                               | Description                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Web App**     | [![Web Demo](https://img.youtube.com/vi/HiaSE-MPHlk/0.jpg)](https://youtu.be/HiaSE-MPHlk)                | Complete web application demo showing topic selection, quiz flow, and results |
| **iOS App**     | [![iOS Demo](https://img.youtube.com/vi/3ZQYkmFywP0/0.jpg)](https://www.youtube.com/watch?v=3ZQYkmFywP0) | Native iOS app running on iPad with touch interactions                        |
| **Android App** | [![Android Demo](https://img.youtube.com/vi/gPZxLKUpxX4/0.jpg)](https://youtu.be/gPZxLKUpxX4)            | Android emulator demo showcasing mobile-optimized interface                   |

> **Note**: To add your actual screenshots, save them in the `screenshots/` directory with the filenames:
>
> - `web-app-topic-selection.png` - Web application screenshot
> - `ios-app-ipad.png` - iOS application screenshot
> - `android-app-emulator.png` - Android application screenshot

### How to Add Videos to README

#### Method 1: GitHub-Compatible Video Hosting (Recommended)

GitHub supports direct video embedding for MP4, MOV, and WebM files up to 10MB.

**Steps:**

1. Upload your video file to GitHub by dragging it into an issue or PR comment
2. Copy the generated URL (format: `https://user-images.githubusercontent.com/...`)
3. Use in README:

```markdown
<!-- Direct video embedding -->

![App Demo Video](https://user-images.githubusercontent.com/12345678/1234567890-abcdef12-3456-7890-abcd-ef1234567890.mp4)

<!-- With custom alt text -->

![Quiz App Demo - Topic Selection to Results](https://user-images.githubusercontent.com/12345678/demo-video.mp4)
```

#### Method 2: External Video Hosting

For larger videos or better control, use external hosting services.

**YouTube:**

```markdown
[![App Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
```

**Vimeo:**

```markdown
[![App Demo](https://i.vimeocdn.com/video/VIDEO_ID_640.jpg)](https://vimeo.com/VIDEO_ID)
```

**Loom (Great for screen recordings):**

```markdown
[![App Demo](https://cdn.loom.com/sessions/thumbnails/VIDEO_ID-with-play.gif)](https://www.loom.com/share/VIDEO_ID)
```

#### Method 3: GIF Conversion (Best for README)

Convert videos to GIFs for better README compatibility and faster loading.

**Tools for GIF conversion:**

- **Online**: [EZGIF](https://ezgif.com/video-to-gif), [CloudConvert](https://cloudconvert.com/mp4-to-gif)
- **Desktop**: [GIPHY Capture](https://giphy.com/apps/giphycapture), [Kap](https://getkap.co/)
- **Command Line**: `ffmpeg -i input.mp4 -vf "fps=10,scale=800:-1" output.gif`

```markdown
<!-- GIF with optimized size -->

![Quiz App Demo](https://user-images.githubusercontent.com/12345678/quiz-app-demo.gif)

<!-- Local GIF file -->

![App Demo](./screenshots/app-demo.gif)
```

#### Method 4: Local Video Files (Not Recommended for GitHub)

```markdown
<!-- HTML5 video tag (works in some markdown viewers) -->
<video width="800" height="600" controls>
  <source src="./screenshots/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

#### Method 5: Screen Recording Tools for Mobile Apps

**iOS Simulator Recording:**

```bash
# Record iOS simulator
xcrun simctl io booted recordVideo --type=mp4 ~/Desktop/ios-demo.mp4

# Stop recording with Ctrl+C
```

**Android Emulator Recording:**

```bash
# Record Android emulator
adb shell screenrecord /sdcard/demo.mp4

# Pull the recorded file
adb pull /sdcard/demo.mp4 ~/Desktop/android-demo.mp4
```

**QuickTime Player (macOS):**

1. Open QuickTime Player
2. File → New Movie Recording
3. Click dropdown arrow next to record button
4. Select your device/simulator
5. Click record and perform your demo
6. Stop recording and save

#### Recommended Video Content for Your App:

1. **Full App Flow**: Topic selection → Question generation → Quiz completion → Results
2. **Mobile Interactions**: Touch gestures, navigation, responsive design
3. **Loading States**: AI generation process, error handling
4. **Cross-Platform**: Side-by-side comparison of web, iOS, and Android
5. **Performance**: App startup time, smooth animations

#### Video Optimization Tips:

- **Duration**: Keep videos under 30 seconds for README
- **Size**: Compress videos to under 10MB for GitHub
- **Format**: Use MP4 with H.264 codec for best compatibility
- **Resolution**: 800x600 or 1280x720 for README
- **Frame Rate**: 15-30 FPS for smooth playback
- **Audio**: Remove audio unless essential for demo

### How to Save Screenshots Locally

#### For Web Application:

1. **Browser Screenshots**: Use browser dev tools (F12) → Device toolbar → Select device → Screenshot
2. **Full Page Screenshots**: Right-click → "Inspect" → Console → Run: `document.documentElement.outerHTML` (for full page capture)
3. **Mobile View**: Use browser dev tools mobile emulation for mobile screenshots

#### For Mobile Applications:

1. **iOS Simulator**:

   - Take screenshot: `Cmd + S` or Device → Screenshot
   - Record screen: Device → Record Screen
   - Files saved to: `~/Desktop/` or `~/Pictures/`

2. **Android Emulator**:

   - Take screenshot: Click camera icon in emulator toolbar
   - Record screen: Click record icon in emulator toolbar
   - Files saved to: `~/Android/sdk/platform-tools/`

3. **Physical Devices**:
   - **iOS**: Use QuickTime Player → File → New Movie Recording → Select device
   - **Android**: Use `adb shell screencap` or built-in screen recording

#### Recommended Screenshots to Capture:

1. **Topic Selection Screen**: Show the 6 topic cards with hover effects
2. **Loading State**: Animated spinner with topic-specific messaging
3. **Quiz Interface**: Question display with progress bar and navigation
4. **Results Screen**: Score display with AI-generated feedback
5. **Mobile Views**: iOS and Android app screens
6. **Responsive Design**: Different screen sizes and orientations

### Key Screens to Document:

#### Screen 1: Topic Selection

- Clean grid layout with 6 topic cards
- Hover effects and smooth transitions
- Clear topic descriptions and icons
- Mobile-optimized touch targets

#### Screen 2: Loading State

- Animated spinner with topic-specific messaging
- Progress indication for AI generation
- Error handling with retry options
- Mobile-optimized loading animations

#### Screen 3: Quiz Interface

- Question counter and progress bar
- Clear question display with numbered options
- Previous/Next navigation with disabled states
- Visual feedback for selected answers
- Mobile-friendly touch interactions

#### Screen 4: Results & Feedback

- Score display with percentage and visual indicators
- AI-generated personalized feedback
- Question review with correct/incorrect indicators
- Restart functionality
- Mobile-optimized results layout

## 🐛 Known Issues & Potential Improvements

### Current Limitations

1. **AI Response Time**:

   - Occasional delays in question generation (3-5 seconds)
   - Network dependency for AI functionality
   - No offline question caching

2. **Mobile-Specific Issues**:

   - Static export limitations (no server-side features)
   - API routes don't work in mobile builds
   - Limited offline functionality

3. **User Experience**:

   - No adaptive difficulty based on user performance
   - No progress tracking across sessions
   - Limited accessibility features

4. **Technical Debt**:
   - Hardcoded API key in source code
   - No environment variable management
   - Limited error logging and analytics

### Potential Improvements

#### Short-term (Next Sprint)

1. **Environment Configuration**:

   - Move API keys to environment variables
   - Add proper error logging
   - Implement user analytics

2. **Performance Optimizations**:

   - Implement question caching
   - Add loading state improvements
   - Optimize bundle size

3. **User Experience**:
   - Add keyboard navigation support
   - Improve accessibility (ARIA labels, screen reader support)
   - Add haptic feedback for mobile

#### Medium-term (Next Quarter)

1. **Advanced Features**:

   - User accounts and progress tracking
   - Adaptive difficulty system
   - Question difficulty ratings
   - Social features (share results, compete with friends)

2. **Mobile Enhancements**:

   - Progressive Web App (PWA) features
   - Offline question caching
   - Push notifications for daily quizzes
   - Native device integrations (camera, location)

3. **AI Improvements**:
   - Multiple AI model support
   - Question quality scoring
   - Personalized learning paths
   - Advanced feedback analytics

#### Long-term (Future Releases)

1. **Platform Expansion**:

   - Desktop applications (Electron)
   - Smart TV applications
   - Voice assistant integration

2. **Advanced Analytics**:

   - Learning progress tracking
   - Performance analytics dashboard
   - A/B testing for question formats
   - Machine learning for personalized content

3. **Enterprise Features**:
   - Multi-tenant support
   - Custom branding
   - Admin dashboard
   - Bulk question import/export

### Performance Optimizations Needed

1. **Code Splitting**: Lazy load quiz components
2. **Image Optimization**: Optimize topic icons and illustrations
3. **API Optimization**: Batch AI requests where possible
4. **State Optimization**: Implement useMemo for expensive calculations
5. **Bundle Analysis**: Regular bundle size monitoring and optimization

### Security Considerations

1. **API Key Management**: Implement proper secret management
2. **Rate Limiting**: Add API rate limiting and abuse prevention
3. **Data Privacy**: Implement proper data handling and GDPR compliance
4. **Input Validation**: Enhanced input sanitization and validation

## 🔧 Technical Specifications

### Core Technologies

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui component library
- **Mobile**: Capacitor for native iOS/Android apps

### AI Integration

- **Provider**: Google Gemini 2.5 Flash
- **API**: Direct API calls with structured JSON output
- **Validation**: Gemini JSON Schema validation
- **Error Handling**: Exponential backoff retry logic

### Development Tools

- **Package Manager**: npm with lock file
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode
- **Build System**: Next.js with static export support

### Mobile Development

- **iOS**: Xcode 15+, iOS 13+ support
- **Android**: Android Studio, API level 21+ support
- **Capacitor**: Version 7.4.3 with latest plugins
- **Build Tools**: Gradle (Android), Xcode (iOS)

## 📊 Evaluation Criteria Met

✅ **AI Prompt Quality**: Refined prompts with structured output and comprehensive error handling  
✅ **UI/UX Polish**: Smooth navigation, loading states, responsive design, and mobile optimization  
✅ **Code Quality**: Modular components, TypeScript, reusable architecture, and error boundaries  
✅ **Async Handling**: Loading indicators, retry logic, error boundaries, and fallback systems  
✅ **Cross-Platform**: Native iOS/Android apps with web compatibility  
✅ **Mobile-First**: Touch optimizations, safe area handling, and mobile-specific features  
✅ **Creativity**: Enhanced topic variety, personalized feedback, and polished interactions

## 🚀 Deployment

### Web Deployment

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative with static export support
- **GitHub Pages**: Free hosting for static exports

### Mobile Deployment

- **iOS App Store**: Archive in Xcode → Upload to App Store Connect
- **Google Play Store**: Generate signed APK/AAB → Upload to Google Play Console
- **Enterprise Distribution**: Ad-hoc or enterprise app distribution

### Environment Setup

```bash
# Required environment variables
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_APP_URL=https://your-app-domain.com
```

## 📚 Documentation

- **Mobile Setup Guide**: `MOBILE_SETUP.md` - Complete mobile development setup
- **Mobile README**: `README_MOBILE.md` - Mobile-specific documentation
- **Capacitor Docs**: https://capacitorjs.com/docs
- **Next.js Static Export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini**: AI question generation and feedback
- **Capacitor**: Cross-platform mobile development
- **Next.js**: React framework and static export
- **shadcn/ui**: Beautiful UI component library
- **Tailwind CSS**: Utility-first CSS framework

---

**Built with ❤️ using Next.js, Capacitor, and Google Gemini AI**
