import { UserCheck, Globe, Eye, Building } from "lucide-react"

export default function WhatMakesUsDifferent() {
  const differentiators = [
    {
      icon: UserCheck,
      title: "Manual Vendor Verification",
      description: "Every vendor is reviewed before approval, ensuring only qualified businesses get listed.",
    },
    {
      icon: Globe,
      title: "Built for the UAE Market",
      description: "Our categories, language, and structure reflect local needs and industry standards.",
    },
    {
      icon: Eye,
      title: "Clean and Clear Experience",
      description: "No unnecessary features. No distractions. Just the tools you need to connect, engage, and grow.",
    },
    {
      icon: Building,
      title: "Dedicated to Construction and Fit-Out",
      description: "We don't try to serve every industry. We serve one — and we do it well.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B93239]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#B93239]/15 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl mb-6 text-white">What Makes Us Different</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Four key principles that set Nexus Built apart from other platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {differentiators.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:border-[#B93239]/50"
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#B93239] to-[#A02A31] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-4 text-white group-hover:text-[#B93239] transition-colors duration-300 font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {item.description}
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
