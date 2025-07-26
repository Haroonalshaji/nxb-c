"use client"
import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { User, ChevronDown } from "lucide-react";


export default function Header() {
    return (
        <header className="bg-[#B80D2D] text-white shadow-lg">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href='/' className="flex items-center space-x-2">
                        <Image src="/assets/header images/nexus_white_no_bg.png" width={100} height={100} />
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="hover:text-gray-200 transition-colors font-medium">
                            Home
                        </Link>
                        <Link href="/about" className="hover:text-gray-200 transition-colors font-medium">
                            About
                        </Link>
                        <Link href="/services" className="hover:text-gray-200 transition-colors font-medium">
                            Services
                        </Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-3">
                        {/* User Role Dropdown with custom UI */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-white/10 text-white hover:bg-white hover:text-[#B80D2D] transition border border-white/30 shadow-sm"
                                    style={{ outline: "none", boxShadow: "none" }}
                                    tabIndex={0}
                                >
                                    <User className="w-4 h-4" />
                                    <span>Select Role</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onSelect={() => { window.location.href = "/signin"; }}
                                    className="cursor-pointer"
                                >
                                    <User className="w-4 h-4 mr-2 text-[#B80D2D]" /> Client
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={() => { window.location.href = "/vendor"; }}
                                    className="cursor-pointer"
                                >
                                    <User className="w-4 h-4 mr-2 text-gray-500" /> Vendor
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* <Link href="/signup">
                            <Button className="bg-white text-[#B80D2D] hover:bg-gray-100">Sign Up</Button>
                        </Link> */}
                    </div>
                </div>
            </div>
        </header>
    )
}