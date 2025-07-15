import React from "react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <span style={{ color: '#0070f3', textDecoration: 'underline', cursor: 'pointer' }}>Go back home</span>
      </Link>
    </div>
  )
} 