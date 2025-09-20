import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, X } from "lucide-react";

export default function PaymentModal({ orderData, onClose, onSuccess }) {
    const { orderGuid, orderNo, name, lastName, email, contact, priceAtPurchase, paymentId } = orderData;
    // console.log(orderData)
    const { toast } = useToast();

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
            if (existingScript) {
                existingScript.onload = () => resolve(true);
                existingScript.onerror = () => resolve(false);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = (error) => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!priceAtPurchase || priceAtPurchase <= 0) {
            alert('Invalid amount for payment');
            return;
        }

        if (!name || !email) {
            alert('Missing required customer information');
            return;
        }

        const res = await loadRazorpayScript();
        if (!res) {
            alert('Razorpay SDK failed to load');
            return;
        }

        const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        if (!razorpayKey || razorpayKey === 'rzp_test_1234567890') {
            alert('Please configure your Razorpay Key ID in environment variables');
            return;
        }

        console.log("orderData", orderData)

        const options = {
            key: razorpayKey,
            amount: Math.round(parseFloat(priceAtPurchase) * 100), // Convert to paise and round
            currency: 'AED',
            name: name,
            description: `Subscription Order ${orderNo || 'Test'}`,
            order_id: paymentId,
            prefill: {
                name: `${name} ${lastName}`.trim(),
                email: email,
                contact: contact || '',
            },
            handler: function (response) {
                console.log('Payment successful:', response);
                toast({
                    title: `Payment Successfull !`,
                    variant: "success"
                })
                onSuccess(response);
            },
            theme: {
                color: '#B93239'
            },
            modal: {
                ondismiss: function () {
                    console.log('Payment modal dismissed');
                }
            },
            // // Add these for better card handling
            // notes: {
            //     order_id: orderGuid,
            //     order_number: orderNo
            // },
        };

        // console.log('Razorpay options:', options);

        try {
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                console.error('Payment failed:', response.error);
                alert('Payment failed: ' + response.error.description);
            });
            rzp.open();
        } catch (error) {
            console.error('Error opening Razorpay:', error);
            alert('Error opening payment gateway: ' + error.message);
        }
    };

    if (!orderData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Complete Your Payment
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Order Details */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 text-center">Order Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Order ID:</span>
                                <span className="font-medium text-gray-900">{orderNo}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Name:</span>
                                <span className="font-medium text-gray-900">{name} {lastName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium text-gray-900">{email}</span>
                            </div>
                            {contact && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Contact:</span>
                                    <span className="font-medium text-gray-900">{contact}</span>
                                </div>
                            )}
                            <div className="border-t pt-3">
                                <div className="flex justify-between">
                                    <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                                    <span className="text-xl font-bold text-[#B93239]">AED {priceAtPurchase}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <div className="space-y-4">
                        <Button
                            onClick={handlePayment}
                            className="w-full bg-gradient-to-r from-[#B93239] to-[#A02A31] hover:from-[#A02A31] hover:to-[#8B1E25] text-white py-3 text-lg font-semibold"
                        >
                            <CreditCard className="h-5 w-5 mr-2" />
                            Pay Now - AED {priceAtPurchase}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="w-full"
                        >
                            Cancel
                        </Button>
                    </div>

                    {/* Security Note */}
                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            🔒 Secure payment powered by Razorpay
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};