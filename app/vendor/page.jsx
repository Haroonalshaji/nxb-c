"use client"

import { useEffect, useState } from "react"
import { redirect, usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Building2, Mail, Lock, ArrowRight, CheckCircle, Users, Star, TrendingUp } from "lucide-react"
import { vendorSignin } from "@/lib/api/auth"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"
import { setCookie, getCookie, listAllCookies } from '@/lib/utils/cookies'
import { getVendorProfileData } from "@/lib/api/commonApi"

export default function VendorLoginPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [active, setActive] = useState("client")
  const currentPath = usePathname();
  const [showPassword, setShowPassword] = useState(false)


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
    try {
      const response = await vendorSignin({ userId: email, password: password });
      const RetData = response.data;
      // console.log(RetData)
      const userRoles = {
        accessToken: RetData.result.accessToken,
        refreshToken: RetData.result.refreshToken,
        role: RetData.result.role,
        userName: RetData.result.userName,
        userStatus: RetData.result.status
      }
      console.log(userRoles)
      if (response) {
        setIsLoading(false)

        // Set cookies immediately and verify they were set
        const cookiesSet = [
          setCookie('accessToken', userRoles.accessToken, 1),
          setCookie('refreshToken', userRoles.refreshToken, 7),
          setCookie('userName', userRoles.userName, 1),
          setCookie('userStatus', userRoles.userStatus, 1),
          setCookie('role', userRoles.role, 1)
        ];

        // Verify cookies were actually set by reading them back
        const accessTokenFromCookie = getCookie('accessToken');
        const refreshTokenFromCookie = getCookie('refreshToken');

        const vendorProfileInfo = await getVendorProfileData();
        console.log(vendorProfileInfo,'vendor')
        setCookie("newVendName", vendorProfileInfo.data.result.firstName)
        setCookie("newVendEmail", vendorProfileInfo.data.result.emailAddress)

        // console.log('Access Token from cookie:', accessTokenFromCookie);
        // console.log('Refresh Token from cookie:', refreshTokenFromCookie);
        // console.log('All cookies:', document.cookie);

        // List all cookies in a structured format
        listAllCookies();

        // Check if all cookies were set successfully
        const allCookiesSet = cookiesSet.every(result => result === true) &&
          accessTokenFromCookie === userRoles.accessToken &&
          refreshTokenFromCookie === userRoles.refreshToken;

        if (RetData.isSuccess === true) {
          if (allCookiesSet) {
            toast({
              title: `✅  ${RetData.message}`,
              variant: "success",
            })

            // Navigate after a short delay to ensure cookies are set
            setTimeout(() => {
              router.push("/vendor/dashboard")
            }, 10)
          } else {
            toast({
              title: "⚠️ Login successful but session not saved properly. Please try again.",
              variant: "destructive",
            })
          }
        } else {
          toast({
            title: ` ${RetData.message}`,
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error)
      toast({
        title: ` ${error.response.data.message}`,
        variant: "destructive",
      })
    }


    setTimeout(() => {

    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}


      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Login Form */}

          <div className="space-y-8">
            <div className="text-center lg:text-left">
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
                  <Link href='/vendor' className={`w-1/2 flex items-center shadow-inner justify-center rounded-md font-medium transition-all duration-300 ${active === "vendor"
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Vendor Portal</h1>
              <p className="text-xl text-gray-600 mb-6">
                Access your dashboard to manage enquiries and grow your construction business
              </p>
            </div>

            <Card className="border-0 shadow-xl bg-white">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">Sign in to your vendor account to continue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10"
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
                    <Link href="/vendor/forgot-password" className="text-sm text-[#B80D2D] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] hover:from-[#9A0B26] hover:to-[#7A0920] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <Separator />

                <div className="text-center text-sm">
                  {"Don't have a vendor account? "}
                  <Link href="/vendor/register" className="text-[#B80D2D] hover:underline font-medium">
                    Register Now
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Benefits */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Join Nexus Built?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <Users className="h-6 w-6 text-[#B80D2D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Access Quality Leads</h3>
                    <p className="text-gray-600">
                      Connect with verified customers actively seeking construction services
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-[#B80D2D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Grow Your Business</h3>
                    <p className="text-gray-600">Expand your customer base and increase revenue with our platform</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <Star className="h-6 w-6 text-[#B80D2D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Build Your Reputation</h3>
                    <p className="text-gray-600">
                      Showcase your work and build trust with customer reviews and ratings
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-[#B80D2D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Easy Management</h3>
                    <p className="text-gray-600">Manage enquiries, quotes, and customer communications in one place</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="mb-6 text-white/90">
                Join thousands of contractors already growing their business with Nexus Built
              </p>
              <Link href="/vendor/register">
                <Button className="bg-white text-[#B80D2D] hover:bg-gray-100 font-medium">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
