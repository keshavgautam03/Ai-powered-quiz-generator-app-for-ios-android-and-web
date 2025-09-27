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

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Mobile**: Capacitor for native iOS/Android apps
- **AI**: Google Gemini 2.5 Flash

## 📸 Screenshots

### Web Application

![Web Application - Topic Selection](./screenshots/web-app-topic-selection.png)

### iOS Application

![iOS Application - iPad](./screenshots/ios-app-ipad.png)

### Android Application

![Android Application - Emulator](./screenshots/android-app-emulator.png)

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
