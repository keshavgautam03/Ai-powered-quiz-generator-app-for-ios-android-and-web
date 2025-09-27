# Mobile App Setup Guide

This guide provides complete instructions for building and deploying your Next.js Quiz App as native iOS and Android applications using Capacitor.

## Prerequisites

### For iOS Development
- macOS with Xcode 15+ installed
- iOS Simulator or physical iOS device
- Apple Developer Account (for device testing and App Store deployment)

### For Android Development
- Android Studio with Android SDK
- Android Emulator or physical Android device
- Java Development Kit (JDK) 17+

### General Requirements
- Node.js 18+ and npm
- Git

## Installation & Setup

### 1. Install Dependencies

```bash
# Install Capacitor and platform dependencies
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android

# Install additional mobile plugins
npm install @capacitor/splash-screen @capacitor/status-bar @capacitor/keyboard @capacitor/haptics
```

### 2. Initialize Capacitor

```bash
# Initialize Capacitor (already done)
npx cap init "Quiz App" "com.quizapp.mobile" --web-dir=out
```

### 3. Add Platforms

```bash
# Add iOS platform
npx cap add ios

# Add Android platform
npx cap add android
```

### 4. Build and Sync

```bash
# Build the web app and sync to mobile platforms
npm run build:mobile
```

## Configuration Files

### Capacitor Configuration (`capacitor.config.ts`)

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.quizapp.mobile',
  appName: 'Quiz App',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
    StatusBar: {
      style: 'default',
      backgroundColor: '#ffffff',
    },
  },
  ios: {
    scheme: 'Quiz App',
    contentInset: 'automatic',
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
  },
};

export default config;
```

### Next.js Configuration (`next.config.mjs`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable static export for Capacitor
  output: 'export',
  trailingSlash: true,
  // Disable server-side features that don't work with static export
  experimental: {
    esmExternals: false,
  },
  // Optimize for mobile
  poweredByHeader: false,
  compress: true,
  // Handle API routes for mobile (they won't work in static export)
  async rewrites() {
    return []
  },
}

export default nextConfig
```

## Build Scripts

The following npm scripts are available:

```json
{
  "build:mobile": "next build && npx cap sync",
  "build:ios": "npm run build:mobile && npx cap open ios",
  "build:android": "npm run build:mobile && npx cap open android",
  "sync:ios": "npx cap sync ios",
  "sync:android": "npx cap sync android",
  "run:ios": "npm run build:mobile && npx cap run ios",
  "run:android": "npm run build:mobile && npx cap run android",
  "live:ios": "npm run build:mobile && npx cap run ios --livereload --external",
  "live:android": "npm run build:mobile && npx cap run android --livereload --external"
}
```

## iOS Development

### 1. Open in Xcode

```bash
npm run build:ios
```

This will:
- Build the Next.js app
- Sync assets to iOS
- Open the project in Xcode

### 2. Configure iOS Project

In Xcode:
1. Select the project in the navigator
2. Go to "Signing & Capabilities"
3. Set your Team and Bundle Identifier
4. Configure any additional capabilities needed

### 3. Run on Simulator

1. Select a simulator from the device dropdown
2. Click the "Run" button (▶️) or press Cmd+R

### 4. Run on Device

1. Connect your iOS device via USB
2. Trust the computer on your device
3. Select your device from the device dropdown
4. Click "Run"

### 5. Build for Distribution

1. Select "Any iOS Device" as the target
2. Go to Product → Archive
3. Follow the Archive process for App Store or Ad Hoc distribution

## Android Development

### 1. Open in Android Studio

```bash
npm run build:android
```

This will:
- Build the Next.js app
- Sync assets to Android
- Open the project in Android Studio

### 2. Configure Android Project

In Android Studio:
1. Wait for Gradle sync to complete
2. Configure signing if needed (File → Project Structure → Modules → app → Signing)

### 3. Run on Emulator

1. Create an Android Virtual Device (AVD) if needed
2. Start the emulator
3. Click "Run" button (▶️) or press Shift+F10

### 4. Run on Device

1. Enable Developer Options and USB Debugging on your Android device
2. Connect via USB
3. Allow USB debugging when prompted
4. Click "Run"

### 5. Build APK

```bash
# Build debug APK
cd android
./gradlew assembleDebug

# Build release APK (requires signing configuration)
./gradlew assembleRelease
```

## Development Workflow

### Live Reload Development

For faster development with live reload:

```bash
# iOS with live reload
npm run live:ios

# Android with live reload
npm run live:android
```

### Syncing Changes

After making changes to your web app:

```bash
# Rebuild and sync to all platforms
npm run build:mobile

# Or sync to specific platform
npm run sync:ios
npm run sync:android
```

## Mobile-Specific Features

### Safe Area Handling

The app includes safe area handling for devices with notches and rounded corners:

```css
.safe-area-inset {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

### Touch Optimizations

- Touch targets are minimum 44px for accessibility
- Input font size is 16px to prevent zoom on focus
- Smooth scrolling and animations optimized for mobile

### Capacitor Plugins

The app uses these Capacitor plugins:
- `@capacitor/splash-screen` - Custom splash screen
- `@capacitor/status-bar` - Status bar styling
- `@capacitor/keyboard` - Keyboard handling
- `@capacitor/haptics` - Haptic feedback

## Troubleshooting

### Common iOS Issues

1. **Xcode License Not Accepted**
   ```bash
   sudo xcodebuild -license accept
   ```

2. **Pod Install Fails**
   ```bash
   cd ios
   pod install --repo-update
   ```

3. **Build Errors**
   - Clean build folder: Product → Clean Build Folder
   - Delete derived data: Xcode → Preferences → Locations → Derived Data

### Common Android Issues

1. **Gradle Sync Fails**
   - Check Android SDK and build tools versions
   - Update Gradle wrapper if needed

2. **Build Errors**
   ```bash
   cd android
   ./gradlew clean
   ./gradlew build
   ```

3. **Emulator Issues**
   - Create new AVD with different API level
   - Enable hardware acceleration

### General Issues

1. **Assets Not Updating**
   ```bash
   npm run build:mobile
   ```

2. **Plugin Issues**
   ```bash
   npx cap sync
   ```

3. **Network Issues in App**
   - Check CORS settings
   - Verify API endpoints work in browser first

## Deployment

### iOS App Store

1. Build archive in Xcode
2. Upload to App Store Connect
3. Configure app metadata
4. Submit for review

### Google Play Store

1. Generate signed APK/AAB
2. Upload to Google Play Console
3. Configure store listing
4. Submit for review

## File Structure

```
app/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utility libraries
├── public/                 # Static assets
│   └── icons/             # App icons and splash screens
├── ios/                   # iOS native project
├── android/               # Android native project
├── capacitor.config.ts    # Capacitor configuration
├── next.config.mjs        # Next.js configuration
└── package.json           # Dependencies and scripts
```

## Important Notes

### Static Export Limitations

Since we're using static export for Capacitor:
- API routes don't work (handled by mobile-optimized service)
- Server-side rendering is disabled
- Dynamic imports need special handling

### API Integration

The app uses a mobile-optimized AI service that directly calls the Gemini API instead of using Next.js API routes, ensuring compatibility with static export.

### Performance Considerations

- Images are unoptimized for static export
- Bundle size is optimized for mobile
- Lazy loading is handled by Next.js

## Support

For issues specific to:
- **Capacitor**: [Capacitor Documentation](https://capacitorjs.com/docs)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **iOS**: [Apple Developer Documentation](https://developer.apple.com/documentation)
- **Android**: [Android Developer Documentation](https://developer.android.com/docs)
