"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Plus,
  Search,
  Filter,
  Calendar,
  Phone,
  Mail,
  User,
  LogOut,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { NewEnquiryDialog } from "@/components/new-enquiry-dialog"
import { Label } from "@/components/ui/label"

// Mock data for services and vendors
const servicesData = [
  {
    id: 1,
    name: "Roofing Services",
    category: "Exterior",
    subcategory: "Roofing",
    description: "Professional roofing installation and repair",
    vendors: [
      {
        id: 1,
        name: "Elite Roofing Co.",
        rating: 4.8,
        reviews: 156,
        location: "Downtown",
        phone: "(555) 123-4567",
        email: "info@eliteroofing.com",
        services: ["Shingle Installation", "Roof Repair", "Gutter Installation"],
        experience: "15+ years",
      },
      {
        id: 2,
        name: "Premium Roof Solutions",
        rating: 4.6,
        reviews: 89,
        location: "Midtown",
        phone: "(555) 234-5678",
        email: "contact@premiumroof.com",
        services: ["Metal Roofing", "Tile Installation", "Roof Inspection"],
        experience: "12+ years",
      },
    ],
  },
  {
    id: 2,
    name: "Ceiling Installation",
    category: "Interior",
    subcategory: "Ceiling",
    description: "Ceiling design, installation and repair services",
    vendors: [
      {
        id: 3,
        name: "Modern Ceiling Designs",
        rating: 4.9,
        reviews: 203,
        location: "Uptown",
        phone: "(555) 345-6789",
        email: "hello@modernceiling.com",
        services: ["Drop Ceiling", "Coffered Ceiling", "Acoustic Ceiling"],
        experience: "20+ years",
      },
    ],
  },
  {
    id: 3,
    name: "Flooring Services",
    category: "Interior",
    subcategory: "Flooring",
    description: "Complete flooring solutions for residential and commercial",
    vendors: [
      {
        id: 4,
        name: "FloorMaster Pro",
        rating: 4.7,
        reviews: 134,
        location: "Westside",
        phone: "(555) 456-7890",
        email: "info@floormasterpro.com",
        services: ["Hardwood Installation", "Tile Flooring", "Carpet Installation"],
        experience: "18+ years",
      },
      {
        id: 5,
        name: "Luxury Floors Inc.",
        rating: 4.5,
        reviews: 67,
        location: "Eastside",
        phone: "(555) 567-8901",
        email: "sales@luxuryfloors.com",
        services: ["Laminate Flooring", "Vinyl Installation", "Floor Refinishing"],
        experience: "10+ years",
      },
    ],
  },
  {
    id: 4,
    name: "Electrical Services",
    category: "Utilities",
    subcategory: "Electrical",
    description: "Licensed electrical installation and maintenance",
    vendors: [
      {
        id: 6,
        name: "PowerTech Electrical",
        rating: 4.8,
        reviews: 178,
        location: "Central",
        phone: "(555) 678-9012",
        email: "service@powertech.com",
        services: ["Wiring Installation", "Panel Upgrades", "Lighting Systems"],
        experience: "25+ years",
      },
    ],
  },
  {
    id: 5,
    name: "Plumbing Services",
    category: "Utilities",
    subcategory: "Plumbing",
    description: "Professional plumbing installation and repair",
    vendors: [
      {
        id: 7,
        name: "AquaFlow Plumbing",
        rating: 4.6,
        reviews: 145,
        location: "Southside",
        phone: "(555) 789-0123",
        email: "info@aquaflow.com",
        services: ["Pipe Installation", "Fixture Repair", "Drain Cleaning"],
        experience: "16+ years",
      },
    ],
  },
  {
    id: 6,
    name: "HVAC Services",
    category: "Utilities",
    subcategory: "HVAC",
    description: "Heating, ventilation, and air conditioning services",
    vendors: [
      {
        id: 8,
        name: "Climate Control Experts",
        rating: 4.9,
        reviews: 234,
        location: "Northside",
        phone: "(555) 890-1234",
        email: "contact@climatecontrol.com",
        services: ["AC Installation", "Heating Systems", "Duct Cleaning"],
        experience: "22+ years",
      },
    ],
  },
]

