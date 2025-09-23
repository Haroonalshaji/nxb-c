import './globals.css'
import React from 'react'
import AOSInit from '@/components/AOSInit'


export const metadata = {
  title: 'NXB | Nexus Built',
  description: 'Nexus Built',
}
// app/layout.js
export const runtime = "edge" // or "nodejs"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AOSInit/>
      <body>{children}</body>
    </html>
  )
} 