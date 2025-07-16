import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, HardHat, Hammer, Award, Clock, User } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero/About Section - Tweaked: image left, text right, subtle bg */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center" data-aos="fade-up">
            <div className="relative order-2 lg:order-1">
              <Image
                src="/assets/about_us/about-us-banner.jpg"
                alt="About Nexus Built"
                width={540}
                height={500}
                className="rounded-xl shadow-xl object-cover border-4 border-[#B80D2D]/10"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <Badge className="bg-[#B80D2D] text-white mb-2">Who We Are</Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                Building Connections, <span className="text-[#B80D2D]">Empowering Projects</span>
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nexus Built is a modern platform that brings together clients and construction vendors for seamless, transparent, and efficient project delivery. Whether you’re a business or an individual, we make it easy to find the right professionals for your construction needs and ensure every project is a success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Tweaked: Timeline/Stepper style */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl" data-aos="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We simplify the construction journey for both clients and vendors. Here’s how you can get started:
            </p>
          </div>
          <ol className="relative border-l-2 border-[#B80D2D]/30 ml-4">
            <li className="mb-12 ml-6">
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-[#B80D2D] rounded-full ring-4 ring-white">
                <User className="w-4 h-4 text-white" />
              </span>
              <h3 className="text-xl font-semibold text-gray-900">Sign Up & Create Enquiry</h3>
              <p className="text-gray-600 mt-2">Clients register and submit detailed enquiries for their construction needs.</p>
            </li>
            <li className="mb-12 ml-6">
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-[#B80D2D] rounded-full ring-4 ring-white">
                <HardHat className="w-4 h-4 text-white" />
              </span>
              <h3 className="text-xl font-semibold text-gray-900">Vendors Respond & Bid</h3>
              <p className="text-gray-600 mt-2">Verified vendors view relevant enquiries and submit their best offers.</p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-[#B80D2D] rounded-full ring-4 ring-white">
                <Hammer className="w-4 h-4 text-white" />
              </span>
              <h3 className="text-xl font-semibold text-gray-900">Connect & Build</h3>
              <p className="text-gray-600 mt-2">Clients review bids, connect with vendors, and kick off their projects with confidence.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Why Choose Us Section - keep but tweak visuals */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl" data-aos="fade-up">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Why Choose Nexus Built?</h2>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#B80D2D]/10">
                    <Award className="h-5 w-5 text-[#B80D2D]" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Verified & Trusted Vendors</h3>
                    <p className="text-gray-600">All vendors are pre-screened and quality certified for your peace of mind.</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#B80D2D]/10">
                    <Clock className="h-5 w-5 text-[#B80D2D]" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">On-Time, On-Budget</h3>
                    <p className="text-gray-600">Projects are completed on schedule with transparent milestone tracking.</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#B80D2D]/10">
                    <Users className="h-5 w-5 text-[#B80D2D]" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Support at Every Step</h3>
                    <p className="text-gray-600">Our team is here to help you from enquiry to project completion.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <Image
                src="/assets/home_Page/3d-house-decoration.jpg"
                alt="Why choose Nexus Built"
                width={540}
                height={400}
                className="rounded-xl shadow-xl object-cover border-4 border-[#B80D2D]/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
          <p className="text-lg text-gray-700 mb-8">
            Our mission is to empower clients and vendors alike, making construction projects smoother, more transparent, and more successful. We envision a world where every project—big or small—finds the right team, the right price, and the right support.
          </p>
        </div>
      </section>
    </div>
  );
}