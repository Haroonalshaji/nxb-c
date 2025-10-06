"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CircleDollarSign } from "lucide-react";
import { DollarSign, Clock, Send } from "lucide-react"
import { getVendorQuote, submitVendorQuoteForm, updateVendorQuoteForm } from "@/lib/api/commonApi"
import { useToast } from "@/hooks/use-toast"

export default function QuoteModal({ modalOpen, setModalOpen, enquiryGuid, hasResponded }) {
    const [quoteData, setQuoteData] = useState({
        price: "",
        timeline: "",
        description: "",
        materials: "",
        warranty: "",
        additionalNotes: "",
        attachment: "",
        quoteGuid: ""
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const { toast } = useToast();

    const handleInputChange = (field, value) => {
        setQuoteData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const payload = {
        enquiryGuid: enquiryGuid,
        quotePrice: quoteData?.price,
        timeLine: quoteData?.timeline,
        description: quoteData?.description,
        matAndEqup: quoteData?.materials,
        warrantyInfo: quoteData?.warranty,
        notes: quoteData?.additionalNotes
    }

    const handleQuoteMade = async () => {
        try {
            const getRespnseQuote = await getVendorQuote(enquiryGuid);
            const getRetData = getRespnseQuote.data.result;
            setQuoteData({
                price: getRetData.quotePrice,
                timeline: getRetData.timeLine,
                description: getRetData.description,
                materials: getRetData.matAndEqup,
                warranty: getRetData.warrantyInfo,
                additionalNotes: getRetData.notes,
                quoteGuid: getRetData.quoteGuid,
                attachment: getRetData.attachment
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmitQuote = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (hasResponded) {
            formUpdation();
        } else {
            formSubmission();
        }
    }

    const formSubmission = async () => {
        try {
            const formData = new FormData()
            formData.append("EnquiryGuid", enquiryGuid)
            formData.append("QuotePrice", quoteData.price)
            formData.append("TimeLine", quoteData.timeline)
            formData.append("Description", quoteData.description)
            formData.append("MatAndEqup", quoteData.materials || "")
            formData.append("WarrantyInfo", quoteData.warranty || "")
            formData.append("Notes", quoteData.additionalNotes || "")
            if (quoteData.attachment) {
                formData.append("Attachment", quoteData.attachment)
            }
            const submitQuoteForm = await submitVendorQuoteForm(formData);
            const reponseFromQuoteSubmission = submitQuoteForm.data;
            console.log(reponseFromQuoteSubmission)
            setIsSubmitting(false);
            toast({
                title: reponseFromQuoteSubmission.message,
                variant: "success"
            })
            setModalOpen(false)
        } catch (error) {
            setIsSubmitting(false);
            console.error(error);
            toast({
                title: error.response.data.message || "Quote Submisstion Failed",
                description: error.response.data.message ? "" : "Please try Again..!",
                variant: "destructive"
            })
            setModalOpen(false)
        }
    }

    const formUpdation = async () => {
        try {
            const formData = new FormData()
            formData.append("EnquiryGuid", enquiryGuid)
            formData.append("QuotePrice", quoteData.price)
            formData.append("TimeLine", quoteData.timeline)
            formData.append("QuoteGuid", quoteData.quoteGuid)
            formData.append("Description", quoteData.description)
            formData.append("MatAndEqup", quoteData.materials || "")
            formData.append("WarrantyInfo", quoteData.warranty || "")
            formData.append("Notes", quoteData.additionalNotes || "")
            if (quoteData.attachment) {
                formData.append("Attachment", quoteData.attachment)
            }
            const submitQuoteForm = await updateVendorQuoteForm(formData);
            const reponseFromQuoteSubmission = submitQuoteForm.data;
            console.log(reponseFromQuoteSubmission)
            setIsSubmitting(false);
            toast({
                title: reponseFromQuoteSubmission.message,
                variant: "success"
            })
            setModalOpen(false)
        } catch (error) {
            setIsSubmitting(false);
            console.error(error);
            toast({
                title: error.response.data.message || "Quote Updation Failed",
                description: error.response.data.message ? "" : "Please try Again..!",
                variant: "destructive"
            })
            setModalOpen(false)
        }
    }

    useEffect(() => {
        if (enquiryGuid && modalOpen) {
            handleQuoteMade();
        }
    }, [enquiryGuid, modalOpen]);


    return (
        <div>
            {/* Trigger Button */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                {/* Modal Content */}
                <DialogContent className="sm:max-w-xl w-full h-[95%] rounded overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle className="text-[#B80D2D]">Submit Your Quote</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmitQuote} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Quote Price *</Label>
                                <div className="relative">

                                    {/* <CircleDollarSign /> */}
                                    <small className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " >AED</small>

                                    {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /> */}
                                    <Input
                                        id="price"
                                        value={quoteData.price}
                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                        placeholder="2,500"
                                        className="pl-10"
                                        required
                                    // readOnly={hasResponded}
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
                                    // readOnly={hasResponded}
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
                                placeholder="Describe the work you'll perform..."
                                rows={4}
                                required
                            // readOnly={hasResponded}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="materials">Materials & Equipment</Label>
                            <Textarea
                                id="materials"
                                value={quoteData.materials}
                                onChange={(e) => handleInputChange("materials", e.target.value)}
                                placeholder="List materials and equipment..."
                                rows={3}
                            // readOnly={hasResponded}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="warranty">Warranty Information</Label>
                            <Input
                                id="warranty"
                                value={quoteData.warranty}
                                onChange={(e) => handleInputChange("warranty", e.target.value)}
                                placeholder="e.g., 5-year warranty on materials..."
                            // readOnly={hasResponded}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="additionalNotes">Additional Notes</Label>
                            <Textarea
                                id="additionalNotes"
                                value={quoteData.additionalNotes}
                                onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                                placeholder="Any additional info..."
                                rows={3}
                            // readOnly={hasResponded}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="attachment">Attachment</Label>

                            {/* Show preview if file exists */}
                            {quoteData.attachment && (
                                <div className="flex items-center gap-3">
                                    {quoteData.attachment instanceof File ? (
                                        // If user just selected a file, preview it
                                        <img
                                            src={URL.createObjectURL(quoteData.attachment)}
                                            alt="Attachment preview"
                                            className="w-20 h-20 object-cover rounded border"
                                        />
                                    ) : (
                                        // If prefilled from API, show server link
                                        <a
                                            href={quoteData.attachment}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-[#B80D2D] underline"
                                        >
                                            View current file
                                        </a>
                                    )}
                                </div>
                            )}

                            {/* File input to upload/replace */}
                            <Input
                                id="attachment"
                                type="file"
                                onChange={(e) =>
                                    handleInputChange("attachment", e.target.files?.[0] || null)
                                }
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            />
                        </div>



                        <Button
                            type="submit"
                            // disabled={hasResponded ? true : isSubmitting}
                            className="w-full bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] hover:from-[#9A0B26] hover:to-[#7A0920] text-white"
                        >
                            {isSubmitting ? "Sending..." : "Send Quote"}
                            <Send className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
