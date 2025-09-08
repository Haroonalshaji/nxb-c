import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { resendUserVerificatinOTP, verifyUserEmailwithOTP } from "@/lib/api/auth"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"



export default function UserOTPModal({ modalOpen, customerId }) {
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
        try {
            const response = await verifyUserEmailwithOTP({
                custGuid: customerId,
                otp: otp,
            })
            console.log("OTP Verification response:", response.data)

            toast({
                title: "OTP Verified!",
                description: "You can now login.",
            })

            setIsOtpModalOpen(false)
            // redirect user to signin page
            router.push("/signin")
            // router.push("/signin")
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
            const response = await resendUserVerificatinOTP({ custGuid: customerId })
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
        <Dialog open={modalOpen} onOpenChange={setIsOtpModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter OTP</DialogTitle>
                    <DialogDescription>
                        We’ve sent a one-time password to your email. Enter it below to verify your account.
                        <br />
                        <span className="text-sm text-gray-500">⚡ OTP is valid for 10 minutes.</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
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
                </div>
            </DialogContent>
        </Dialog>
    );
}