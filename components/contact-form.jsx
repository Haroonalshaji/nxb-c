"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, CheckCircle, Clock, Shield } from "lucide-react"

export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false)
            setFormData({
                fullName: "",
                email: "",
                subject: "",
                message: "",
            })
        }, 3000)
    }

    const features = [
        {
            icon: Clock,
            title: "24hr Response",
            description: "We'll get back to you within 24 hours",
        },
        {
            icon: Shield,
            title: "Secure & Private",
            description: "Your information is safe with us",
        },
        {
            icon: CheckCircle,
            title: "Expert Support",
            description: "Direct access to our team",
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B93239]/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#B93239]/15 rounded-full blur-3xl"></div>

            {/* Animated message icons */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse">💬</div>
                <div className="absolute top-1/3 right-1/4 text-5xl animate-pulse delay-1000">📝</div>
                <div className="absolute bottom-1/3 left-1/3 text-4xl animate-pulse delay-500">✉️</div>
                <div className="absolute bottom-1/4 right-1/3 text-5xl animate-pulse delay-1500">📨</div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl mb-6 text-white font-semibold">Send Us a Message</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        Use the form below and our team will get back to you within 24 hours
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        {/* Form */}
                        <div className="lg:col-span-2" data-aos="fade-right">
                            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden">
                                <CardHeader className="bg-white/5 border-b border-white/10">
                                    <CardTitle className="text-2xl text-white flex items-center">
                                        <Send className="h-6 w-6 mr-3 text-[#B93239]" />
                                        Contact Form
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    {isSubmitted ? (
                                        <div className="text-center py-12">
                                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle className="h-10 w-10 text-white" />
                                            </div>
                                            <h3 className="text-2xl text-white mb-4 font-semibold">Message Sent Successfully!</h3>
                                            <p className="text-gray-300 text-lg">
                                                Thank you for reaching out. We'll get back to you within 24 hours.
                                            </p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="fullName" className="text-white text-sm font-medium">
                                                        Full Name *
                                                    </Label>
                                                    <Input
                                                        id="fullName"
                                                        name="fullName"
                                                        type="text"
                                                        required
                                                        value={formData.fullName}
                                                        onChange={handleInputChange}
                                                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#B93239] focus:ring-[#B93239] h-12"
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-white text-sm font-medium">
                                                        Email Address *
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#B93239] focus:ring-[#B93239] h-12"
                                                        placeholder="Enter your email address"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="subject" className="text-white text-sm font-medium">
                                                    Subject *
                                                </Label>
                                                <Input
                                                    id="subject"
                                                    name="subject"
                                                    type="text"
                                                    required
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#B93239] focus:ring-[#B93239] h-12"
                                                    placeholder="What's this about?"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="message" className="text-white text-sm font-medium">
                                                    Message *
                                                </Label>
                                                <Textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    rows={6}
                                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#B93239] focus:ring-[#B93239] resize-none"
                                                    placeholder="Tell us more about your enquiry..."
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-[#B93239] hover:bg-[#A02A31] text-white h-14 text-lg shadow-lg hover:shadow-xl transition-all group disabled:opacity-50"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                        Sending Message...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Message
                                                        <Send className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Features */}
                        <div className="space-y-6" data-aos="fade-left" data-aos-delay="200">
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                                <h3 className="text-xl text-white mb-6 font-semibold">Why Contact Us?</h3>
                                <div className="space-y-6">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#B93239]/20 rounded-xl flex items-center justify-center">
                                                <feature.icon className="h-6 w-6 text-[#B93239]" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                                                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick tips */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                                <h4 className="text-white font-medium mb-4">Quick Tips</h4>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li className="flex items-center">
                                        <div className="w-1.5 h-1.5 bg-[#B93239] rounded-full mr-3"></div>
                                        Be specific about your enquiry
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-1.5 h-1.5 bg-[#B93239] rounded-full mr-3"></div>
                                        Include relevant details
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-1.5 h-1.5 bg-[#B93239] rounded-full mr-3"></div>
                                        Check your email for our response
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
