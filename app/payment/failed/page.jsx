"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  XCircle,
  CreditCard,
  Home,
  RefreshCw,
  LifeBuoy,
  AlertCircle,
  ArrowRight,
} from "lucide-react"

function formatAmount(amount, currency) {
  if (!amount) return "—"
  const value = Number(amount)
  if (Number.isNaN(value)) return amount
  const cur = (currency || "AED").toUpperCase()
  try {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 2,
    }).format(value / (value > 10000 ? 100 : 1))
  } catch {
    return `${cur} ${value.toLocaleString()}`
  }
}

export default function PaymentFailedPage() {
  const params = useSearchParams()

  const amount = params.get("amount")
  const currency = params.get("currency")
  const plan = params.get("plan")
  const period = params.get("period")
  const errorMessage = params.get("error")
  const formattedAmount = formatAmount(amount, currency)

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-rose-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-56 h-56 bg-red-400/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="bg-gradient-to-br from-rose-600 via-red-600 to-red-500 text-white py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 animate-pulse">
              <XCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Payment Failed
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              We couldn’t complete your payment
              {plan ? ` for the ${plan}` : ""}. No charges were made.
            </p>

            {/* Quick badges */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {formattedAmount !== "—" && (
                <Badge className="bg-white/20 text-white border-0">
                  <CreditCard className="h-3.5 w-3.5 mr-1" />
                  {formattedAmount}
                </Badge>
              )}
              {period && (
                <Badge className="bg-white/20 text-white border-0">{period}</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Left: Help section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What went wrong?
              </h2>

              <div className="bg-rose-50 border border-red-200 rounded-xl p-4 mb-6 text-red-800 flex">
                <AlertCircle className="h-5 w-5 mr-3 mt-0.5 text-red-600" />
                <div>
                  <p className="font-medium">We couldn’t process the transaction.</p>
                  <p className="text-sm mt-1">
                    {errorMessage
                      ? errorMessage
                      : "This may be due to insufficient funds, authentication failure, or network issues."}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Try the following:
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                  Use a different card or payment method
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                  Check with your bank for authorization or spending limits
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                  Try again in a few minutes — sometimes network issues cause temporary declines
                </li>
              </ul>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <Link href="/vendor/dashboard">
                  <Button className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-red-600 hover:to-red-700 text-white h-12 text-base">
                    Try Payment Again
                    <RefreshCw className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="mailto:support@nxbuilt.com">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base border-red-600 text-red-700 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    <LifeBuoy className="mr-2 h-5 w-5" />
                    Contact Support
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Continue browsing */}
          <div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-100 p-6 md:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Continue browsing
              </h3>
              <p className="text-gray-700 mb-6">
                You can still explore our vendors and services. Your account will
                regain full access once payment succeeds.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/vendor/dashboard">
                  <Button
                    variant="ghost"
                    className="w-full justify-center text-gray-700 hover:text-gray-900"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Go Home
                  </Button>
                </Link>
                <Link href="/vendor">
                  <Button
                    variant="ghost"
                    className="w-full justify-center text-gray-700 hover:text-gray-900"
                  >
                    Explore
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="max-w-5xl mx-auto text-center mt-10 text-sm text-gray-500">
          If you believe this is an error, please retry your payment or contact
          our support team for assistance.
        </div>
      </div>
    </div>
  )
}
