import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"

export default function DashboardHeader() {
  return (
    // Header
    <header className="bg-[#B80D2D] text-white shadow-lg">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/assets/header images/nexus_white_no_bg.png" width={100} height={100} alt="Nexus Built Logo" />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>John</span>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-[#B80D2D] bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header >
  )
} 