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
import { getCookie } from "@/lib/utils/cookies"
import { parseCookies } from 'nookies'
import { useEffect, useState } from "react"

export default function DashboardHeader() {
  const router = useRouter()
  const [userName, setVendorName] = useState("");
  const [email, setVendorEmail] = useState("");

  function deleteCookie(name) {
    try {
      const { destroyCookie } = require('nookies');
      destroyCookie(null, name, { path: '/' });
    } catch { }
  }

  const handleLogout = () => {
    deleteCookie("accessToken")
    deleteCookie("refreshToken")
    deleteCookie("userName")
    deleteCookie("status")
    sessionStorage.clear();
    router.push("/signin")
  }

  useEffect(() => {
    // setVendorName(sessionStorage.getItem("CusUserName") || "");
    // setVendorEmail(sessionStorage.getItem("CusUserEmail") || "");
    setTimeout(() => {
      const cookies = parseCookies();
      let name = cookies["CusUserName"];
      let email = cookies["CusUserEmail"]
      setVendorName(name || "");
      setVendorEmail(email || "");
    }, 1000);
  }, []);

  return (
    // Header
    <header className="bg-[#B80D2D] text-white shadow-lg">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/assets/header images/nexus_white_no_bg.png" width={100} height={100} alt="Nexus Built Logo" />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col text-right mr-2">
              <span className="font-semibold">{userName}</span>
              <span className="text-xs text-white/80">{email}</span>
            </div>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded bg-white/10 text-white hover:bg-white hover:text-[#B80D2D] transition border border-white/30 shadow-sm"
                  style={{ outline: "none", boxShadow: "none" }}
                  tabIndex={0}
                >
                  <User className="h-5 w-5" />
                  <span></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-3 py-2 hidden text-sm text-gray-700">
                  <div className="font-semibold">{userName}</div>
                  <div className="text-xs text-gray-500">{email}</div>
                </div>
                <DropdownMenuItem
                  onSelect={() => { window.location.href = "/profile"; }}
                  className="cursor-pointer hidden"
                >
                  <User className="w-4 h-4 mr-2 text-[#B80D2D]" />
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