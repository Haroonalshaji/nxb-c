"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Calendar, Phone, Mail, User, LogOut, FileText, Clock, CheckCircle, Eye, MessageSquare, Star, TrendingUp, Users, Paperclip, DollarSign, Settings, Bell, } from "lucide-react";
import { checkAuth } from '@/lib/utils/authUtil';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { businessStatus } from '@/lib/api/commonApi'

// Mock data for customer enquiries
const customerEnquiries = [
  {
    id: 1,
    customerName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    service: "Roofing Services",
    description:
      "Need roof repair for residential property. Some shingles are damaged after recent storm. Looking for experienced contractor with insurance coverage.",
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
    ],
    isOpen: true,
    responses: 3,
    hasResponded: false,
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 234-5678",
    service: "Flooring Services",
    description:
      "Looking for hardwood flooring installation in living room and dining area. Approximately 800 sq ft. Prefer oak or maple wood.",
    priority: "medium",
    createdAt: "2024-01-18T09:15:00Z",
    location: "Midtown",
    budget: "$5,000 - $8,000",
    attachments: [
      {
        id: 2,
        filename: "floor_plan.pdf",
        fileSize: "1.8 MB",
        fileType: "application/pdf",
      },
    ],
    isOpen: true,
    responses: 5,
    hasResponded: true,
  },
  {
    id: 3,
    customerName: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1 (555) 345-6789",
    service: "Electrical Services",
    description:
      "Need electrical panel upgrade and additional outlets installation in basement workshop. Current panel is 20 years old.",
    priority: "low",
    createdAt: "2024-01-20T14:20:00Z",
    location: "Westside",
    budget: "$1,500 - $2,500",
    attachments: [],
    isOpen: true,
    responses: 2,
    hasResponded: false,
  },
  {
    id: 4,
    customerName: "James Brown",
    email: "m.brown@email.com",
    phone: "+1 (555) 345-6789",
    service: "Roofing Services",
    description:
      "Need Roofing upgrade and additional outlets installation in basement workshop. Current panel is 20 years old.",
    priority: "high",
    createdAt: "2024-01-20T14:20:00Z",
    location: "Westside",
    budget: "$3,500 - $4,500",
    attachments: [],
    isOpen: true,
    responses: 2,
    hasResponded: false,
  },
]

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

