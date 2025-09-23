"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
    Building2,
    User,
    Mail,
    Phone,
    Edit3,
    Save,
    X,
    Camera,
    Star,
    ArrowLeft,
    CheckCircle,
    Settings,
    Info,
    Shield,
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
    "Kitchen Remodeling",
    "Bathroom Renovation",
    "Concrete Work",
    "Insulation Services",
    "Windows & Doors",
    "Siding Installation",
    "Drywall Services",
    "Tile Installation",
    "Demolition Services",
    "General Contracting",
]

const experienceOptions = ["1-2 years", "3-5 years", "6-10 years", "11-15 years", "16-20 years", "20+ years"]

const businessTypeOptions = [
    { value: "sole_proprietorship", label: "Sole Proprietorship" },
    { value: "partnership", label: "Partnership" },
    { value: "llc", label: "LLC" },
    { value: "corporation", label: "Corporation" },
]

// Mock vendor data
const initialVendorData = {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@eliteroofing.com",
    phone: "+1 (555) 123-4567",
    profileImage: null,
    businessName: "Elite Roofing Co.",
    businessType: "llc",
    licenseNumber: "LIC-2024-001234",
    insuranceNumber: "INS-789456123",
    experience: "11-15 years",
    description:
        "Elite Roofing Co. has been serving the community for over 12 years with professional roofing services. We specialize in residential and commercial roofing, repairs, and maintenance. Our team is fully licensed, insured, and committed to delivering quality workmanship with excellent customer service.",
    address: "123 Construction Ave",
    city: "Downtown",
    state: "CA",
    zipCode: "90210",
    services: ["Roofing Services", "Siding Installation", "Windows & Doors"],
    foundedYear: "2012",
    employeeCount: "5-10",
    serviceRadius: "25 miles",
    workingHours: "Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 4:00 PM",
    certifications: [
        { name: "Licensed General Contractor", issuer: "State of California", year: "2012" },
        { name: "OSHA Safety Certified", issuer: "OSHA", year: "2023" },
        { name: "Roofing Contractor License", issuer: "State Board", year: "2012" },
    ],
    portfolioImages: [],
    accountStatus: "active",
    subscriptionPlan: "Professional",
    memberSince: "2024-01-01",
    rating: 4.8,
    totalJobs: 127,
    responseRate: 95,
}

