import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://royalflush.example.com'),
  title: {
    default: 'Elite Royal Flush | Luxury Portable Restrooms for Events',
    template: '%s | Elite Royal Flush',
  },
  description:
    'Elite Royal Flush provides premium portable restroom solutions for weddings, private parties, corporate events, festivals, and job sites. Delivered, set up, and cleaned to a luxury standard. Reserve with a deposit today.',
  keywords: [
    'luxury portable restrooms',
    'restroom trailer rental',
    'wedding restroom rental',
    'event restrooms',
    'portable bathroom rental',
    'VIP restroom trailer',
  ],
  authors: [{ name: 'Elite Royal Flush' }],
  openGraph: {
    title: 'Elite Royal Flush | Luxury Portable Restrooms for Events',
    description:
      'Premium portable restroom solutions for events, businesses, and special occasions. Luxury restrooms, wherever you celebrate.',
    type: 'website',
    siteName: 'Elite Royal Flush',
    images: [{ url: '/images/hero-luxury-restroom.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Royal Flush | Luxury Portable Restrooms',
    description:
      'Premium portable restroom solutions for events, businesses, and special occasions.',
    images: ['/images/hero-luxury-restroom.png'],
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
