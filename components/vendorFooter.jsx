import Link from 'next/link'

export default function VendorFooter() {
  return (
    <footer className="bg-gray-100 border-t mt-8">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        <span>&copy; {new Date().getFullYear()} Nexus Built. All rights reserved.</span>
        <Link href="/" className="text-[#B80D2D] hover:underline mt-2 md:mt-0">Back to Main Site</Link>
      </div>
    </footer>
  )
} 