import { Settings, Search, Shield, BarChart } from "lucide-react"

export default function WhatWeDo() {
  const services = [
    {
      icon: Settings,
      title: "Vendor Management",
      description: "Vendors can list their services, manage profiles, and track enquiries from a secure dashboard.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Search,
      title: "Easy Discovery",
      description:
        "Customers can search by trade category, explore verified vendors, and send enquiries with confidence.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Shield,
      title: "Reliable & Transparent",
      description: "We make vendor discovery and connection easy, reliable, and transparent for all users.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: BarChart,
      title: "Scalable Solution",
      description: "Our system is built for real-world needs — simple enough to use, powerful enough to scale.",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B93239]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#B93239]/15 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl mb-6 text-white">What We Do</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            We make vendor discovery and connection easy, reliable, and transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="group transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl lg:p-8 p-4 h-full hover:bg-white/15 transition-all duration-300 hover:border-[#B93239]/50 hover:shadow-2xl hover:shadow-[#B93239]/25">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#B93239]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl mb-4 text-white group-hover:text-[#B93239] transition-colors duration-300 font-semibold">
                    {service.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
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
