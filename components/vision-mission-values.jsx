import { Eye, Target, Heart } from "lucide-react"

export default function VisionMissionValues() {
    const values = [
        {
            title: "Trust and Transparency",
            description: "We believe that good business starts with honest connections.",
        },
        {
            title: "Customer-Centric Thinking",
            description: "We build features and experiences based on real industry needs.",
        },
        {
            title: "Accountability",
            description:
                "From manual vendor approvals to platform standards, we take ownership of the experience we provide.",
        },
        {
            title: "Progress and Practicality",
            description: "Innovation matters, but it has to solve problems. Everything we build is built with purpose.",
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-[#B93239]/8 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-[#B93239]/12 to-transparent rounded-full blur-xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Vision and Mission */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        {/* Vision */}
                        <div data-aos="fade-right" className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg">
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#B93239] to-[#A02A31] rounded-2xl flex items-center justify-center mr-4">
                                    <Eye className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900">Our Vision</h3>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                To become the UAE's most trusted platform for vendor-to-vendor and vendor-to-client connections in
                                construction and fit-out.
                            </p>
                        </div>

                        {/* Mission */}
                        <div
                            data-aos="fade-left"
                            data-aos-delay="200"
                            className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg"
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                                    <Target className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                To simplify and strengthen how construction professionals connect, collaborate, and grow — through a
                                platform that values quality, trust, and real business outcomes.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div data-aos="fade-up">
                        <div className="text-center mb-12">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                    <Heart className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-semibold text-gray-900 mb-4">Our Values</h3>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                The principles that guide everything we do at Nexus Built
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#B93239]/20 hover:-translate-y-1"
                                >
                                    <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#B93239] transition-colors">
                                        {value.title}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
