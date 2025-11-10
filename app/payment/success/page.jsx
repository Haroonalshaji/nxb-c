"use client";

import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  CreditCard,
  ReceiptText,
  Mail,
  CalendarClock,
  Home,
  ArrowRight,
  LifeBuoy,
} from "lucide-react";
import { stripePaymentCheck, vendorSubscriptionStatus } from "@/lib/api/commonApi";
// 👆 create this second API call function in your commonApi.js

function formatAmount(amount, currency) {
  if (!amount) return "—";
  const value = Number(amount);
  if (Number.isNaN(value)) return amount;
  const cur = (currency || "AED").toUpperCase();
  try {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 2,
    }).format(value / (value > 10000 ? 100 : 1));
  } catch {
    return `${cur} ${value.toLocaleString()}`;
  }
}

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [isValid, setIsValid] = useState(null);
  const [subscription, setSubscription] = useState({});

  const sessionId = params.get("session_id");
  const amount = params.get("amount");
  const currency = params.get("currency");
  const email = params.get("email");
  const plan = params.get("plan");
  const period = params.get("period");
  const receiptUrl = params.get("receipt_url");
  const reference = params.get("reference") || sessionId || "—";
  const orderGuid = params.get("orderGuid");

  const formattedAmount = formatAmount(amount, currency);

  useEffect(() => {
    if (!orderGuid) return;

    const checkPaymentAndFetch = async () => {
      try {
        // 1️⃣ Validate payment status
        const paymentRes = await stripePaymentCheck(orderGuid);
        if (paymentRes.data.paymentStatus !== "Success") {
          router.push(`/payment/failed?orderGuid=${orderGuid}`);
          return;
        }
        setIsValid(true);

        // 2️⃣ Fetch subscription details after successful payment
        const subscriptionRes = await vendorSubscriptionStatus(orderGuid);
        if (subscriptionRes.data.isSuccess === true) {
          setSubscription(subscriptionRes.data.result); // ✅ only set the result part
        } else {
          router.push("/vendor/dashboard");
        }
      } catch (error) {
        router.push(`/payment/failed?orderGuid=${orderGuid}`);
      }
    };

    checkPaymentAndFetch();
  }, [orderGuid, router]);

  if (isValid === null) {
    return <p className="p-10 text-center">Checking payment status...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-white relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-green-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-emerald-400/25 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 text-white py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Payment Successful 🎉
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Thank you! Your subscription has been activated
              {subscription?.subscriptionType ? ` (${subscription.subscriptionType})` : ""}.
            </p>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <Badge className="bg-white/20 text-white border-0">
                <CreditCard className="h-3.5 w-3.5 mr-1" />
                {subscription?.priceAtPurchase
                  ? formatAmount(subscription.priceAtPurchase, currency)
                  : formattedAmount}
              </Badge>
              {subscription?.subscriptionType && (
                <Badge className="bg-white/20 text-white border-0">
                  <CalendarClock className="h-3.5 w-3.5 mr-1" />
                  {subscription.subscriptionType}
                </Badge>
              )}
              {email && (
                <Badge className="bg-white/20 text-white border-0">
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  {email}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Left: Summary card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-green-100 shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* <div className="rounded-xl p-4 bg-green-50">
                  <div className="text-sm text-gray-500 mb-1">Reference</div>
                  <div className="font-medium text-gray-900 break-all">
                    {subscription?.orderGuid || reference}
                  </div>
                </div> */}
                <div className="rounded-xl p-4 bg-green-50">
                  <div className="text-sm text-gray-500 mb-1">Amount</div>
                  <div className="font-medium text-gray-900">
                    {subscription?.priceAtPurchase
                      ? formatAmount(subscription.priceAtPurchase, currency)
                      : formattedAmount}
                  </div>
                </div>
                <div className="rounded-xl p-4 bg-green-50">
                  <div className="text-sm text-gray-500 mb-1">Plan</div>
                  <div className="font-medium text-gray-900">
                    {subscription?.subscriptionType || plan || "—"}
                  </div>
                </div>
                <div className="rounded-xl p-4 bg-green-50">
                  <div className="text-sm text-gray-500 mb-1">Billing Period</div>
                  <div className="font-medium text-gray-900">
                    {subscription?.startDate
                      ? `${formatDate(subscription.startDate)} - ${formatDate(subscription.endDate)}`
                      : period || "—"}
                  </div>
                </div>
                <div className="rounded-xl p-4 bg-green-50">
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <div className="font-medium text-gray-900">
                    {subscription?.status || "—"}
                  </div>
                </div>
              </div>


              {/* <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl p-4 bg-green-50">
                  <div className="text-sm text-gray-500 mb-1">Reference</div>
                  <div className="font-medium text-gray-900 break-all">
                    {reference}
                  </div>
                </div>
                <div className="rounded-xl p-4 bg-green-50">
                  <div className="text-sm text-gray-500 mb-1">Amount</div>
                  <div className="font-medium text-gray-900">
                    {subscription?.priceAtPurchase
                      ? formatAmount(subscription.priceAtPurchase, currency)
                      : formattedAmount}
                  </div>
                </div>
                <div className="rounded-xl p-4 bg-green-50">
                  <div className="text-sm text-gray-500 mb-1">Plan</div>
                  <div className="font-medium text-gray-900">
                    {subscription?.subscriptionType || plan || "—"}
                  </div>
                </div>
                <div className="rounded-xl p-4 bg-green-50">
                  <div className="text-sm text-gray-500 mb-1">Billing Period</div>
                  <div className="font-medium text-gray-900">
                    {subscription?.startDate
                      ? `${formatDate(subscription.startDate)} - ${formatDate(subscription.endDate)}`
                      : period || "—"}
                  </div>
                </div>
              </div> */}

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <Link href="/vendor/dashboard">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white h-12 text-base">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                {receiptUrl ? (
                  <a href={receiptUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="w-full h-12 text-base border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white bg-transparent"
                    >
                      <ReceiptText className="mr-2 h-5 w-5" />
                      View Receipt
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base bg-transparent border-emerald-600 text-emerald-700"
                  >
                    <ReceiptText className="mr-2 h-5 w-5" />
                    Receipt will be emailed
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right: What's next */}
          <div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 p-6 md:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What happens next?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 mr-3" />
                  Your vendor profile regains full visibility and enquiry access
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 mr-3" />
                  You’ll receive a confirmation email
                  {email ? ` at ${email}` : ""} with receipt details
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 mr-3" />
                  Manage your subscription from your dashboard anytime
                </li>
              </ul>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link href="/vendor/dashboard">
                  <Button variant="ghost" className="w-full justify-center text-gray-700 hover:text-gray-900">
                    <Home className="mr-2 h-5 w-5" />
                    Go Home
                  </Button>
                </Link>
                <a href="mailto:support@nxbuilt.com">
                  <Button variant="ghost" className="w-full justify-center text-gray-700 hover:text-gray-900">
                    <LifeBuoy className="mr-2 h-5 w-5" />
                    Contact Support
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div className="max-w-5xl mx-auto text-center mt-10 text-sm text-gray-500">
          If you closed the payment window accidentally, Stripe may take a moment
          to confirm your payment status.
        </div>
      </div>
    </div>
  );
}
