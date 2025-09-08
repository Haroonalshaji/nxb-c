"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function DashboardHeader() {
  const router = useRouter()

  function deleteCookie(name) {
    document.cookie = `${name}=; path=/; max-age=0;`
  }

  const handleLogout = () => {
    deleteCookie("accessToken")
    deleteCookie("refreshToken")
    deleteCookie("userName")
    deleteCookie("status")
    router.push("/signin")

  }

  return (
    // Header
    <header className="bg-[#B80D2D] text-white shadow-lg">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/assets/header images/nexus_white_no_bg.png" width={100} height={100} alt="Nexus Built Logo" />
          </Link>
          <div className="flex items-center space-x-4">
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded bg-white/10 text-white hover:bg-white hover:text-[#B80D2D] transition border border-white/30 shadow-sm"
                  style={{ outline: "none", boxShadow: "none" }}
                  tabIndex={0}
                >
                  <User className="h-5 w-5" />
                  <span>John</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-3 py-2 text-sm text-gray-700">
                  <div className="font-semibold">John</div>
                  <div className="text-xs text-gray-500">ID: 123456</div>
                </div>
                <DropdownMenuItem
                  onSelect={() => { window.location.href = "/profile"; }}
                  className="cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2 text-[#B80D2D]" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={handleLogout}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header >
  )
} 