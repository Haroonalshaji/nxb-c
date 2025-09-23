"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, FileText, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { NewEnquiryDialog } from "@/components/new-enquiry-dialog"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { checkAuth } from "@/lib/utils/authUtil"
import { attachmentFromCustomer, changeCustomerEnquiryStatus, dashboardEnquiryStatus, fetchCustomerEnquiry, getAndSearchEnquiryFilters } from "@/lib/api/commonApi"
import { StatusUpdateModal } from "@/components/customerStatusUpdateModal"
import AttachmentsGrid from "@/components/imageAttachmentGrid"
import Link from "next/link"


const statusColors = {
  Open: "bg-yellow-100 text-yellow-800",
  Closed: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
}

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-orange-100 text-orange-800",
  high: "bg-red-100 text-red-800",
}

const StatusOptions = ["Open", "Closed", "Completed"]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [isNewEnquiryOpen, setIsNewEnquiryOpen] = useState(false)
  const [enquiriesData, setEnquiriesData] = useState([])
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGridOpen, setIsGridOpen] = useState(false)
  const [attachmentsFromBkend, setAttachmentsFromBkend] = useState([])

  const openStatusModal = (enquiry, newStatus) => {
    setSelectedStatus(newStatus)
    setSelectedEnquiry(enquiry)
    setIsModalOpen(true)
  }

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
    console.log("New enquiry created:", enquiryData)
    setIsNewEnquiryOpen(false)
  }

  const setClearForm = () => {
    setSearchTerm("")
    setStatusFilter("");
    setPriorityFilter("")
  }

  const [totalEnquiries, setTotalEnquiries] = useState(0)
  const [closedEnquiries, setClosedEnquiries] = useState(0)
  const [completedEnquiries, setCompletedEnquiries] = useState(0)
  const [openEnquiries, setOpenEnquiries] = useState(0)

  const payload = {
    pageSize: 100,
    pageNo: 0,
    fromDate: "",
    toDate: "",
    sParam: searchTerm,
    status: statusFilter,
    priority: priorityFilter
  }

  const functionToListAllCustomerEnquiries = async () => {
    setLoading(true)
    try {
      const listAllCustEnq = await fetchCustomerEnquiry(payload);
      const RetData = listAllCustEnq.data;
      console.log(RetData);
      setEnquiriesData(RetData.result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0))
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages - 1))

  const handleStatusUpdate = async (notes) => {
    try {
      const payload = {
        enquiryGuid: selectedEnquiry.enquiryGuid,
        status: selectedStatus,
        statusNotes: notes,
      }
      const res = await changeCustomerEnquiryStatus(payload);
      // update state
      setEnquiriesData((prev) =>
        prev.map((e) =>
          e.enquiryGuid === selectedEnquiry.enquiryGuid
            ? { ...e, status: selectedStatus }
            : e
        )
      )
      getDashboardEnquiryStatus()
      toast({
        title: res.data.message,
        description: `Status changed to ${selectedStatus}`,
        variant: "success",
      })
    } catch (err) {
      console.error(err)
      toast({
        title: error.response.data.message,
        description: "Failed to update enquiry status",
        variant: "destructive",
      })
    }
  }

  const getDashboardEnquiryStatus = async () => {
    try {
      const dashboardStatuses = await dashboardEnquiryStatus();
      const ResponseDashStatus = dashboardStatuses.data;
      if (ResponseDashStatus.isSuccess) {
        ResponseDashStatus.result.map((item) => {
          setTotalEnquiries(item.totalEnquiries);
          setCompletedEnquiries(item.completedEnquiries);
          setOpenEnquiries(item.openEnquiries);
          setClosedEnquiries(item.closedEnquiries)
        })
      }
      // console.log(ResponseDashStatus)
    } catch (error) {
      console.error(error);
    }
  }

  const handleFetchAttachments = async (enqGuid) => {
    try {
      const getCustomerAttachment = await attachmentFromCustomer(enqGuid);
      console.log(getCustomerAttachment.data.result)
      setAttachmentsFromBkend(getCustomerAttachment.data.result)
      setIsGridOpen(true);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    checkAuth("client", router, toast);
    functionToListAllCustomerEnquiries();
    getDashboardEnquiryStatus();
  }, [router, searchTerm, priorityFilter, statusFilter]);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Enquiry Management</h1>
            <p className="text-gray-600 mt-2">Manage and track all construction service enquiries</p>
          </div>
          <Button onClick={() => setIsNewEnquiryOpen(true)} className="bg-[#B80D2D] hover:bg-[#9A0B26] text-white">
            New Enquiry
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <CardTitle className="text-sm font-medium">Completed Enquiries</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedEnquiries}</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Enquiries</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{openEnquiries}</div>
              <p className="text-xs text-muted-foreground">Awaiting assignment</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed Enquiries</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{closedEnquiries}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 grid md:grid-cols-4 gap-4">
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
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white"
            onClick={setClearForm}
          >
            Clear Filter
          </Button>
        </div>

        {/* Enquiries List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading enquiries...</div>
          ) : enquiriesData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No enquiries found</div>
          ) : (
            enquiriesData.map((enquiry, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-lg">{enquiry.serviceRequired}</CardTitle>
                        <Badge className={`${statusColors[enquiry.status]} hover:bg-green hover:text-red text-xs`}>
                          {enquiry.status ? enquiry.status.replace("_", " ").toUpperCase() : "N/A"}
                        </Badge>
                        <Badge className={`${priorityColors[enquiry.priorityLevel]} hover:bg-red hover:text-green text-xs`}>
                          {enquiry.priorityLevel ? enquiry.priorityLevel.toUpperCase() : "N/A"}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">{enquiry.description}</CardDescription>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center space-x-1 mb-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(enquiry.addedOn)}</span>
                      </div>
                      {enquiry.totalAmount && (
                        <div className="font-semibold text-[#B80D2D]">AED {enquiry.totalAmount}</div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    {/* Status Selection */}
                    <div className="flex flex-col gap-2 w-64">
                      <Label htmlFor="service">Service Status:</Label>
                      <Select
                        value={enquiry.status}
                        onValueChange={(value) => openStatusModal(enquiry, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Status of Enquiry" />
                        </SelectTrigger>
                        <SelectContent>
                          {StatusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-4">
                      {/* View Enquiry */}
                      <Link href={`/dashboard/enquiries/${enquiry.enquiryGuid}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-blue-500 text-white"
                        >
                          View Enquiry
                        </Button>
                      </Link>
                      {/* Attachments */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-[#B80D2D] text-white"
                        onClick={() => handleFetchAttachments(enquiry.enquiryGuid)}
                      >
                        Attachments ({enquiry.attachmentCount || 0})
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          {enquiriesData.length > 50 && (
            <div className="flex justify-center mt-6 space-x-4">
              <Button onClick={handlePrevPage} className="bg-white text-black shadow" disabled={page === 0}>
                Prev
              </Button>
              <span className="self-center">
                Page {page + 1} of {totalPages}
              </span>
              <Button onClick={handleNextPage} disabled={page + 1 >= totalPages} className="bg-white text-black shadow">
                Next
              </Button>
            </div>
          )}

        </div>
      </div>

      {/* New Enquiry Dialog */}
      <NewEnquiryDialog
        isOpen={isNewEnquiryOpen}
        onClose={() => setIsNewEnquiryOpen(false)}
        onSubmit={handleNewEnquiry}
      />

      <StatusUpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleStatusUpdate}
        status={selectedStatus}
      />

      {isGridOpen && (
        <AttachmentsGrid images={attachmentsFromBkend} onClose={() => setIsGridOpen(false)} />
      )}

    </div >
  )
}