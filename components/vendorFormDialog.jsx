"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DollarSign, Clock, Send } from "lucide-react"

export default function QuoteModal({modalOpen,setModalOpen}) {
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

    const handleInputChange = (field, value) => {
        setQuoteData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmitQuote = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate submission delay
        setTimeout(() => {
            setIsSubmitting(false)
            router.push("/vendor/dashboard")
        }, 2000)
    }

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
                                placeholder="Describe the work you'll perform..."
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
                                placeholder="List materials and equipment..."
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="warranty">Warranty Information</Label>
                            <Input
                                id="warranty"
                                value={quoteData.warranty}
                                onChange={(e) => handleInputChange("warranty", e.target.value)}
                                placeholder="e.g., 5-year warranty on materials..."
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
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
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
