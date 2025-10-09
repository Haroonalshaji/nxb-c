"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    AlertCircle,
    Clock,
    XCircle,
    CheckCircle,
    CreditCard,
    Search,
    RefreshCw,
    Mail,
    Phone,
    FileText,
    ArrowRight,
    Home,
    MessageSquare,
} from "lucide-react"
import { createSubscriptionOrder, getSubscriptionPlans, updateSubscriptionOrder } from "@/lib/api/commonApi"
import { useEffect, useState } from "react"
import PaymentModal from "@/components/paymentModa"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"



export default function VendorStatusScreens({ status, onRetry, businessData }) {

    const [subscriptionPlans, setSubscriptionPlans] = useState({
        monthlyPrice: 0,
        quarterlyPrice: 0,
        annualPrice: 0,
        subscriptionGuid: null,
    });

    const router = useRouter();

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [responseFromPayment, setResponseFromPayment] = useState({});
    const { toast } = useToast();

    const getStatusConfig = (status) => {
        switch (status) {
            case "BusinessNotFound":
                return {
                    icon: Search,
                    title: "Business Not Found",
                    subtitle: "We couldn't locate your business in our records",
                    color: "text-gray-600",
                    bgColor: "bg-gray-50",
                    borderColor: "border-gray-200",
                    iconBg: "bg-gray-100",
                    iconColor: "text-gray-600",
                }
            case "PendingVerification":
                return {
                    icon: Clock,
                    title: "Verification in Progress",
                    subtitle: "Your business is currently under review",
                    color: "text-orange-600",
                    bgColor: "bg-orange-50",
                    borderColor: "border-orange-200",
                    iconBg: "bg-orange-100",
                    iconColor: "text-orange-600",
                }
            case "Rejected":
                return {
                    icon: XCircle,
                    title: "Application Rejected",
                    subtitle: "Your vendor application was not approved",
                    color: "text-red-600",
                    bgColor: "bg-red-50",
                    borderColor: "border-red-200",
                    iconBg: "bg-red-100",
                    iconColor: "text-red-600",
                }
            case "Verified":
                return {
                    icon: CheckCircle,
                    title: "Business Verified",
                    subtitle: "Your business has been successfully verified",
                    color: "text-green-600",
                    bgColor: "bg-green-50",
                    borderColor: "border-green-200",
                    iconBg: "bg-green-100",
                    iconColor: "text-green-600",
                }
            case "NoActiveSubscription":
                return {
                    icon: CreditCard,
                    title: "Subscription Required",
                    subtitle: "Please activate your subscription to access the dashboard",
                    color: "text-[#B93239]",
                    bgColor: "bg-red-50",
                    borderColor: "border-red-200",
                    iconBg: "bg-red-100",
                    iconColor: "text-[#B93239]",
                }
            default:
                return {
                    icon: AlertCircle,
                    title: "Unknown Status",
                    subtitle: "Unable to determine your account status",
                    color: "text-gray-600",
                    bgColor: "bg-gray-50",
                    borderColor: "border-gray-200",
                    iconBg: "bg-gray-100",
                    iconColor: "text-gray-600",
                }
        }
    }

    const config = getStatusConfig(status)
    const StatusIcon = config.icon

    const subscriptionPlansFromApi = async () => {
        try {
            const RetData = await getSubscriptionPlans();
            if (RetData?.data?.result) {
                setSubscriptionPlans(RetData.data.result);
            }
        } catch (err) {
            console.error("Error fetching subscription plans:", err);
        }
    };

    const handlePayment = async (plan, subscriptionPlans) => {
        console.log('handlePayment called with plan:', plan, 'subscriptionPlans:', subscriptionPlans);

        const payload = {
            subscriptionGuid: subscriptionPlans.subscriptionGuid,
            planType: plan,
        };

        try {
            const returnFromCreateOrder = await createSubscriptionOrder(payload);
            console.log('API Response:', returnFromCreateOrder);
            // Extract order details from response
            if (returnFromCreateOrder?.data?.result) {
                const orderDetails = returnFromCreateOrder.data.result;
                // console.log('Order details extracted:', orderDetails);
                setOrderData({
                    orderGuid: orderDetails.orderGuid,
                    orderNo: orderDetails.orderNo,
                    name: orderDetails.name,
                    lastName: orderDetails.lastName,
                    email: orderDetails.email,
                    contact: orderDetails.contact,
                    priceAtPurchase: orderDetails.priceAtPurchase,
                    paymentId: orderDetails.paymentId,
                    stripeCheckoutUrl: orderDetails.stripeCheckoutUrl
                });
                setShowPaymentModal(true);
                onRetry?.();
            } else {
                console.log('No order details found in API response');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            toast({
                title: `${error?.response?.data?.message}`,
                description: "Please Refresh the page",
                variant: "destructive"
            })
        }
    };

    const updateSubscriptionOrderinDB = async (response) => {
        try {
            const responseFromDataBase = await updateSubscriptionOrder({
                orderGuid: orderData.orderGuid,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                razorpay_payment_id: response.razorpay_payment_id
            })
            console.log(responseFromDataBase)
            router.push('/vendor/dashboard')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        subscriptionPlansFromApi();
    }, [])



    // Payment Modal - Check this FIRST before any status screens
    if (showPaymentModal) {
        // console.log('Rendering PaymentModal with orderData:', orderData);
        return (
            <PaymentModal
                orderData={orderData}
                onClose={() => setShowPaymentModal(false)}
                stripeCheckoutUrl={orderData.stripeCheckoutUrl}
                onSuccess={(response) => {
                    console.log('Payment completed:', response);
                    // setResponseFromPayment(response)
                    // updateSubscriptionOrderinDB(response)
                    setShowPaymentModal(false);
                    onRetry();
                    // console.log(responseFromPayment)
                    setTimeout(() => {
                        onRetry();
                    }, 1500); // 2000ms = 2 seconds
                }}
            />
        );
    }

    if (status === "BusinessNotFound") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="max-w-2xl mx-auto text-center">
                    <Card className="border-0 shadow-2xl bg-white">
                        <CardHeader className="pb-6">
                            <div className={`w-20 h-20 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                                <StatusIcon className={`h-10 w-10 ${config.iconColor}`} />
                            </div>
                            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{config.title}</CardTitle>
                            <p className="text-lg text-gray-600">{config.subtitle}</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Possible Reasons:</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span>Your business registration is not yet complete</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span>You haven't submitted a vendor application</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span>There may be a technical issue with your account</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    onClick={onRetry}
                                    className="bg-gradient-to-r from-[#B93239] to-[#A02A31] hover:from-[#A02A31] hover:to-[#8B1E25] text-white flex-1"
                                >
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Retry
                                </Button>
                                <Button variant="outline" className="flex-1 bg-transparent">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Contact Support
                                </Button>
                            </div>

                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-2">Need to register as a vendor?</p>
                                <Button variant="ghost" className="text-[#B93239] hover:text-[#A02A31]">
                                    Start Vendor Application
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (status === "PendingVerification") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
                <div className="max-w-2xl mx-auto text-center">
                    <Card className="border-0 shadow-2xl bg-white">
                        <CardHeader className="pb-6">
                            <div className={`w-20 h-20 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                                <StatusIcon className={`h-10 w-10 ${config.iconColor} animate-pulse`} />
                            </div>
                            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{config.title}</CardTitle>
                            <p className="text-lg text-gray-600">{config.subtitle}</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                                <h3 className="font-semibold text-orange-900 mb-4">What's Happening Now:</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                        <span className="text-gray-700">Application submitted</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-orange-500 mr-3 animate-pulse" />
                                        <span className="text-gray-700">Documents under review</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-gray-400 mr-3" />
                                        <span className="text-gray-500">Final approval pending</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Expected Timeline</h4>
                                    <p className="text-sm text-gray-600">3-5 business days</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Status Updates</h4>
                                    <p className="text-sm text-gray-600">Via email & SMS</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    onClick={onRetry}
                                    variant="outline"
                                    className="border-orange-300 text-orange-600 hover:bg-orange-50 flex-1 bg-transparent"
                                >
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Check Status
                                </Button>
                                <Button variant="outline" className="flex-1 bg-transparent">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Contact Support
                                </Button>
                            </div>

                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500">We'll notify you as soon as your verification is complete</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (status === "Rejected") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
                <div className="max-w-2xl mx-auto text-center">
                    <Card className="border-0 shadow-2xl bg-white">
                        <CardHeader className="pb-6">
                            <div className={`w-20 h-20 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                                <StatusIcon className={`h-10 w-10 ${config.iconColor}`} />
                            </div>
                            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{config.title}</CardTitle>
                            <p className="text-lg text-gray-600">{config.subtitle}</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                                <h3 className="font-semibold text-red-900 mb-4">Common Rejection Reasons:</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span>Incomplete or invalid documentation</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span>Business doesn't meet minimum requirements</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span>Trade license issues or discrepancies</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                <h3 className="font-semibold text-blue-900 mb-3">Next Steps:</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 text-blue-600 mr-3" />
                                        <span className="text-gray-700">Check your email for detailed feedback</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FileText className="h-5 w-5 text-blue-600 mr-3" />
                                        <span className="text-gray-700">Review and update your documents</span>
                                    </div>
                                    <div className="flex items-center">
                                        <RefreshCw className="h-5 w-5 text-blue-600 mr-3" />
                                        <span className="text-gray-700">Submit a new application</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-gradient-to-r from-[#B93239] to-[#A02A31] hover:from-[#A02A31] hover:to-[#8B1E25] text-white flex-1">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Reapply Now
                                </Button>
                                <Button variant="outline" className="flex-1 bg-transparent">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Get Help
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (status === "NoActiveSubscription") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
                <div className="max-w-3xl mx-auto text-center">
                    <Card className="border-0 shadow-2xl bg-white">
                        <CardHeader className="pb-6">
                            <div className={`w-20 h-20 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                                <StatusIcon className={`h-10 w-10 ${config.iconColor}`} />
                            </div>
                            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{config.title}</CardTitle>
                            <p className="text-lg text-gray-600">{config.subtitle}</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-gradient-to-r from-[#B93239]/10 to-[#A02A31]/10 rounded-xl p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Choose Your Plan:</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div onClick={() => setSelectedPlan({ type: "Monthly", price: subscriptionPlans.monthlyPrice, })} className={`bg-white cursor-pointer rounded-lg p-4 border-2 border-[#B93239] relative ${selectedPlan?.type === "Monthly" ? "border bg-[#FFF0F1]" : "border-gray-200 bg-white"}`}>
                                        <h4 className="font-semibold text-gray-900 mb-2">Monthly</h4>
                                        <div className="text-2xl font-bold text-[#B93239] mb-2">AED {subscriptionPlans.monthlyPrice}</div>
                                        {/* <p className="text-sm text-gray-600">Perfect for getting started</p> */}
                                    </div>
                                    <div onClick={() => setSelectedPlan({ type: "Quarterly", price: subscriptionPlans.quarterlyPrice, })} className={`bg-white cursor-pointer rounded-lg p-4 border-2 border-[#B93239] relative ${selectedPlan?.type === "Quarterly" ? "border bg-[#FFF0F1]" : "border-gray-200 bg-white"}`}>
                                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#B93239] text-white">
                                            Popular
                                        </Badge>
                                        <h4 className="font-semibold text-gray-900 mb-2">Quarterly</h4>
                                        <div className="text-2xl font-bold text-[#B93239] mb-2">AED {subscriptionPlans.quarterlyPrice}</div>
                                        {/* <p className="text-sm text-gray-600">Save 15% with quarterly billing</p> */}
                                    </div>
                                    <div onClick={() => setSelectedPlan({ type: "Annually", price: subscriptionPlans.annualPrice, })} className={`bg-white cursor-pointer rounded-lg p-4 border border-2 border-[#B93239] ${selectedPlan?.type === "Annually" ? "border bg-[#FFF0F1]" : "border-gray-200 bg-white"}`}>
                                        <h4 className="font-semibold text-gray-900 mb-2">Annually</h4>
                                        <div className="text-2xl font-bold text-[#B93239] mb-2">AED {subscriptionPlans.annualPrice}</div>
                                        {/* <p className="text-sm text-gray-600">Best value - Save 30%</p> */}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                <h3 className="font-semibold text-green-900 mb-3">What You Get:</h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {subscriptionPlans.description
                                        ?.split("\r\n")
                                        .map((line, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                                <span className="text-gray-700">{line.replace("✓", "").trim()}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="bg-green-50 hidden rounded-xl p-6 border border-green-200">
                                <h3 className="font-semibold text-green-900 mb-3">What You Get:</h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <div className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                        <span className="text-gray-700">Verified vendor listing</span>
                                    </div>
                                    <div className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                        <span className="text-gray-700">Customer enquiry access</span>
                                    </div>
                                    <div className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                        <span className="text-gray-700">Dashboard & analytics</span>
                                    </div>
                                    <div className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                        <span className="text-gray-700">Priority support</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    disabled={!selectedPlan}
                                    onClick={() => handlePayment(selectedPlan?.type, subscriptionPlans)}
                                    className="bg-gradient-to-r from-[#B93239] to-[#A02A31] hover:from-[#A02A31] hover:to-[#8B1E25] text-white flex-1 disabled:opacity-50"
                                >
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    {selectedPlan ? `Pay ${selectedPlan.price} (${selectedPlan.type})` : "Choose Plan & Pay"}
                                </Button>

                                <Button variant="outline" className="flex-1 bg-transparent">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Contact
                                </Button>
                            </div>

                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500">Secure payment • Cancel anytime • 24/7 support</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div >
        )
    }

    // Default fallback for Unknown status
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                <Card className="border-0 shadow-2xl bg-white">
                    <CardHeader className="pb-6">
                        <div className={`w-20 h-20 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                            <StatusIcon className={`h-10 w-10 ${config.iconColor}`} />
                        </div>
                        <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{config.title}</CardTitle>
                        <p className="text-lg text-gray-600">{config.subtitle}</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <p className="text-gray-700 mb-4">
                                We're having trouble determining your account status. This could be due to:
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>A temporary system issue</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>Network connectivity problems</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>Account synchronization delay</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={onRetry}
                                className="bg-gradient-to-r from-[#B93239] to-[#A02A31] hover:from-[#A02A31] hover:to-[#8B1E25] text-white flex-1"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try Again
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent">
                                <Home className="h-4 w-4 mr-2" />
                                Go Home
                            </Button>
                        </div>

                        <div className="text-center pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500 mb-2">Still having issues?</p>
                            <Button variant="ghost" className="text-[#B93239] hover:text-[#A02A31]">
                                <Phone className="h-4 w-4 mr-2" />
                                Contact Support
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
