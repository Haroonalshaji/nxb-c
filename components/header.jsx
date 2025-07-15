import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import Image from "next/image"


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
                        <Link href="/signin">
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-[#B80D2D] bg-transparent"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-white text-[#B80D2D] hover:bg-gray-100">Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}