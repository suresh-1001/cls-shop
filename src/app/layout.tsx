import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CLS Shop — Clear Line Signs',
  description: 'Estimating & job management for Clear Line Signs',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  )
}
