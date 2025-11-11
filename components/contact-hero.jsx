import { MessageCircle, Clock, Building } from "lucide-react"

export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#B93239] via-[#A02A31] to-[#8B1E25] text-white py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white/15 rotate-12 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 border-2 border-white/10 rotate-45 animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rotate-12 animate-pulse delay-1500"></div>
      </div>

      {/* Floating communication icons */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-1/4 left-1/4 text-6xl animate-bounce delay-300">📧</div>
        <div className="absolute top-1/3 right-1/4 text-5xl animate-bounce delay-700">📞</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce delay-1000">💬</div>
        <div className="absolute bottom-1/4 right-1/3 text-5xl animate-bounce delay-500">🏢</div>
      </div>

      {/* Dotted Pattern */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <h1 className="lg:text-6xl text-5xl mb-8 text-white font-semibold leading-tight">
            Contact Us
            <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h1>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Have a question about your vendor profile, service category, or how Nexus Built works? We're here to help.
          </p>

          {/* Quick contact stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-90">
            <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
              <MessageCircle className="h-5 w-5" />
              <span>24hr Response Time</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
              <Clock className="h-5 w-5" />
              <span>UAE Business Hours</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
              <Building className="h-5 w-5" />
              <span>Local Support Team</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
