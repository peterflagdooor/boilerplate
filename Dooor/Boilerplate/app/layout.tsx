import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LayoutProvider } from '@/components/layout-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Resizable Layout Boilerplate',
  description: 'A modern Next.js app with collapsible nested sidebars using shadcn/ui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full overflow-hidden`}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  )
}
