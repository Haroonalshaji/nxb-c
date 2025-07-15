import AOSInit from '@/components/AOSInit'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'

export const metadata = {
  title: 'Nexus Built',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function MainLayout({ children }) {
  return (
    <>
      <AOSInit />
      <Toaster />
      <Header />
      {children}
      <Footer />
    </>
  )
} 