export default function VendorProfilePage() {
    const [vendorData, setVendorData] = useState(initialVendorData)
    const [isEditing, setIsEditing] = useState(false)
    const [editedData, setEditedData] = useState(initialVendorData)
    const [activeTab, setActiveTab] = useState("personal")
    const [isSaving, setIsSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState("")

    const handleInputChange = (field, value) => {
        setEditedData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleServiceToggle = (service) => {
        setEditedData((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service],
        }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        setTimeout(() => {
            setVendorData(editedData)
            setIsEditing(false)
            setIsSaving(false)
            setSaveMessage("Profile updated successfully!")
            setTimeout(() => setSaveMessage(""), 3000)
        }, 1000)
    }

    const handleCancel = () => {
        setEditedData(vendorData)
        setIsEditing(false)
    }

    const renderPersonalInfo = () => (
        <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <Avatar className="w-24 h-24">
                        <AvatarImage
                            src={vendorData.profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                        <AvatarFallback>
                            {vendorData.firstName[0]}
                            {vendorData.lastName[0]}
                        </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                        <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-[#B80D2D] hover:bg-[#9A0B26]"
                        >
                            <Camera className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        {vendorData.firstName} {vendorData.lastName}
                    </h3>
                    <p className="text-gray-600">{vendorData.businessName}</p>
                    <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{vendorData.rating}</span>
                        </div>
                        <Badge className="bg-green-50 text-green-700 border-green-200">
                            {vendorData.accountStatus === "active" ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Personal Details */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                        id="firstName"
                        value={isEditing ? editedData.firstName : vendorData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                        id="lastName"
                        value={isEditing ? editedData.lastName : vendorData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="email"
                            type="email"
                            value={isEditing ? editedData.email : vendorData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
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
                            value={isEditing ? editedData.phone : vendorData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    const renderBusinessInfo = () => (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                        id="businessName"
                        value={isEditing ? editedData.businessName : vendorData.businessName}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select
                        value={isEditing ? editedData.businessType : vendorData.businessType}
                        onValueChange={(value) => handleInputChange("businessType", value)}
                        disabled={!isEditing}
                    >
                        <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                            <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                            {businessTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="licenseNumber"
                            value={isEditing ? editedData.licenseNumber : vendorData.licenseNumber}
                            onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="insuranceNumber">Insurance Number</Label>
                    <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="insuranceNumber"
                            value={isEditing ? editedData.insuranceNumber : vendorData.insuranceNumber}
                            onChange={(e) => handleInputChange("insuranceNumber", e.target.value)}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select
                        value={isEditing ? editedData.experience : vendorData.experience}
                        onValueChange={(value) => handleInputChange("experience", value)}
                        disabled={!isEditing}
                    >
                        <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                            <SelectValue placeholder="Select experience" />
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
                    <Label htmlFor="foundedYear">Founded Year</Label>
                    <Input
                        id="foundedYear"
                        value={isEditing ? editedData.foundedYear : vendorData.foundedYear}
                        onChange={(e) => handleInputChange("foundedYear", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Business Description *</Label>
                <Textarea
                    id="description"
                    value={isEditing ? editedData.description : vendorData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className={!isEditing ? "bg-gray-50" : ""}
                />
            </div>
        </div>
    )

    const renderCertifications = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <Label>Business Address *</Label>
                <div className="space-y-4">
                    <Input
                        value={isEditing ? editedData.address : vendorData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Street address"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                        <Input
                            value={isEditing ? editedData.city : vendorData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            placeholder="City"
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                        />
                        <Input
                            value={isEditing ? editedData.state : vendorData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            placeholder="State"
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                        />
                        <Input
                            value={isEditing ? editedData.zipCode : vendorData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            placeholder="ZIP Code"
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    const renderServices = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Services You Offer</h3>
                <p className="text-gray-600">Select all services that your business provides to customers</p>
            </div>

            {!isEditing && (
                <div className="mb-6">
                    <Label className="text-base font-medium">Current Services:</Label>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {vendorData.services.map((service) => (
                            <Badge key={service} className="bg-[#B80D2D] text-white px-3 py-1">
                                {service}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceOptions.map((service) => {
                    const isSelected = isEditing ? editedData.services.includes(service) : vendorData.services.includes(service)
                    return (
                        <div
                            key={service}
                            className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors ${isSelected ? "bg-[#B80D2D]/5 border-[#B80D2D]" : "hover:bg-gray-50 border-gray-200"
                                } ${!isEditing ? "opacity-60" : "hover:bg-gray-50"}`}
                        >
                            <Checkbox
                                id={service}
                                checked={isSelected}
                                onCheckedChange={() => isEditing && handleServiceToggle(service)}
                                disabled={!isEditing}
                                className="data-[state=checked]:bg-[#B80D2D] data-[state=checked]:border-[#B80D2D]"
                            />
                            <Label htmlFor={service} className={`flex-1 ${isEditing ? "cursor-pointer" : "cursor-default"}`}>
                                {service}
                            </Label>
                        </div>
                    )
                })}
            </div>

            {isEditing && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Selected Services:</h4>
                    <div className="flex flex-wrap gap-2">
                        {editedData.services.map((service) => (
                            <Badge key={service} className="bg-blue-100 text-blue-800 px-3 py-1">
                                {service}
                            </Badge>
                        ))}
                    </div>
                    {editedData.services.length === 0 && <p className="text-blue-600 text-sm">No services selected</p>}
                </div>
            )}
        </div>
    )

    const tabs = [
        { id: "personal", label: "Personal Info", icon: User },
        { id: "business", label: "Business Info", icon: Info },
        { id: "businessAddress", label: "Business Address", icon: Building2 },
        { id: "services", label: "Services", icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-32">
            {/* Header */}

            {/* Action Bar */}
            {isEditing && (
                <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 flex justify-end gap-2 z-50">
                    {saveMessage && (
                        <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-lg mr-auto">
                            <CheckCircle className="h-4 w-4 text-green-300" />
                            <span className="text-sm text-green-700">{saveMessage}</span>
                        </div>
                    )}
                    <Button onClick={handleCancel} variant="outline">
                        <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-[#B80D2D] text-white">
                        {isSaving ? "Saving..." : <> <Save className="h-4 w-4 mr-2" /> Save Changes</>}
                    </Button>
                </div>
            )}

            <div className="container mx-auto px-4 max-w-7xl py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <Card className="border-0 shadow-lg bg-white sticky top-8">
                            <CardContent className="p-6">
                                <nav className="space-y-2">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                                    ? "bg-[#B80D2D] text-white"
                                                    : "text-gray-600 hover:bg-gray-100"
                                                    }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span className="font-medium">{tab.label}</span>
                                            </button>
                                        )
                                    })}
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Card className="border-0 shadow-lg bg-white">
                            <CardHeader className="flex flex-row items-center justify-between px-8 py-4 w-full">
                                {/* Left: Title */}
                                <CardTitle className="text-lg font-bold text-gray-900">
                                    Vendor Profile
                                </CardTitle>

                                {/* Right: Edit Button */}
                                {!isEditing && (
                                    <Button
                                        size="sm"
                                        className="bg-[#B80D2D] text-white hover:bg-[#9A0B26]"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Edit3 className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                )}
                            </CardHeader>


                            <CardContent className="p-8">
                                {activeTab === "personal" && renderPersonalInfo()}
                                {activeTab === "business" && renderBusinessInfo()}
                                {activeTab === "businessAddress" && renderCertifications()}
                                {activeTab === "services" && renderServices()}
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    )
}