// Mock data for enquiries with proper schema structure
const enquiriesData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    service: "Roofing Services",
    description: "Need roof repair for residential property. Some shingles are damaged after recent storm.",
    status: "completed",
    priority: "high",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
    completedAt: "2024-01-20T14:45:00Z",
    attachments: [
      {
        id: 1,
        filename: "roof_damage.jpg",
        fileSize: "2.3 MB",
        fileType: "image/jpeg",
      },
    ],
    assignedVendor: "Elite Roofing Co.",
    estimatedCost: "$2,500",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 234-5678",
    service: "Flooring Services",
    description: "Looking for hardwood flooring installation in living room and dining area. Approximately 800 sq ft.",
    status: "pending",
    priority: "medium",
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-18T09:15:00Z",
    completedAt: null,
    attachments: [
      {
        id: 2,
        filename: "floor_plan.pdf",
        fileSize: "1.8 MB",
        fileType: "application/pdf",
      },
      {
        id: 3,
        filename: "room_photo.jpg",
        fileSize: "3.1 MB",
        fileType: "image/jpeg",
      },
    ],
    assignedVendor: null,
    estimatedCost: null,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1 (555) 345-6789",
    service: "Electrical Services",
    description: "Need electrical panel upgrade and additional outlets installation in basement workshop.",
    status: "in_progress",
    priority: "high",
    createdAt: "2024-01-20T14:20:00Z",
    updatedAt: "2024-01-22T11:30:00Z",
    completedAt: null,
    attachments: [],
    assignedVendor: "PowerTech Electrical",
    estimatedCost: "$1,800",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 456-7890",
    service: "Plumbing Services",
    description:
      "Kitchen sink replacement and dishwasher installation required. Existing plumbing needs minor modifications.",
    status: "pending",
    priority: "low",
    createdAt: "2024-01-22T16:45:00Z",
    updatedAt: "2024-01-22T16:45:00Z",
    completedAt: null,
    attachments: [
      {
        id: 4,
        filename: "kitchen_layout.jpg",
        fileSize: "2.7 MB",
        fileType: "image/jpeg",
      },
    ],
    assignedVendor: null,
    estimatedCost: null,
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "r.wilson@email.com",
    phone: "+1 (555) 567-8901",
    service: "HVAC Services",
    description: "Central air conditioning system installation for 2-story house. Need energy-efficient solution.",
    status: "completed",
    priority: "medium",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-25T17:30:00Z",
    completedAt: "2024-01-25T17:30:00Z",
    attachments: [
      {
        id: 5,
        filename: "house_blueprint.pdf",
        fileSize: "4.2 MB",
        fileType: "application/pdf",
      },
    ],
    assignedVendor: "Climate Control Experts",
    estimatedCost: "$4,200",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
}

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-orange-100 text-orange-800",
  high: "bg-red-100 text-red-800",
}

const categories = ["All", "Exterior", "Interior", "Utilities"]
const subcategories = {
  All: ["All"],
  Exterior: ["All", "Roofing", "Siding", "Windows"],
  Interior: ["All", "Ceiling", "Flooring", "Walls"],
  Utilities: ["All", "Electrical", "Plumbing", "HVAC"],
}

