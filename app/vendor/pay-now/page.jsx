"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    CreditCard,
    Home,
    MessageSquare,
    AlertCircle,
    CheckCircle,
    Lock,
    Shield,
    Clock,
    ChevronRight,
    ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function SubscriptionPaymentPage() {
    const [selectedPlan, setSelectedPlan] = useState("monthly")

    const plans = {
        monthly: {
            name: "Monthly Plan",
            price: "299",
            period: "month",
            features: ["Verified vendor listing", "Enquiry dashboard access", "Customer profile exposure"],
        },
        quarterly: {
            name: "Quarterly Plan",
            price: "749",
            period: "3 months",
            savings: "Save 15%",
            features: ["All monthly features", "Better listing position", "Optional Premium badge upgrade"],
        },
        yearly: {
            name: "Yearly Plan",
            price: "2,499",
            period: "year",
            savings: "Save 30%",
            features: ["All features unlocked", "Homepage visibility", "Premium Partner badge included"],
        },
    }

    const benefits = [
        {
            icon: Shield,
            title: "Verified Status",
            description: "Maintain your verified vendor status and build trust",
        },
        {
            icon: MessageSquare,
            title: "Enquiry Access",
            description: "Continue receiving customer enquiries directly",
        },
        {
            icon: CheckCircle,
            title: "Profile Visibility",
            description: "Stay visible in search results and categories",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-white">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#B93239] via-[#A02A31] to-[#8B1E25] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <AlertCircle className="h-16 w-16 mx-auto mb-6 text-white/90" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Subscription Needs Attention</h1>
                        <p className="text-xl opacity-90 mb-8">
                            To continue enjoying all the benefits of Nexus Built, please complete your subscription payment.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Badge className="bg-white/20 text-white border-0 px-4 py-1.5 text-sm">
                                <Clock className="h-4 w-4 mr-1" /> Limited Access Mode
                            </Badge>
                            <Badge className="bg-white/20 text-white border-0 px-4 py-1.5 text-sm">
                                <Lock className="h-4 w-4 mr-1" /> Features Restricted
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Main content */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {/* Left column - Benefits */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <Shield className="h-5 w-5 mr-2 text-[#B93239]" />
                                    Why Continue?
                                </h2>

                                <div className="space-y-6">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 w-10 h-10 bg-[#B93239]/10 rounded-lg flex items-center justify-center">
                                                <benefit.icon className="h-5 w-5 text-[#B93239]" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-1">{benefit.title}</h3>
                                                <p className="text-sm text-gray-600">{benefit.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <div className="bg-yellow-50 rounded-lg p-4 text-sm text-yellow-800">
                                        <p className="flex items-start">
                                            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-600" />
                                            <span>
                                                Your profile visibility and enquiry access will be limited until payment is completed.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right column - Payment options */}
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Subscription Plan</h2>

                            {/* Plan selection */}
                            <div className="grid md:grid-cols-3 gap-4 mb-8">
                                {Object.entries(plans).map(([key, plan]) => (
                                    <Card
                                        key={key}
                                        className={`cursor-pointer transition-all hover:shadow-md ${selectedPlan === key
                                            ? "border-[#B93239] ring-2 ring-[#B93239] ring-opacity-50"
                                            : "border-gray-200"
                                            }`}
                                        onClick={() => setSelectedPlan(key)}
                                    >
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg flex justify-between items-center">
                                                {plan.name}
                                                {plan.savings && (
                                                    <Badge className="bg-green-100 text-green-700 border-0 text-xs">{plan.savings}</Badge>
                                                )}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pb-3">
                                            <div className="flex items-baseline mb-4">
                                                <span className="text-3xl font-bold text-gray-900">AED {plan.price}</span>
                                                <span className="text-gray-500 ml-1">/ {plan.period}</span>
                                            </div>
                                            <ul className="space-y-2 text-sm">
                                                {plan.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center">
                                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                                        <span className="text-gray-700">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                            <div
                                                className={`w-5 h-5 rounded-full border-2 ${selectedPlan === key ? "border-[#B93239] bg-[#B93239]" : "border-gray-300"
                                                    } flex items-center justify-center`}
                                            >
                                                {selectedPlan === key && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>

                            {/* Payment CTA */}
                            <Card className="mb-8 border-0 bg-gradient-to-r from-[#B93239]/5 to-[#A02A31]/5">
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-900">Complete Your Payment</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 mb-6">
                                        You're just one step away from restoring full access to your Nexus Built account. Your selected plan
                                        will be activated immediately after payment.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-[#B93239] to-[#A02A31] hover:from-[#A02A31] hover:to-[#8B1E25] text-white shadow-lg hover:shadow-xl transition-all group flex-1"
                                        >
                                            <CreditCard className="mr-2 h-5 w-5" />
                                            Pay Now
                                            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                        <Link href='/contactUs'>
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                className="border-2 border-[#B93239] text-[#B93239] hover:bg-[#B93239] hover:text-white bg-transparent flex-1"
                                            >
                                                <MessageSquare className="mr-2 h-5 w-5" />
                                                Need Help?
                                            </Button></Link>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment security */}
                            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
                                <div className="flex items-center mb-4">
                                    <Lock className="h-5 w-5 text-gray-500 mr-2" />
                                    <h3 className="text-lg font-medium text-gray-900">Secure Payment</h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">
                                    All transactions are secure and encrypted. We accept multiple payment methods including credit cards
                                    and bank transfers.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <div className="bg-gray-100 rounded-md px-3 py-1 text-xs text-gray-600">256-bit SSL</div>
                                    <div className="bg-gray-100 rounded-md px-3 py-1 text-xs text-gray-600">PCI Compliant</div>
                                    <div className="bg-gray-100 rounded-md px-3 py-1 text-xs text-gray-600">Encrypted Data</div>
                                </div>
                            </div>

                            {/* Additional actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/">
                                    <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                                        <Home className="mr-2 h-5 w-5" />
                                        Return to Homepage
                                    </Button>
                                </Link>
                                <Link href='/contactUs'>
                                    <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                                        <MessageSquare className="mr-2 h-5 w-5" />
                                        Contact Support
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* FAQ section */}
                    <div className="border-t border-gray-200 pt-12 mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">What happens if I don't pay now?</h3>
                                <p className="text-gray-600 text-sm">
                                    Your profile will have limited visibility and you won't be able to receive new enquiries. After 30
                                    days, your profile may be marked as inactive.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Can I change my subscription plan?</h3>
                                <p className="text-gray-600 text-sm">
                                    Yes, you can upgrade or downgrade your plan at any time. Changes will be effective from your next
                                    billing cycle.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Is there a refund policy?</h3>
                                <p className="text-gray-600 text-sm">
                                    We follow a strict no-refund policy once your vendor profile has been verified and activated on the
                                    platform.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Need more help?</h3>
                                <p className="text-gray-600 text-sm">
                                    Contact our support team at{" "}
                                    <a href="mailto:support@nxbuilt.com" className="text-[#B93239] hover:underline">
                                        support@nxbuilt.com
                                    </a>{" "}
                                    for assistance with your subscription.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-8 border-t border-gray-200">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to restore full access?</h3>
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-[#B93239] to-[#A02A31] hover:from-[#A02A31] hover:to-[#8B1E25] text-white shadow-lg hover:shadow-xl transition-all group"
                    >
                        Complete Subscription Payment
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
