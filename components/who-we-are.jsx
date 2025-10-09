import { Building, Users, Search, Shield } from "lucide-react"

export default function WhoWeAre() {
  const features = [
    {
      icon: Building,
      title: "UAE-Based Platform",
      description: "Designed specifically for the UAE construction and fit-out industry",
    },
    {
      icon: Users,
      title: "90+ Categories",
      description: "Comprehensive coverage of construction and fit-out services",
    },
    {
      icon: Search,
      title: "Easy Discovery",
      description: "Simple search and connection tools for professionals",
    },
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All vendors are manually reviewed and verified",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-[#B93239]/8 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-[#B93239]/12 to-transparent rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div data-aos="fade-right">
              <h2 className="text-4xl mb-6 text-gray-900 font-semibold">Who We Are</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                In this fast-driven UAE construction sector, and the ever growing demands of quality contractors and professionals it has become difficult to make the right choice.</p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">At NXB we help project owners, contractors and service providers connect with verified professionals across 90-plus categories.</p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">NXB is a UAE-based digital platform designed to bring real value to the construction and fit-out industry.</p>
              <p className="text-lg text-gray-600 leading-relaxed">Whether you're looking for a specialist or ready to offer your services, NXB is where opportunity meets expertise.
              </p>
            </div>

            {/* Right side - Features */}
            <div data-aos="fade-left" data-aos-delay="200">
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={300 + index * 100}
                    className="group bg-white border border-gray-100 rounded-2xl lg:p-6 p-3 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#B93239]/20 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B93239] to-[#A02A31] rounded-xl flex items-center justify-center mb-4 transform group-hover:rotate-3 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#B93239] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
