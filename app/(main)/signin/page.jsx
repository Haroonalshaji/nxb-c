"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff } from "lucide-react"
import { signInUser } from '../../../lib/api/auth'
import { toast, useToast } from "@/hooks/use-toast"


export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [active, setActive] = useState("vendor");
  const currentPath = usePathname();
  const { toast } = useToast();

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

  const UserId = email;
  const Password = password;

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await signInUser({ UserId, Password })
      var RetData = response.data;
      const userRoles = {
        accessToken: RetData.result.accessToken,
        refreshToken: RetData.result.refreshToken,
        role: RetData.result.role,
        userName: RetData.result.userName,
        userStatus: RetData.result.status
      }
      // console.log(userRoles)
      if (response) {
        setTimeout(() => {
          setIsLoading(false)
          try {
            const { setCookie } = require('nookies');
            setCookie(null, 'accessToken', userRoles.accessToken, { path: '/', maxAge: 60 * 60 * 24, sameSite: 'strict' })
            setCookie(null, 'refreshToken', userRoles.refreshToken, { path: '/', maxAge: 60 * 60 * 24 * 7, sameSite: 'strict' })
            setCookie(null, 'userName', userRoles.userName, { path: '/', maxAge: 60 * 60 * 24 })
            setCookie(null, 'userStatus', userRoles.userStatus, { path: '/', maxAge: 60 * 60 * 24 })
            setCookie(null, 'role', userRoles.role, { path: '/', maxAge: 60 * 60 * 24 })
          } catch {}

          // Redirect to dashboard after successful login
          router.push("/dashboard")
          if (RetData.isSuccess === true) {
            toast({
              title: `✅  ${RetData.message}`,
              variant: "success",
            })
          } else {
            setIsLoading(false)
            toast({
              title: ` ${RetData.message}`,
              variant: "destructive",
            })
          }
        }, 1000)
      }
    } catch (error) {
      setIsLoading(false)
      // console.error(error)
      toast({
        title: ` ${error.response.data.message}`,
        variant: "destructive",
      })
    }

    // Simulate login process


  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto px-4 max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex w-[300px] h-[60px] rounded-lg bg-white shadow-inner relative ">
            {/* Client Button */}
            <Link href='/signin' className={`w-1/2 flex items-center shadow-inner justify-center rounded-md font-medium transition-all duration-300
                ${active === "client"
                ? "bg-[#B93239] text-white scale-[1.05] translate-y-[-3px] rounded-md shadow-md z-10"
                : "bg-white text-[#B93239]"
              }`}>
              <button
                onClick={() => setActive("client")}
              >
                Login as Client
              </button>
            </Link>
            {/* Vendor Button */}
            <Link href='/vendor' className={`w-1/2 flex items-center shadow-inner justify-center rounded-md font-medium transition-all duration-300
              ${active === "vendor"
                ? "bg-[#B93239] text-white scale-[1.05] translate-y-[-3px] rounded-md shadow-md z-10"
                : "bg-white text-[#B93239]"
              }`}>
              <button
                onClick={() => setActive("vendor")}

              >
                Login as Vendor
              </button>
            </Link>
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
              <div className="space-y-2 relative">
                <Label htmlFor="password" className='relative'>Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="rounded border-gray-300" />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link href="/reset-password" className="text-sm text-[#B80D2D] hover:underline">
                  Reset password?
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
