"use client"

import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'

export function MobileLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initializeMobile = async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          // Configure status bar
          await StatusBar.setStyle({ style: Style.Default })
          await StatusBar.setBackgroundColor({ color: '#ffffff' })
          
          // Hide splash screen after a short delay
          setTimeout(async () => {
            await SplashScreen.hide()
          }, 2000)
        } catch (error) {
          console.log('Mobile initialization error:', error)
        }
      }
    }

    initializeMobile()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Safe area handling for mobile devices */}
      <div className="safe-area-inset">
        {children}
      </div>
    </div>
  )
}
