import { Hammer, Building2, Users, TrendingUp } from "lucide-react"

export default function WhoItsFor() {
  const targetAudience = [
    {
      icon: Hammer,
      title: "Contractors",
      description: "Looking to grow their network and find new opportunities",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Building2,
      title: "Project Owners",
      description: "In need of reliable service providers for their projects",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "Vendors",
      description: "Wanting more visibility and higher-quality leads",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Construction Professionals",
      description: "Ready to scale their reach and grow their business",
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
          <h2 className="text-4xl mb-6 text-white">Who It's For</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Nexus Built serves the entire construction and fit-out ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {targetAudience.map((audience, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="group transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 h-full hover:bg-white/15 transition-all duration-300 hover:border-[#B93239]/50 hover:shadow-2xl hover:shadow-[#B93239]/25">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#B93239]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${audience.color} rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <audience.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl mb-4 text-white group-hover:text-[#B93239] transition-colors duration-300 font-semibold">
                    {audience.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {audience.description}
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