const StatusOptions = [
  "Completed",
  "Pending Approval"
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewEnquiryOpen, setIsNewEnquiryOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSubcategory, setSelectedSubcategory] = useState("All")
  const [selectedService, setSelectedService] = useState(null)
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [statusOfEnquiry, setStatusOfEnquiry] = useState("")

  // Calculate statistics
  const totalEnquiries = enquiriesData.length
  const completedEnquiries = enquiriesData.filter((e) => e.status === "completed").length
  const pendingEnquiries = enquiriesData.filter((e) => e.status === "pending").length
  const inProgressEnquiries = enquiriesData.filter((e) => e.status === "in_progress").length

  // Filter services
  const filteredServices = servicesData.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    const matchesSubcategory = selectedSubcategory === "All" || service.subcategory === selectedSubcategory

    return matchesSearch && matchesCategory && matchesSubcategory
  })

  // Filter enquiries
  const filteredEnquiries = enquiriesData.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleNewEnquiry = (enquiryData) => {
    // This would typically make an API call to create the enquiry
    console.log("New enquiry created:", enquiryData)
    // Add to local state or refetch data
    setIsNewEnquiryOpen(false)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSelectedSubcategory("All")
  }

  const handleServiceClick = (service) => {
    setSelectedService(service)
    setSelectedVendor(null)
  }

  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor)
  }

  const handleBackToServices = () => {
    setSelectedService(null)
    setSelectedVendor(null)
  }

  const handleBackToVendors = () => {
    setSelectedVendor(null)
  }

  const setClearForm = () => {
    setSearchTerm("");
    setStatusFilter("all");
  }

  const handleStatusOfEnquiry = (value) => {
    setStatusOfEnquiry(value)
  }

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Enquiry Management</h1>
            <p className="text-gray-600 mt-2">Manage and track all construction service enquiries</p>
          </div>
          <Button onClick={() => setIsNewEnquiryOpen(true)} className="bg-[#B80D2D] hover:bg-[#9A0B26] text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Enquiry
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-[#B80D2D]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEnquiries}</div>
              <p className="text-xs text-muted-foreground">All time enquiries</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed Enquiries</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedEnquiries}</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500 hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingEnquiries}</div>
              <p className="text-xs text-muted-foreground">Awaiting assignment</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Enquiries</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{inProgressEnquiries}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search enquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white bg-transparent"
              onClick={setClearForm}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filter
            </Button>
          </div>
        </div>

        {/* Enquiries List */}
        <div className="space-y-4">
          {filteredEnquiries.map((enquiry) => (
            <Card key={enquiry.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{enquiry.service}</CardTitle>
                      <Badge className={`${statusColors[enquiry.status]} text-xs`}>
                        {enquiry.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Badge className={`${priorityColors[enquiry.priority]} text-xs`}>
                        {enquiry.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      <strong>Service:</strong> {enquiry.service}
                    </CardDescription>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center space-x-1 mb-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(enquiry.createdAt)}</span>
                    </div>
                    {enquiry.estimatedCost && (
                      <div className="font-semibold text-[#B80D2D]">{enquiry.estimatedCost}</div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">{enquiry.description}</p>

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{enquiry.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{enquiry.phone}</span>
                      </div>
                    </div>

                    {enquiry.attachments.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-700 mb-1">Attachments:</p>
                        <div className="flex flex-wrap gap-1">
                          {enquiry.attachments.map((attachment) => (
                            <Badge key={attachment.id} variant="outline" className="text-xs">
                              {attachment.filename} ({attachment.fileSize})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 grid-cols-1">
                    <div className="space-y-2">
                      {enquiry.assignedVendor && (
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Assigned Vendor: </span>
                          <span className="text-[#B80D2D]">{enquiry.assignedVendor}</span>
                        </div>
                      )}

                      {enquiry.completedAt && (
                        <div className="text-sm text-green-600">
                          <span className="font-medium">Completed: </span>
                          <span>{formatDate(enquiry.completedAt)}</span>
                        </div>
                      )}

                      <div className="flex space-x-2 mt-3 hidden">
                        <Button size="sm" variant="outline" className="bg-transparent">
                          View Details
                        </Button>
                        {enquiry.status === "pending" && (
                          <Button size="sm" className="bg-[#B80D2D] hover:bg-[#9A0B26] text-white">
                            Assign Vendor
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-64">
                      <Label htmlFor="service">Service Status:</Label>
                      <Select value={statusOfEnquiry} onValueChange={(value) => handleStatusOfEnquiry(value)} >
                        <SelectTrigger>
                          <SelectValue placeholder="Status of Enquiry" />
                        </SelectTrigger>
                        <SelectContent>
                          {StatusOptions.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* New Enquiry Dialog */}
      <NewEnquiryDialog
        isOpen={isNewEnquiryOpen}
        onClose={() => setIsNewEnquiryOpen(false)}
        onSubmit={handleNewEnquiry}
      />
    </div>
  )
}
