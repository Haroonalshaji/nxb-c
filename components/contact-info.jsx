import { Card, CardContent } from "@/components/ui/card"
import { Mail, Briefcase, Clock, MapPin } from "lucide-react"

export default function ContactInfo() {
    const contactMethods = [
        {
            icon: Mail,
            title: "General Enquiries",
            description: "For support, partnerships, or platform-related queries",
            contact: "support@nexusbuilt.com",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            icon: Briefcase,
            title: "Business Enquiries",
            description: "Interested in becoming a vendor or Premium Partner?",
            contact: "business@nexusbuilt.com",
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
        },
        {
            icon: Clock,
            title: "Office Hours",
            description: "Sunday to Thursday",
            contact: "10:00 AM to 6:00 PM (UAE Time)",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            icon: MapPin,
            title: "Location",
            description: "Serving the UAE construction industry",
            contact: "United Arab Emirates",
            color: "from-orange-500 to-orange-600",
            bgColor: "bg-orange-50",
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-[#B93239]/8 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-[#B93239]/12 to-transparent rounded-full blur-xl"></div>

            {/* Floating contact icons */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute top-20 left-10 text-4xl">📧</div>
                <div className="absolute top-40 right-20 text-3xl">📞</div>
                <div className="absolute bottom-40 left-1/4 text-5xl">💼</div>
                <div className="absolute bottom-20 right-10 text-3xl">🕐</div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl mb-6 text-gray-900 font-semibold">Get in Touch</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Multiple ways to reach our team for all your questions and needs
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contactMethods.map((method, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                        >
                            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white relative h-full">
                                <CardContent className="p-8 h-full flex flex-col text-center">
                                    {/* Icon with gradient background */}
                                    <div className="relative mb-6 mx-auto">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}
                                        >
                                            <method.icon className="h-8 w-8 text-white" />
                                        </div>
                                        {/* Glow effect */}
                                        <div
                                            className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300`}
                                        ></div>
                                    </div>

                                    <h3 className="text-xl mb-3 text-gray-900 group-hover:text-[#B93239] transition-colors duration-300 font-semibold">
                                        {method.title}
                                    </h3>

                                    <p className="text-gray-600 mb-4 leading-relaxed flex-grow text-sm">{method.description}</p>

                                    <div className="mt-auto">
                                        <div className="bg-gray-50 rounded-xl p-3 group-hover:bg-[#B93239]/5 transition-colors duration-300">
                                            <p className="text-gray-900 font-medium text-sm">{method.contact}</p>
                                        </div>
                                    </div>
                                </CardContent>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#B93239]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
