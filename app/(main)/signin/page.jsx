"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Building2 } from "lucide-react"


export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [active, setActive] = useState("vendor");
  const currentPath = usePathname();

  const checkTheCurrentPath = () => {
    if (currentPath === '/vendor') {
      setActive('vendor')
    } else if (currentPath === '/signin') {
      setActive('client')
    } else {
      redirect('/')
    }
  }

  useEffect(() => {
    checkTheCurrentPath()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard after successful login
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto px-4 max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex w-[300px] h-[60px] rounded-lg bg-white shadow-inner relative ">
            {/* Client Button */}
            <button
              onClick={() => setActive("client")}
              className={`w-1/2 flex items-center shadow-inner justify-center rounded-md font-medium transition-all duration-300
                ${active === "client"
                  ? "bg-[#B93239] text-white scale-[1.05] translate-y-[-3px] rounded-md shadow-md z-10"
                  : "bg-white text-[#B93239]"
                }`}
            >
              <Link href='/signin'>Login as Client</Link>
            </button>

            {/* Vendor Button */}
            <button
              onClick={() => setActive("vendor")}
              className={`w-1/2 flex items-center shadow-inner justify-center rounded-md font-medium transition-all duration-300
              ${active === "vendor"
                  ? "bg-[#B93239] text-white scale-[1.05] translate-y-[-3px] rounded-md shadow-md z-10"
                  : "bg-white text-[#B93239]"
                }`}
            >
              <Link href='/vendor'>Login as Vendor</Link>
            </button>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="rounded border-gray-300" />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#B80D2D] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-[#B80D2D] hover:bg-[#9A0B26]" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <Separator />

            <div className="text-center text-sm">
              {"Don't have an account? "}
              <Link href="/signup" className="text-[#B80D2D] hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/home" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
