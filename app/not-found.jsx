import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Building2 } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B80D2D]/5 to-[#9A0B26]/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
         
          <h1 className="text-8xl font-bold text-[#B80D2D] mt-12">404</h1>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900">Page Not Found</h2>
          <p className="text-gray-600">
            Oops! It seems like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="mt-4">
          <Link href="/">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] text-white hover:from-[#9A0B26] hover:to-[#B80D2D] transition-all duration-300"
            >
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}