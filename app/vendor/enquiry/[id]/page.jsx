"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  User,
  FileText,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Paperclip,
  Eye,
  Download,
  Send,
  Users,
} from "lucide-react"
import QuoteModal from '@/components/vendorFormDialog'

// Mock enquiry data (in real app, this would come from API based on ID)
const enquiryData = {
  id: 1,
  customerName: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  service: "Roofing Services",
  description:
    "Need roof repair for residential property. Some shingles are damaged after recent storm. Looking for experienced contractor with insurance coverage and warranty. The damage is primarily on the south-facing side of the house, and I need someone who can work with insurance companies for claims processing.",
  priority: "high",
  createdAt: "2024-01-15T10:30:00Z",
  location: "Downtown Area",
  budget: "$2,000 - $3,000",
  attachments: [
    {
      id: 1,
      filename: "roof_damage.jpg",
      fileSize: "2.3 MB",
      fileType: "image/jpeg",
    },
    {
      id: 2,
      filename: "insurance_estimate.pdf",
      fileSize: "1.1 MB",
      fileType: "application/pdf",
    },
  ],
  isOpen: true,
  responses: 3,
  hasResponded: false,
  propertyType: "Residential",
  urgency: "Within 2 weeks",
  preferredContact: "Phone",
}

const priorityConfig = {
  low: {
    color: "bg-slate-50 text-slate-600 border-slate-200",
    label: "Low Priority",
  },
  medium: {
    color: "bg-orange-50 text-orange-600 border-orange-200",
    label: "Medium Priority",
  },
  high: {
    color: "bg-red-50 text-red-600 border-red-200",
    label: "High Priority",
  },
}

export default function EnquiryDetailPage({ params }) {
  const [quoteData, setQuoteData] = useState({
    price: "",
    timeline: "",
    description: "",
    materials: "",
    warranty: "",
    additionalNotes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const handleInputChange = (field, value) => {
    setQuoteData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitQuote = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate quote submission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/vendor/dashboard")
    }, 2000)
  }

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) {
      return "🖼️"
    } else if (fileType === "application/pdf") {
      return "📄"
    }
    return "📎"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#B80D2D] hidden to-[#9A0B26] text-white shadow-xl">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/vendor/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10 p-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xl font-bold">Enquiry Details</span>
                  <p className="text-sm text-white/80">
                    #{enquiryData.id} - {enquiryData.service}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-white/20 text-white border-white/30">
                {enquiryData.hasResponded ? "Quote Sent" : "New Opportunity"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-7xl py-8">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enquiry Overview */}
            <Card className="border-0 shadow-lg bg-white">
              <div
                className={`h-1 ${enquiryData.priority === "high" ? "bg-red-500" : enquiryData.priority === "medium" ? "bg-orange-500" : "bg-slate-500"}`}
              ></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-3">{enquiryData.service}</CardTitle>
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className={`${priorityConfig[enquiryData.priority].color} border px-3 py-1 font-medium`}>
                        {priorityConfig[enquiryData.priority].label}
                      </Badge>
                      <Badge className="bg-blue-50 hidden text-blue-700 border-blue-200 border px-2 py-1 text-xs">
                        {enquiryData.propertyType}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>Posted: {getTimeAgo(enquiryData.createdAt)}</span>
                    </div>
                    <div className="text-xl font-bold text-[#B80D2D]">{enquiryData.budget}</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Project Description */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#B80D2D]" />
                  Project Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{enquiryData.description}</p>
              </CardContent>
            </Card>

            {/* Attachments */}
            {enquiryData.attachments.length > 0 && (
              <Card className="border-0 hidden shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Paperclip className="h-5 w-5 mr-2 text-[#B80D2D]" />
                    Attachments ({enquiryData.attachments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {enquiryData.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getFileIcon(attachment.fileType)}</span>
                          <div>
                            <p className="font-medium text-gray-900">{attachment.filename}</p>
                            <p className="text-sm text-gray-500">{attachment.fileSize}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-3 gap-3 flex justify-center flex-wrap lg:flex-nowrap items-center">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open(`tel:${enquiryData.phone}`)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-[#B80D2D] text-[#B80D2D] hover:bg-[#f8e7ea] hover:text-[#B80D2D] bg-transparent"
                  onClick={() => window.open(`mailto:${enquiryData.email}`)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-[#B80D2D] bg-[#B80D2D] text-white hover:text-white hover:bg-[#930a24]"
                  onClick={() => setModalOpen(true)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Quotation
                </Button>
              </CardContent>
            </Card>

            {/* Quote Form */}
            <Card className="border-0 shadow-lg bg-white hidden">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-[#B80D2D]" />
                  Submit Your Quote
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitQuote} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Quote Price *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="price"
                          value={quoteData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          placeholder="2,500"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline *</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="timeline"
                          value={quoteData.timeline}
                          onChange={(e) => handleInputChange("timeline", e.target.value)}
                          placeholder="5-7 business days"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Work Description *</Label>
                    <Textarea
                      id="description"
                      value={quoteData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe the work you'll perform, your approach, and what's included..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="materials">Materials & Equipment</Label>
                    <Textarea
                      id="materials"
                      value={quoteData.materials}
                      onChange={(e) => handleInputChange("materials", e.target.value)}
                      placeholder="List materials and equipment you'll provide..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="warranty">Warranty Information</Label>
                    <Input
                      id="warranty"
                      value={quoteData.warranty}
                      onChange={(e) => handleInputChange("warranty", e.target.value)}
                      placeholder="e.g., 5-year warranty on materials, 2-year on labor"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      value={quoteData.additionalNotes}
                      onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                      placeholder="Any additional information, terms, or conditions..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] hover:from-[#9A0B26] hover:to-[#7A0920] text-white"
                  >
                    {isSubmitting ? "Sending Quote..." : "Send Quote to Customer"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-[#B80D2D]" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <User className="h-4 w-4 text-[#B80D2D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{enquiryData.customerName}</p>
                    <p className="text-sm text-gray-500">Customer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <Mail className="h-4 w-4 text-[#B80D2D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{enquiryData.email}</p>
                    <p className="text-sm text-gray-500">Email Address</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <Phone className="h-4 w-4 text-[#B80D2D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{enquiryData.phone}</p>
                    <p className="text-sm text-gray-500">Phone Number</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <MapPin className="h-4 w-4 text-[#B80D2D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{enquiryData.location}</p>
                    <p className="text-sm text-gray-500">Location</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card className="border-0 shadow-lg bg-white hidden">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#B80D2D]" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget Range:</span>
                  <span className="font-medium text-[#B80D2D]">{enquiryData.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium">{enquiryData.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timeline:</span>
                  <span className="font-medium">{enquiryData.urgency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Preferred Contact:</span>
                  <span className="font-medium">{enquiryData.preferredContact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="font-medium">{formatDate(enquiryData.createdAt)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Competition */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Users className="h-5 w-5 mr-2" />
                  Competition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-700 mb-2">{enquiryData.responses}</div>
                  <p className="text-blue-600 mb-4">Other vendor{enquiryData.responses > 1 ? "s" : ""} interested</p>
                  <div className="bg-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800 font-medium">
                      {enquiryData.hasResponded
                        ? "You've already submitted a quote"
                        : "Be the first to respond for better chances!"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white hidden">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open(`tel:${enquiryData.phone}`)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white bg-transparent"
                  onClick={() => window.open(`mailto:${enquiryData.email}`)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quote form as Modal */}
          <QuoteModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

        </div>
      </div>
    </div>
  )
}
