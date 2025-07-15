"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Upload, X, FileText, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
]

export function NewEnquiryDialog({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        priority: "medium",
        description: "",
        attachments: [],
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const { toast } = useToast();
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = (field, value) => {
        switch (field) {
            case "name":
                if (!value.trim()) return "Full Name is required";
                if (!/^[A-Za-z]{2,}$/.test(value.trim())) return "Full Name must be at least 2 characters and contain only alphabets (A-Z, a-z).";
                break;
            case "email":
                if (!value.trim()) return "Email is required";
                if (!/^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,})$/.test(value.trim())) return "Email is invalid";
                break;
            case "phone":
                if (!value.trim()) return "Phone Number is required";
                if (!/^\d{8,12}$/.test(value.trim())) return "Phone Number must be only numbers and between 8 to 12 digits.";
                break;
            case "service":
                if (!value.trim()) return "Service is required. Please select the required service.";
                break;
            case "description":
                if (!value.trim()) return "Description is required";
                if (value.trim().length < 50) return "Description must be at least 50 characters long.";
                break;
            default:
                return null;
        }
        return null;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: validateField(field, value),
        }));
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({
            ...prev,
            [field]: true,
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: validateField(field, formData[field]),
        }));
    };

    // Update validateForm to use errors for submit
    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        setTouched(Object.keys(formData).reduce((acc, field) => ({ ...acc, [field]: true }), {}));
        return Object.keys(newErrors).length > 0 ? Object.values(newErrors)[0] : null;
    };

    const handleFileUpload = (files) => {
        const newAttachments = Array.from(files).map((file) => ({
            id: Date.now() + Math.random(),
            file: file,
            filename: file.name,
            fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB",
            fileType: file.type,
        }))

        setFormData((prev) => ({
            ...prev,
            attachments: [...prev.attachments, ...newAttachments],
        }))
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files)
        }
    }

    const removeAttachment = (attachmentId) => {
        setFormData((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((att) => att.id !== attachmentId),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            toast({
                title: "Form Error",
                description: error,
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true)

        // Create enquiry object with proper schema structure
        const enquiryData = {
            id: Date.now(), // In real app, this would be generated by backend
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            description: formData.description,
            status: "pending",
            priority: formData.priority,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completedAt: null,
            attachments: formData.attachments.map((att) => ({
                id: att.id,
                filename: att.filename,
                fileSize: att.fileSize,
                fileType: att.fileType,
            })),
            assignedVendor: null,
            estimatedCost: null,
        }

        // Simulate API call
        setTimeout(() => {
            // Simulate random failure for demonstration
            const isSuccess = Math.random() > 0.2;
            if (isSuccess) {
                onSubmit(enquiryData);
                toast({
                    title: "✅ Enquiry Created",
                    description: "Your enquiry has been submitted successfully.",
                    variant: "success",
                });
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    service: "",
                    priority: "medium",
                    description: "",
                    attachments: [],
                });
                onClose();
            } else {
                toast({
                    title: "Submission Failed",
                    description: "There was an error submitting your enquiry. Please try again.",
                    variant: "destructive",
                });
            }
            setIsSubmitting(false);
        }, 1000);
    }

    const getFileIcon = (fileType) => {
        if (fileType.startsWith("image/")) {
            return <ImageIcon className="h-4 w-4" />
        }
        return <FileText className="h-4 w-4" />
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Enquiry</DialogTitle>
                    <DialogDescription>Fill in the details below to create a new construction service enquiry.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                onBlur={() => handleBlur("name")}
                                placeholder="Enter your full name"
                                required
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {touched.name && errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                onBlur={() => handleBlur("email")}
                                placeholder="Enter your email"
                                required
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {touched.email && errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                onBlur={() => handleBlur("phone")}
                                placeholder="+1 (555) 123-4567"
                                required
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {touched.phone && errors.phone && (
                                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority Level</Label>
                            <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    {priorityOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Service Information */}
                    <div className="space-y-2">
                        <Label htmlFor="service">Service Required *</Label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                                {serviceOptions.map((service) => (
                                    <SelectItem key={service} value={service}>
                                        {service}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {touched.service && errors.service && (
                            <p className="text-red-500 text-xs mt-1">{errors.service}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            onBlur={() => handleBlur("description")}
                            placeholder="Please provide detailed information about your requirements..."
                            rows={4}
                            required
                            className={errors.description ? "border-red-500" : ""}
                        />
                        {touched.description && errors.description && (
                            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                        )}
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                        <Label>Attachments (Optional)</Label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive ? "border-[#B80D2D] bg-red-50" : "border-gray-300 hover:border-gray-400"
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">
                                Drag and drop files here, or{" "}
                                <label className="text-[#B80D2D] cursor-pointer hover:underline">
                                    browse
                                    <input
                                        type="file"
                                        multiple
                                        className="hidden"
                                        accept="image/*,.pdf,.doc,.docx"
                                        onChange={(e) => handleFileUpload(e.target.files)}
                                    />
                                </label>
                            </p>
                            <p className="text-xs text-gray-500">Supported formats: Images, PDF, DOC, DOCX (Max 10MB each)</p>
                        </div>

                        {/* Attachment List */}
                        {formData.attachments.length > 0 && (
                            <div className="space-y-2 mt-4">
                                <Label>Uploaded Files:</Label>
                                <div className="space-y-2">
                                    {formData.attachments.map((attachment) => (
                                        <div key={attachment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                {getFileIcon(attachment.fileType)}
                                                <div>
                                                    <p className="text-sm font-medium">{attachment.filename}</p>
                                                    <p className="text-xs text-gray-500">{attachment.fileSize}</p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeAttachment(attachment.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="bg-transparent"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-[#B80D2D] hover:bg-[#9A0B26] text-white">
                            {isSubmitting ? "Creating..." : "Create Enquiry"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
