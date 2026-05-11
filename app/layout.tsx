import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0B5D3B',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Ferpa Chopp | Distribuidora Oficial Ecobier no RS',
  description: 'Distribuidora de chopp, bebidas e equipamentos completos para eventos. Representante oficial Ecobier no Rio Grande do Sul.',
  keywords: ['chopp', 'bebidas', 'distribuidora', 'ecobier', 'rio grande do sul', 'aluguel choppeira', 'eventos'],
  authors: [{ name: 'Ferpa Chopp' }],
  openGraph: {
    title: 'Ferpa Chopp | Distribuidora Oficial Ecobier',
    description: 'Chopp, bebidas e equipamentos completos para eventos.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
