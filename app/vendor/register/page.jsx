"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from "lucide-react"

const serviceOptions = [
  "Roofing Services",
  "Ceiling Installation",
  "Flooring Services",
  "Electrical Services",
  "Plumbing Services",
  "HVAC Services",
  "Painting Services",
  "Carpentry Services",
  "Masonry Services",
  "Landscaping Services",
]

const experienceOptions = ["1-2 years", "3-5 years", "6-10 years", "11-15 years", "16-20 years", "20+ years"]

export default function VendorRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Business Info
    businessName: "",
    businessType: "",
    licenseNumber: "",
    insuranceNumber: "",
    experience: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Services
    services: [],
    // Payment
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    // Terms
    agreeToTerms: false,
    agreeToPrivacy: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/vendor/pending-approval")
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
              step <= currentStep ? "bg-[#B80D2D] text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
          </div>
          {step < 4 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-[#B80D2D]" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Create a strong password"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
        <p className="text-gray-600">Tell us about your construction business</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => handleInputChange("businessName", e.target.value)}
            placeholder="Enter your business name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type *</Label>
          <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="llc">LLC</SelectItem>
              <SelectItem value="corporation">Corporation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="licenseNumber">License Number</Label>
          <Input
            id="licenseNumber"
            value={formData.licenseNumber}
            onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
            placeholder="Enter your license number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="insuranceNumber">Insurance Number</Label>
          <Input
            id="insuranceNumber"
            value={formData.insuranceNumber}
            onChange={(e) => handleInputChange("insuranceNumber", e.target.value)}
            placeholder="Enter your insurance number"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience *</Label>
        <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your experience" />
          </SelectTrigger>
          <SelectContent>
            {experienceOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Business Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe your business, specialties, and what makes you unique..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-4">
        <Label>Business Address *</Label>
        <div className="space-y-4">
          <Input
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Street address"
            required
          />
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="City"
              required
            />
            <Input
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              placeholder="State"
              required
            />
            <Input
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              placeholder="ZIP Code"
              required
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Services Offered</h2>
        <p className="text-gray-600">Select the services you provide</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {serviceOptions.map((service) => (
          <div key={service} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
            <Checkbox
              id={service}
              checked={formData.services.includes(service)}
              onCheckedChange={() => handleServiceToggle(service)}
            />
            <Label htmlFor={service} className="flex-1 cursor-pointer">
              {service}
            </Label>
          </div>
        ))}
      </div>

      {formData.services.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900 mb-2">Selected Services:</h3>
          <div className="flex flex-wrap gap-2">
            {formData.services.map((service) => (
              <span key={service} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {service}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment & Subscription</h2>
        <p className="text-gray-600">Complete your registration with monthly subscription</p>
      </div>

      {/* Pricing Card */}
      <div className="bg-gradient-to-br from-[#B80D2D] to-[#9A0B26] rounded-2xl p-8 text-white text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Professional Plan</h3>
        <div className="text-4xl font-bold mb-4">
          $49<span className="text-lg font-normal">/month</span>
        </div>
        <ul className="space-y-2 text-white/90 mb-6">
          <li>✓ Unlimited enquiry access</li>
          <li>✓ Direct customer contact</li>
          <li>✓ Quote management system</li>
          <li>✓ Business profile showcase</li>
          <li>✓ Customer reviews & ratings</li>
          <li>✓ Priority support</li>
        </ul>
        <p className="text-sm text-white/80">First 7 days free trial</p>
      </div>

      {/* Payment Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardholderName">Cardholder Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="cardholderName"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value)}
              placeholder="Enter cardholder name"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number *</Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                placeholder="MM/YY"
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV *</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="cvv"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                placeholder="123"
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="billingAddress">Billing Address *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="billingAddress"
              value={formData.billingAddress}
              onChange={(e) => handleInputChange("billingAddress", e.target.value)}
              placeholder="Enter billing address"
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
          />
          <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
            I agree to the{" "}
            <Link href="/terms" className="text-[#B80D2D] hover:underline">
              Terms of Service
            </Link>{" "}
            and understand that my subscription will auto-renew monthly at $49/month after the 7-day free trial.
          </Label>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToPrivacy"
            checked={formData.agreeToPrivacy}
            onCheckedChange={(checked) => handleInputChange("agreeToPrivacy", checked)}
          />
          <Label htmlFor="agreeToPrivacy" className="text-sm leading-relaxed">
            I agree to the{" "}
            <Link href="/privacy" className="text-[#B80D2D] hover:underline">
              Privacy Policy
            </Link>{" "}
            and consent to the processing of my personal data.
          </Label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Nexus Built</h1>
          <p className="text-xl text-gray-600">Start your 7-day free trial and grow your construction business</p>
        </div>

        {renderStepIndicator()}

        <Card className="border-0 shadow-xl bg-white">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="bg-transparent"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] hover:from-[#9A0B26] hover:to-[#7A0920] text-white"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading || !formData.agreeToTerms || !formData.agreeToPrivacy}
                    className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] hover:from-[#9A0B26] hover:to-[#7A0920] text-white"
                  >
                    {isLoading ? "Processing..." : "Complete Registration"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
