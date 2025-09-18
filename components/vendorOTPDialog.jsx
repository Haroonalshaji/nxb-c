import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { resendUserVerificatinOTP, resendVendorEmailwithOtp, verifyUserEmailwithOTP, verifyVendorEmailwithOtp } from "@/lib/api/auth"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function VendorOTPBox({ modalOpen, vendGuid, onVerificationSuccess }) {
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)
    const [timer, setTimer] = useState(60) // 1 min countdown
    const [canResend, setCanResend] = useState(false)
    const [otp, setOtp] = useState("")
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (!modalOpen) return

        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)

            return () => clearInterval(countdown)
        } else {
            setCanResend(true)
        }
    }, [timer, modalOpen])

    const handleVerifyOtp = async () => {
        console.log(vendGuid)
        try {
            const response = await verifyVendorEmailwithOtp({
                vendGuid: vendGuid,
                otp: otp,
            })
            console.log("OTP Verification response:", response.data)

            toast({
                title: "OTP Verified!",
                description: "Email verification successful!",
            })

            // Call the success callback if provided, otherwise redirect to dashboard
            if (onVerificationSuccess) {
                onVerificationSuccess()
            } else {
                router.push("/vendor/dashboard")
            }
        } catch (error) {
            console.error(error)
            toast({
                title: ` ${error.response?.data?.message || "OTP Verification failed"}`,
                variant: "destructive",
            })
        }
    }

    const handleResendOtp = async () => {
        // 👉 Call API to resend OTP
        try {
            const response = await resendVendorEmailwithOtp({ vendGuid: vendGuid })
            console.log(response);
            toast({
                title: "New OTP sent!",
                description: "Please check your email.",
            })
        } catch (error) {
            toast({
                title: ` ${error.response?.data?.message || "OTP Verification failed"}`,
                variant: "destructive",
            })
        }
        // reset timer
        setTimer(60)
        setCanResend(false)
    }


    return (
        <div className=" flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>
                    <CardTitle>Enter OTP</CardTitle>
                    <CardDescription>
                        We’ve sent a one-time password to your email. Enter it below to verify your account.
                        <br />
                        <span className="text-sm text-gray-500">⚡ OTP is valid for 10 minutes.</span>
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button
                        className="w-full bg-[#B80D2D] hover:bg-[#9A0B26]"
                        onClick={handleVerifyOtp}
                    >
                        Verify OTP
                    </Button>

                    <div className="text-center text-sm">
                        {canResend ? (
                            <button
                                onClick={handleResendOtp}
                                className="text-blue-600 hover:underline"
                            >
                                Resend OTP
                            </button>
                        ) : (
                            <p className="text-gray-500">
                                Resend available in {timer}s
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}