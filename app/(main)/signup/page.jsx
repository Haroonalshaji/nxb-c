"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Building2 } from "lucide-react"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { title } from "process"
import { signUpUser, verifyUserEmailwithOTP } from "@/lib/api/auth"
import UserOTPModal from "@/components/userOTPDialog"

export default function SignUpPage() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [customerId, setCustomerId] = useState("")

  const validatePassword = () => {
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // Check password length
    if (password.length < 6) {
      toast({
        title: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return false;
    }

    // Check at least one number
    if (!/\d/.test(password)) {
      toast({
        title: "Password must contain at least one number.",
        variant: "destructive",
      });
      return false;
    }

    // Check at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast({
        title: "Password must contain at least one special character.",
        variant: "destructive",
      });
      return false;
    }

    // Check confirm password
    if (password !== confirmPassword) {
      toast({
        title: "Your password and confirm password should match.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validatePassword();
    if (!isValid) {
      return; // stop execution if password is invalid
    }
    try {
      const response = await signUpUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.email,
        pwd: formData.password,
      });
      const custId = response.data.result.cust_id;
      setCustomerId(custId);
      toast({
        title: "Account created successfully!",
        description: "Please enter the OTP sent to your email.",
      })

      // open OTP modal
      setIsOtpModalOpen(true)


    } catch (error) {
      console.error(error)
      toast({
        title: ` ${error.response.data?.message}`,
        variant: "destructive",
      })
    }

    // Handle signup logic here
    console.log("Signup data:", formData)
  }



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto px-4 max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 hidden">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-[#B80D2D]" />
            <span className="text-2xl font-bold text-gray-900">BuildPro</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create account</CardTitle>
            <CardDescription className="text-center">
              Join Nexus Built to connect with construction professionals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
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

              {/* Confirm Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="rounded border-gray-300" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#B80D2D] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#B80D2D] hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full bg-[#B80D2D] hover:bg-[#9A0B26]">
                Create Account
              </Button>
            </form>

            <Separator />

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-[#B80D2D] hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to home
          </Link>
        </div>
        <UserOTPModal modalOpen={isOtpModalOpen} customerId={customerId} />
      </div>
    </div>
  )
}
