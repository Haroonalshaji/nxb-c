"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar"
import {
    User,
    Mail,
    Phone,
    Edit3,
    Save,
    X,
    Camera,
    MapPin,
    ArrowLeft,
    CheckCircle,
    Eye,
    EyeOff,
    Shield,
    Calendar,
    FileText,
    Settings,
    Bell,
    Lock,
    Home,
} from "lucide-react"

// Mock client data
const initialClientData = {
    // Personal Info
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    profileImage: null,
    dateOfBirth: "1985-06-15",

    // Address
    address: "456 Residential St",
    city: "Downtown",
    state: "CA",
    zipCode: "90210",
    country: "United States",

    // Additional Details
    occupation: "Software Engineer",
    company: "Tech Solutions Inc.",
    preferredContact: "email",

    // Account Info
    memberSince: "2024-01-01",
    accountStatus: "active",
    totalEnquiries: 5,
    completedProjects: 2,

    // Preferences
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
}

export default function ClientProfilePage() {
    const [clientData, setClientData] = useState(initialClientData)
    const [isEditing, setIsEditing] = useState(false)
    const [editedData, setEditedData] = useState(initialClientData)
    const [activeTab, setActiveTab] = useState("personal")
    const [isSaving, setIsSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState("")

    // Password change state
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    })
    const [isChangingPassword, setIsChangingPassword] = useState(false)

    const handleInputChange = (field, value) => {
        setEditedData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handlePasswordChange = (field, value) => {
        setPasswordData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }))
    }

    const handleSave = async () => {
        setIsSaving(true)

        // Simulate API call
        setTimeout(() => {
            setClientData(editedData)
            setIsEditing(false)
            setIsSaving(false)
            setSaveMessage("Profile updated successfully!")

            // Clear success message after 3 seconds
            setTimeout(() => setSaveMessage(""), 3000)
        }, 1000)
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords don't match!")
            return
        }

        if (passwordData.newPassword.length < 8) {
            alert("Password must be at least 8 characters long!")
            return
        }

        setIsChangingPassword(true)

        // Simulate API call
        setTimeout(() => {
            setIsChangingPassword(false)
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
            setSaveMessage("Password changed successfully!")
            setTimeout(() => setSaveMessage(""), 3000)
        }, 1000)
    }

    const handleCancel = () => {
        setEditedData(clientData)
        setIsEditing(false)
    }

    const renderPersonalInfo = () => (
        <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <Avatar className="w-24 h-24">
                        <AvatarContent>
                            {clientData.profileImage ? (
                                <img
                                    src={clientData.profileImage || "/placeholder.svg"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-[#B80D2D] flex items-center justify-center text-white text-2xl font-bold">
                                    {clientData.firstName[0]}
                                    {clientData.lastName[0]}
                                </div>
                            )}
                        </AvatarContent>
                        <AvatarFallback>
                            {clientData.firstName[0]}
                            {clientData.lastName[0]}
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
                        {clientData.firstName} {clientData.lastName}
                    </h3>
                    <p className="text-gray-600">{clientData.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                        <Badge className="bg-green-50 text-green-700 border-green-200">
                            {clientData.accountStatus === "active" ? "Active Member" : "Inactive"}
                        </Badge>
                        <span className="text-sm text-gray-500">Member since {new Date(clientData.memberSince).getFullYear()}</span>
                    </div>
                </div>
            </div>

            {/* Personal Details */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                        id="firstName"
                        value={isEditing ? editedData.firstName : clientData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                        id="lastName"
                        value={isEditing ? editedData.lastName : clientData.lastName}
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
                            value={isEditing ? editedData.email : clientData.email}
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
                            value={isEditing ? editedData.phone : clientData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="dateOfBirth"
                            type="date"
                            value={isEditing ? editedData.dateOfBirth : clientData.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                        id="occupation"
                        value={isEditing ? editedData.occupation : clientData.occupation}
                        onChange={(e) => handleInputChange("occupation", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                    id="company"
                    value={isEditing ? editedData.company : clientData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                />
            </div>
        </div>
    )

    const renderContactInfo = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
                <p className="text-gray-600">Manage your address and contact preferences</p>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
                <Label>Home Address</Label>
                <div className="space-y-4">
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            value={isEditing ? editedData.address : clientData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            placeholder="Street address"
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input
                            value={isEditing ? editedData.city : clientData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            placeholder="City"
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                        />
                        <Input
                            value={isEditing ? editedData.state : clientData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            placeholder="State"
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input
                            value={isEditing ? editedData.zipCode : clientData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            placeholder="ZIP Code"
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                        />
                        <Input
                            value={isEditing ? editedData.country : clientData.country}
                            onChange={(e) => handleInputChange("country", e.target.value)}
                            placeholder="Country"
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                        />
                    </div>
                </div>
            </div>

            {/* Contact Preferences */}
            <div className="space-y-4">
                <Label>Preferred Contact Method</Label>
                <div className="grid md:grid-cols-3 gap-4">
                    {["email", "phone", "sms"].map((method) => (
                        <div
                            key={method}
                            className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors ${(isEditing ? editedData.preferredContact : clientData.preferredContact) === method
                                ? "bg-[#B80D2D]/5 border-[#B80D2D]"
                                : "border-gray-200"
                                } ${!isEditing ? "opacity-60" : "hover:bg-gray-50 cursor-pointer"}`}
                            onClick={() => isEditing && handleInputChange("preferredContact", method)}
                        >
                            <input
                                type="radio"
                                name="preferredContact"
                                value={method}
                                checked={(isEditing ? editedData.preferredContact : clientData.preferredContact) === method}
                                onChange={(e) => handleInputChange("preferredContact", e.target.value)}
                                disabled={!isEditing}
                                className="text-[#B80D2D] focus:ring-[#B80D2D]"
                            />
                            <Label className={`flex-1 ${isEditing ? "cursor-pointer" : "cursor-default"} capitalize`}>
                                {method === "sms" ? "SMS" : method}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="space-y-4">
                <Label>Notification Preferences</Label>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <div>
                                <Label className="font-medium">Email Notifications</Label>
                                <p className="text-sm text-gray-500">Receive updates about your enquiries via email</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={isEditing ? editedData.emailNotifications : clientData.emailNotifications}
                            onChange={(e) => handleInputChange("emailNotifications", e.target.checked)}
                            disabled={!isEditing}
                            className="rounded border-gray-300 text-[#B80D2D] focus:ring-[#B80D2D]"
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Phone className="h-5 w-5 text-gray-400" />
                            <div>
                                <Label className="font-medium">SMS Notifications</Label>
                                <p className="text-sm text-gray-500">Receive urgent updates via text message</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={isEditing ? editedData.smsNotifications : clientData.smsNotifications}
                            onChange={(e) => handleInputChange("smsNotifications", e.target.checked)}
                            disabled={!isEditing}
                            className="rounded border-gray-300 text-[#B80D2D] focus:ring-[#B80D2D]"
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Bell className="h-5 w-5 text-gray-400" />
                            <div>
                                <Label className="font-medium">Marketing Emails</Label>
                                <p className="text-sm text-gray-500">Receive newsletters and promotional content</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={isEditing ? editedData.marketingEmails : clientData.marketingEmails}
                            onChange={(e) => handleInputChange("marketingEmails", e.target.checked)}
                            disabled={!isEditing}
                            className="rounded border-gray-300 text-[#B80D2D] focus:ring-[#B80D2D]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    const renderSecurity = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Settings</h3>
                <p className="text-gray-600">Manage your password and account security</p>
            </div>

            {/* Change Password Form */}
            <Card className="border-l-4 border-l-[#B80D2D]">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Lock className="h-5 w-5 mr-2 text-[#B80D2D]" />
                        Change Password
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password *</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    id="currentPassword"
                                    type={showPasswords.current ? "text" : "password"}
                                    value={passwordData.currentPassword}
                                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                                    className="pl-10 pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                                    onClick={() => togglePasswordVisibility("current")}
                                >
                                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password *</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    id="newPassword"
                                    type={showPasswords.new ? "text" : "password"}
                                    value={passwordData.newPassword}
                                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                                    className="pl-10 pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                                    onClick={() => togglePasswordVisibility("new")}
                                >
                                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    id="confirmPassword"
                                    type={showPasswords.confirm ? "text" : "password"}
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                                    className="pl-10 pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                                    onClick={() => togglePasswordVisibility("confirm")}
                                >
                                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isChangingPassword}
                            className="w-full bg-[#B80D2D] hover:bg-[#9A0B26] text-white"
                        >
                            {isChangingPassword ? "Changing Password..." : "Change Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Security Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-[#B80D2D]" />
                        Account Security
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Account Status:</span>
                        <Badge className="bg-green-50 text-green-700 border-green-200">Secure</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Two-Factor Authentication:</span>
                        <Badge className="bg-gray-50 text-gray-700 border-gray-200">Not Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Last Password Change:</span>
                        <span className="font-medium">Never</span>
                    </div>
                    <Separator />
                    <Button
                        variant="outline"
                        className="w-full border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white bg-transparent"
                    >
                        Enable Two-Factor Authentication
                    </Button>
                </CardContent>
            </Card>
        </div>
    )

    const renderAccountInfo = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Overview</h3>
                <p className="text-gray-600">Your account statistics and activity</p>
            </div>

            {/* Account Statistics */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-6 w-6 text-blue-700" />
                        </div>
                        <div className="text-3xl font-bold text-blue-700 mb-2">{clientData.totalEnquiries}</div>
                        <p className="text-blue-600">Total Enquiries</p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-6 w-6 text-green-700" />
                        </div>
                        <div className="text-3xl font-bold text-green-700 mb-2">{clientData.completedProjects}</div>
                        <p className="text-green-600">Completed Projects</p>
                    </CardContent>
                </Card>
            </div>

            {/* Account Details */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-[#B80D2D]" />
                        Account Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Member Since:</span>
                        <span className="font-medium">{new Date(clientData.memberSince).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Account Type:</span>
                        <Badge className="bg-[#B80D2D] text-white">Premium Customer</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Status:</span>
                        <Badge className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Last Login:</span>
                        <span className="font-medium">Today, 2:30 PM</span>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Link href="/dashboard">
                        <Button className="w-full bg-[#B80D2D] hover:bg-[#9A0B26] text-white">
                            <Home className="h-4 w-4 mr-2" />
                            Go to Dashboard
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button
                            variant="outline"
                            className="w-full border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white bg-transparent"
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            View My Enquiries
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )

    const tabs = [
        { id: "personal", label: "Personal Info", icon: User },
        { id: "contact", label: "Contact & Address", icon: MapPin },
        { id: "security", label: "Security", icon: Shield },
        { id: "account", label: "Account", icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className=" text-red shadow-xl">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" className="text-red hover:bg-white/10 p-2">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className="text-xl font-bold text-red">My Profile</span>
                                    <p className="text-sm text-red">Manage your account information</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            {saveMessage && (
                                <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-lg">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm text-green-100">{saveMessage}</span>
                                </div>
                            )}
                            {activeTab !== "security" && (
                                <>
                                    {!isEditing ? (
                                        <Button onClick={() => setIsEditing(true)} className="bg-white text-[#B80D2D] hover:bg-gray-100">
                                            <Edit3 className="h-4 w-4 mr-2" />
                                            Edit Profile
                                        </Button>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <Button
                                                onClick={handleCancel}
                                                variant="outline"
                                                className="border-red/30 text-red hover:bg-white hover:text-[#B80D2D] bg-transparent"
                                            >
                                                <X className="h-4 w-4 mr-2" />
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleSave}
                                                disabled={isSaving}
                                                className="bg-white text-[#B80D2D] hover:bg-gray-100"
                                            >
                                                {isSaving ? (
                                                    <>Saving...</>
                                                ) : (
                                                    <>
                                                        <Save className="h-4 w-4 mr-2" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

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
                                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id ? "bg-[#B80D2D] text-white" : "text-gray-600 hover:bg-gray-100"
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
                            <CardContent className="p-8">
                                {activeTab === "personal" && renderPersonalInfo()}
                                {activeTab === "contact" && renderContactInfo()}
                                {activeTab === "security" && renderSecurity()}
                                {activeTab === "account" && renderAccountInfo()}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
