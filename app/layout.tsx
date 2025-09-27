import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { MobileLayout } from '@/components/mobile-layout'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quiz App',
  description: 'Interactive Quiz Application',
  generator: 'Next.js',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Quiz App',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Quiz App" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <MobileLayout>
          {children}
        </MobileLayout>
        <Analytics />
      </body>
    </html>
  )
}
