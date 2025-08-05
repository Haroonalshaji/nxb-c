import { List, LayoutDashboard, UserCheck, Target, Globe, Lock } from "lucide-react"

export default function WhyChooseSection() {
    const whyChooseFeatures = [
        {
            icon: UserCheck,
            title: "Manual Vendor Verification",
            description:
                "All businesses are reviewed before they go live. Only real companies with valid details are approved.",
        },
        {
            icon: Target,
            title: "Industry-Specific Focus",
            description:
                "Every vendor category is designed for construction and fit-out needs. No irrelevant listings or distractions.",
        },
        {
            icon: LayoutDashboard,
            title: "Enquiry Dashboard",
            description: "Log in to view your enquiries, track their status, and keep your project communication organized.",
        },
        {
            icon: List,
            title: "Wide Category Range",
            description:
                "Choose from over 90 service categories. From structural works to interior fit-outs, everything is covered.",
        },
        {
            icon: Globe,
            title: "Built for the UAE Market",
            description:
                "This platform is tailored to UAE's construction standards, language, and local business expectations.",
        },
        {
            icon: Lock,
            title: "Safe and Professional",
            description: "We don't allow spam or fake listings. All communication is private and secure.",
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
            {/* Different decorative elements */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-[#B93239]/8 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-[#B93239]/12 to-transparent rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-[#B93239]/5 to-transparent rounded-full blur-3xl"></div>

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        "linear-gradient(#B93239 1px, transparent 1px), linear-gradient(90deg, #B93239 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl mb-6 text-gray-900">Why Choose Nexus Built</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Why Nexus Built is Built for You</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {whyChooseFeatures.map((feature, index) => (
                        <div key={index} data-aos="fade-up" data-aos-delay={index * 100} data-aos-duration="600" className="group">
                            <div className="relative bg-white border border-gray-100 rounded-3xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-500 hover:border-[#B93239]/20 hover:-translate-y-1">
                                {/* Subtle gradient overlay on hover */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#B93239]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10">
                                    {/* Different icon styling */}
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#B93239] to-[#A02A31] rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-3 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                                        <feature.icon className="h-7 w-7 text-white" />
                                    </div>

                                    <h3 className="text-xl mb-4 text-gray-900 group-hover:text-[#B93239] transition-colors duration-300 font-semibold">
                                        {feature.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>

                                {/* Different accent styling */}
                                <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-br from-[#B93239] to-[#A02A31] rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
