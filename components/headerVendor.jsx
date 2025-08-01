"use client";
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, User, Bell, Settings, LogOut } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function HeaderVendor() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/vendor/dashboard');
  const isRegister = pathname === '/vendor/register';
  const isSignIn = pathname === '/vendor';
  const isApproval = pathname === '/vendor/pending-approval' 

  if (!isSignIn && !isRegister && !isApproval) {
    // Dashboard (logged-in) header
    return (
      <header className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] text-white shadow-xl">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-bold">Nexus Built Vendor</span>
                <p className="text-sm text-white/80">Manage Your Business</p>
              </div>
            </div>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center p-2 border-b">
                    <div className="ml-2">
                      <p className="font-medium">Elite Roofing Co.</p>
                      <p className="text-sm text-muted-foreground">Premium Vendor</p>
                    </div>
                  </div>
                  <Link href="/vendor/profile">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/vendor">
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] text-white shadow-xl">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href='/' className="flex items-center space-x-2">
            <Image src="/assets/header images/nexus_white_no_bg.png" width={100} height={100} alt="Nexus Built Logo" />
          </Link>
          {isRegister ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/80">Already have an account?</span>
              <Link href="/vendor">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-[#B80D2D] bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          ) : isSignIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/80">Customer Portal</span>
              <Link href="/signin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-[#B80D2D] bg-transparent"
                >
                  Customer Login
                </Button>
              </Link>
            </div>
          ) : isApproval ?(
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/80">Need help?</span>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-[#B80D2D] bg-transparent"
                >
                  Contact Support
                </Button>
              </Link>
            </div>
          ):null}
        </div>
      </div>
    </header>
  );
}