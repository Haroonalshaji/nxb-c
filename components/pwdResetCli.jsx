'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail } from "lucide-react"
import { toast, useToast } from "@/hooks/use-toast"
import { passwordReset } from "../lib/api/auth"

export default function PasswordResetPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        document.body.classList.add('authentication-bg')
        return () => {
            document.body.classList.remove('authentication-bg')
        }
    }, [])

    const emailId = email;

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Simulate API call
            const RetData = await passwordReset({ emailId });
            // console.log(RetData)
            setTimeout(() => {
                setIsLoading(false)
                toast({
                    title: `✅ ${RetData.data.message}`,
                    variant: "success",
                })
                // Optionally redirect after submission
                // router.push('/signin')
            }, 1000)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
            toast({
                title: "Failed to send reset link",
                variant: "destructive",
            })
        }
    }

    const themeColor = "rgb(184, 13, 45)" // #B80D2D

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="container mx-auto px-4 max-w-md">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Reset your password</CardTitle>
                        <CardDescription className="text-center">Enter your email and we’ll send you a reset link</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2 relative">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="absolute right-3 top-[43px] -translate-y-1/2 text-gray-500">
                                    <Mail size={18} />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-[#B80D2D] hover:bg-[#9A0B26]" disabled={isLoading}>
                                {isLoading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>

                        <Separator />

                        <div className="text-center text-sm">
                            Remembered your password?{' '}
                            <Link href="/signin" className="text-[#B80D2D] hover:underline font-medium">
                                Sign in
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