export default function VendorDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showDashbaord, setShowDashboard] = useState(false)
  const router = useRouter();
  const [accessToken, setAcessToken] = useState("");
  const { toast } = useToast();
  // Calculate statistics
  const totalEnquiries = customerEnquiries.length
  const newEnquiries = customerEnquiries.filter((e) => !e.hasResponded).length
  const respondedEnquiries = customerEnquiries.filter((e) => e.hasResponded).length
  const totalResponses = customerEnquiries.reduce((sum, e) => sum + e.responses, 0)

  // Filter enquiries
  const filteredEnquiries = customerEnquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesService = serviceFilter === "all" || enquiry.service === serviceFilter
    const matchesPriority = priorityFilter === "all" || enquiry.priority === priorityFilter

    return matchesSearch && matchesService && matchesPriority && enquiry.isOpen
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

  useEffect(() => {
    // Temporarily disable checkAuth to prevent cookie deletion
    // TODO: Re-enable once token validation APIs are properly implemented
    checkAuth('vendor', router, toast);
    checkSessionInCookie();
    checkBusinessStatus();

  }, []);

  const checkBusinessStatus = async () => {
    try {
      const RetBusStatus = await businessStatus();
      console.log(RetBusStatus.data)
      var ResponseData = RetBusStatus.data;
      if (ResponseData.result.vendorAccessStatus === "AllOk") {
        setShowDashboard(true);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getCookie = (name) => {
    try {
      const { parseCookies } = require('nookies');
      const cookies = parseCookies();
      return cookies[name] || null;
    } catch {
      return null;
    }
  };

  const checkSessionInCookie = () => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    setAcessToken(accessToken);

    if (!accessToken || !refreshToken) {
      toast({
        title: "Session not found. Please login again.",
        variant: "destructive",
      });
      router.push('/vendor');
    } else {
      // console.log("Access Token:", accessToken);
      // console.log("Refresh Token:", refreshToken);
    }
  };



  const handleClearFilter = () => {
    setSearchTerm("");
    setServiceFilter("all");
    setPriorityFilter("all");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}

      {showDashbaord && (
        <div className="container mx-auto px-4 max-w-7xl py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Customer Enquiries</h1>
                  <p className="text-lg text-gray-600 mb-4">
                    Browse and respond to customer service requests in your area
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-[#B80D2D]" />
                      <span>Contact customers directly with your quotes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-[#B80D2D]" />
                      <span>Build your reputation with quality work</span>
                    </div>
                  </div>
                </div>
                <Link href="/vendor/quotes">
                  <Button className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] hover:from-[#9A0B26] hover:to-[#7A0920] text-white shadow-lg px-6 py-3 text-lg">
                    <DollarSign className="h-5 w-5 mr-2" />
                    My Quotes
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Available Enquiries</CardTitle>
                <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                  <FileText className="h-4 w-4 text-[#B80D2D]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{totalEnquiries}</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Active opportunities
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 hidden shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-700">New Opportunities</CardTitle>
                <div className="p-2 bg-amber-200 rounded-lg">
                  <Clock className="h-4 w-4 text-amber-700" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-700">{newEnquiries}</div>
                <p className="text-xs text-amber-600 flex items-center mt-1">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Awaiting your response
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Quotes Sent</CardTitle>
                <div className="p-2 bg-green-200 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-700" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700">{respondedEnquiries}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Star className="h-3 w-3 mr-1" />
                  This month
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 hidden shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Competition</CardTitle>
                <div className="p-2 bg-blue-200 rounded-lg">
                  <Users className="h-4 w-4 text-blue-700" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-700">{(totalResponses / totalEnquiries).toFixed(1)}</div>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Avg responses per enquiry
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search enquiries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-[#B80D2D] focus:ring-[#B80D2D]"
                    />
                  </div>

                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger className="border-gray-200 focus:border-[#B80D2D] focus:ring-[#B80D2D]">
                      <SelectValue placeholder="Filter by service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      <SelectItem value="Roofing Services">Roofing Services</SelectItem>
                      <SelectItem value="Flooring Services">Flooring Services</SelectItem>
                      <SelectItem value="Electrical Services">Electrical Services</SelectItem>
                      <SelectItem value="Plumbing Services">Plumbing Services</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="border-gray-200 focus:border-[#B80D2D] focus:ring-[#B80D2D]">
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    className="border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white bg-transparent"
                    onClick={handleClearFilter}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Clear Filter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enquiries List */}
          <div className="gap-4  grid grid-cols-2">
            {filteredEnquiries.map((enquiry) => (
              <Card
                key={enquiry.id}
                className="border-0 h-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden"
              >
                <div
                  className={`h-1 ${enquiry.priority === "high" ? "bg-red-500" : enquiry.priority === "medium" ? "bg-orange-500" : "bg-slate-500"}`}
                ></div>

                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{enquiry.service}</h3>
                        <Badge className={`${priorityConfig[enquiry.priority].color} border px-2 py-1 text-xs`}>
                          {priorityConfig[enquiry.priority].label}
                        </Badge>
                        {enquiry.hasResponded && (
                          <Badge className="bg-green-50 text-green-700 border-green-200 border px-2 py-1 text-xs">
                            Quote Sent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Customer: {enquiry.customerName} • {enquiry.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{getTimeAgo(enquiry.createdAt)}</span>
                      </div>
                      <div className="text-lg font-bold text-[#B80D2D]">{enquiry.budget}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Description and Details */}
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Project Description</h4>
                        <p className="text-gray-700 leading-relaxed">{enquiry.description}</p>
                      </div>

                      <div className="flex items-center gap-x-2 flex-wrap gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-[#B80D2D]" />
                          <span>{enquiry.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-[#B80D2D]" />
                          <span>{enquiry.phone}</span>
                        </div>
                        {enquiry.attachments.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <Paperclip className="h-4 w-4 text-[#B80D2D]" />
                            <span>
                              {enquiry.attachments.length} attachment{enquiry.attachments.length > 1 ? "s" : ""}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="space-y-4">
                      <div className="bg-blue-50 hidden rounded-lg p-4 border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Competition
                        </h4>
                        <p className="text-sm text-blue-700 mb-2">
                          {enquiry.responses} vendor{enquiry.responses > 1 ? "s" : ""} interested
                        </p>
                        <p className="text-xs text-blue-600">Posted: {formatDate(enquiry.createdAt)}</p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Link href={`/vendor/enquiry/${enquiry.id}`}>
                          <Button className="w-full bg-[#B80D2D] hover:bg-[#9A0B26] text-white">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details & Quote
                          </Button>
                        </Link>

                        {!enquiry.hasResponded && (
                          <Button
                            variant="outline"
                            className="w-full border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white bg-transparent"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Quick Quote
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEnquiries.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No enquiries found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || serviceFilter !== "all" || priorityFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "No new customer enquiries at the moment. Check back later for new opportunities!"}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {!showDashbaord && (
        <h1 className="text-center font-[600] text-[40px] min-h-screen flex items-center justify-center">Business Not Found or Payment Pending !!</h1>
      )}

    </div>
  )
}
