"use client";

import { useState } from "react";
import { CardDescription } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { customerPasswordReset, vendorResetPassword } from "@/lib/api/auth";
import { useToast } from "@/hooks/use-toast";

export default function PasswordResetVendorMain() {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const resetId = searchParams.get("resetId")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const validatePassword = () => {
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return false;
        }

        if (!/\d/.test(password)) {
            setError("Password must contain at least one number.");
            return false;
        }

        if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
            setError("Password must contain at least one special character.");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!validatePassword()) {
            return;
        }

        const newPassword = confirmPassword.trim();

        try {
            const response = await vendorResetPassword({ resetId, newPassword });
            toast({
                title: response.data?.message,
                description: "Please Login Again",
            })
            router.push('/vendor')
        } catch (error) {
            console.error(error)
            toast({
                title: `${error.response.data?.message}`,
                variant: "destructive",
            })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-center">Reset Password</h2>
                <CardDescription className="text-center mb-6">Create a new password here.</CardDescription>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 font-medium">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#B93239] text-white py-2 rounded hover:bg-[#A02A31] transition"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}
