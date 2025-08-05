import { TrendingUp, Zap, Target } from "lucide-react"

export default function WhyWeBuiltThis() {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#B93239]/8 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-20 w-40 h-40 bg-gradient-to-br from-[#B93239]/5 to-transparent rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
                    <h2 className="text-4xl mb-8 text-gray-900 font-semibold">Why We Built This</h2>

                    <div className="bg-white border border-gray-100 rounded-3xl p-12 shadow-lg">
                        <div className="flex justify-center mb-8">
                            <div className="flex space-x-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#B93239] to-[#A02A31] rounded-2xl flex items-center justify-center">
                                    <TrendingUp className="h-8 w-8 text-white" />
                                </div>
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                                    <Zap className="h-8 w-8 text-white" />
                                </div>
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                                    <Target className="h-8 w-8 text-white" />
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            The construction and fit-out ecosystem in the UAE is growing fast, but the tools to find reliable trade
                            partners have not kept up. Many platforms are either too generic or too cluttered.
                        </p>

                        <div className="bg-gradient-to-r from-[#B93239]/10 to-[#A02A31]/10 rounded-2xl p-8">
                            <p className="text-xl text-gray-900 leading-relaxed font-medium">
                                We created Nexus Built as a focused solution for one industry — construction — with features that
                                actually support how work gets done.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
