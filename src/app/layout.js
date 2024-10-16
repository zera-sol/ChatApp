import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import SessionProviderWrapper from './SessionProviderWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default:"Next.js 14 Home page",
    template:"%s | Next.js 14"
  }, 
  description:"Next.js starter app description"
}

export default function RootLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className={inter.className}>
          <div className='container'>
              <Navbar />
              {children}
              <Footer />
          </div>
        </body>
      </html>
    </SessionProviderWrapper>
  )
}