"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Clock, CheckCircle, Mail, Phone, FileText, ArrowRight } from "lucide-react"

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      {/* <header className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] text-white shadow-xl">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8" />
              <span className="text-xl font-bold">Nexus Built</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/80">Need help?</span>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-[#B80D2D] bg-transparent"
                >
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header> */}

      <div className="container mx-auto px-4 max-w-4xl py-16">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="h-12 w-12 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Registration Submitted!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for joining Nexus Built. Your application is currently under review by our admin team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#B80D2D] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Document Verification</h3>
                  <p className="text-sm text-gray-600">
                    Our team will verify your business license and insurance information
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#B80D2D] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Background Check</h3>
                  <p className="text-sm text-gray-600">We'll conduct a background check to ensure quality standards</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#B80D2D] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Account Activation</h3>
                  <p className="text-sm text-gray-600">
                    Once approved, you'll receive an email to activate your account
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900">
                <Clock className="h-5 w-5 mr-2" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">24-48 hours</div>
                <p className="text-blue-600 mb-4">Typical approval time</p>
                <div className="bg-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-medium">
                    We'll notify you via email once your application is reviewed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#B80D2D]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-[#B80D2D]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Check Your Email</h3>
              <p className="text-sm text-gray-600">
                We'll send updates about your application status to your registered email
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#B80D2D]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-[#B80D2D]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Stay Available</h3>
              <p className="text-sm text-gray-600">
                Our team may contact you for additional information or clarification
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#B80D2D]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-[#B80D2D]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Prepare Documents</h3>
              <p className="text-sm text-gray-600">
                Have your business documents ready in case we need additional verification
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">While You Wait...</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Take some time to prepare your business profile, gather project photos, and think about how you want to
            showcase your services to potential customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-white text-[#B80D2D] hover:bg-gray-100">
                Go Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-[#B80D2D] bg-transparent"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
