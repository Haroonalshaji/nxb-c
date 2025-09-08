import './globals.css'
import React from 'react'
import AOSInit from '@/components/AOSInit'


export const metadata = {
  title: 'NXB | Nexus Built',
  description: 'Nexus Built',
  generator: 'v0.dev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AOSInit/>
      <body>{children}</body>
    </html>
  )
} 