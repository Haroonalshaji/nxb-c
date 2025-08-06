import { CheckCircle, Shield, BarChart, User, Settings, Bell } from 'lucide-react'

export default function AllPlansInclude() {
    const includedFeatures = [
        {
            icon: Shield,
            title: "Manual vendor verification",
            description: "Every vendor profile is manually reviewed and verified by our team",
        },
        {
            icon: BarChart,
            title: "Listing by service categories",
            description: "Get listed in relevant categories for maximum visibility",
        },
        {
            icon: Bell,
            title: "Enquiry submission and tracking",
            description: "Receive and track all customer enquiries in real-time",
        },
        {
            icon: User,
            title: "Profile and business info management",
            description: "Complete control over your business profile and information",
        },
        {
            icon: Settings,
            title: "Dashboard access with status updates",
            description: "Comprehensive dashboard to manage your vendor account",
        },
        {
            icon: CheckCircle,
            title: "Customer support",
            description: "Dedicated support team to help you succeed on the platform",
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B93239]/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#B93239]/15 rounded-full blur-3xl"></div>

            {/* Animated feature icons */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse">✅</div>
                <div className="absolute top-1/3 right-1/4 text-5xl animate-pulse delay-1000">🛡️</div>
                <div className="absolute bottom-1/3 left-1/3 text-4xl animate-pulse delay-500">📊</div>
                <div className="absolute bottom-1/4 right-1/3 text-5xl animate-pulse delay-1500">⚙️</div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl mb-6 text-white font-semibold">All Plans Include</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        Every plan comes with these essential features to help your business succeed
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {includedFeatures.map((feature, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:border-[#B93239]/50"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-[#B93239]/20 rounded-xl flex items-center justify-center group-hover:bg-[#B93239]/30 transition-colors duration-300">
                                    <feature.icon className="h-6 w-6 text-[#B93239]" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg mb-2 text-white group-hover:text-[#B93239] transition-colors duration-300 font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
