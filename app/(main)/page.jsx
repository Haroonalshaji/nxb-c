import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Award, Clock, Hammer, Wrench, HardHat, Truck } from "lucide-react"
import AnimatedCounter from "@/components/animatedCoounter"
import HomePageNew from "./home/page"

export default function HomePage() {

  return (
    <><div className="min-h-screen bg-white hidden">
      {/* Header */}
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center" data-aos="fade-up">
            <div className="space-y-6">
              <Badge className="bg-[#B80D2D] text-white">Professional Construction Services</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Building Your Dreams Into <span className="text-[#B80D2D]">Reality</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with trusted construction professionals and vendors for all your building needs. From
                residential to commercial projects, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#B80D2D] hover:bg-[#9A0B26] text-white">
                  Get Started Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white bg-transparent"
                >
                  View Our Work
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/assets/home_Page/3d-house-decoration.jpg"
                alt="Construction site with workers"
                width={600}
                height={700}
                className="rounded-lg shadow-2xl object-cover lg:h-[470px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedCounter />


      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl" data-aos="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Construction Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive construction services with a network of verified vendors and professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-[#B80D2D]" data-aos="fade-up" data-aos-offset="100" data-aos-duration="500">
              <CardHeader>
                <div className="w-12 h-12 bg-[#B80D2D] rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Residential Construction</CardTitle>
                <CardDescription>Custom homes, renovations, and residential building projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• New home construction</li>
                  <li>• Home renovations</li>
                  <li>• Kitchen & bathroom remodeling</li>
                  <li>• Additions & extensions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-[#B80D2D]" data-aos="fade-up" data-aos-offset="100" data-aos-duration="1000">
              <CardHeader>
                <div className="w-12 h-12 bg-[#B80D2D] rounded-lg flex items-center justify-center mb-4">
                  <HardHat className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Commercial Projects</CardTitle>
                <CardDescription>Office buildings, retail spaces, and commercial construction</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Office buildings</li>
                  <li>• Retail construction</li>
                  <li>• Warehouse facilities</li>
                  <li>• Industrial projects</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-[#B80D2D]" data-aos="fade-up" data-aos-offset="100" data-aos-duration="1300">
              <CardHeader>
                <div className="w-12 h-12 bg-[#B80D2D] rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Specialized Services</CardTitle>
                <CardDescription>Electrical, plumbing, HVAC, and other specialized work</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Electrical installations</li>
                  <li>• Plumbing services</li>
                  <li>• HVAC systems</li>
                  <li>• Roofing & siding</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vendors Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl" data-aos="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Trusted Vendor Network</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Work with pre-screened, qualified vendors and contractors for your construction projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-offset="100" data-aos-duration="500">
              <div className="w-16 h-16 bg-[#B80D2D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Hammer className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">General Contractors</h3>
              <p className="text-sm text-gray-600">Licensed and insured general contractors for all project sizes</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-offset="100" data-aos-duration="600">
              <div className="w-16 h-16 bg-[#B80D2D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Specialty Trades</h3>
              <p className="text-sm text-gray-600">Electricians, plumbers, HVAC specialists, and more</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-offset="100" data-aos-duration="700">
              <div className="w-16 h-16 bg-[#B80D2D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Material Suppliers</h3>
              <p className="text-sm text-gray-600">Quality building materials and construction supplies</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-offset="100" data-aos-duration="800">
              <div className="w-16 h-16 bg-[#B80D2D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Project Managers</h3>
              <p className="text-sm text-gray-600">Experienced project managers to oversee your construction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl" data-aos="fade-up">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/assets/home_Page/man-smiling-holding-house.jpg"
                alt="Construction team at work"
                width={500}
                height={400}
                className="rounded-lg shadow-lg" />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Why Choose Nexus Built?</h2>
              <p className="text-lg text-gray-600">
                We connect you with the best construction professionals and ensure your project is completed on time,
                within budget, and to the highest quality standards.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#B80D2D] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Quality Assurance</h3>
                    <p className="text-gray-600">All vendors are pre-screened and quality certified</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#B80D2D] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">On-Time Delivery</h3>
                    <p className="text-gray-600">Projects completed on schedule with milestone tracking</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#B80D2D] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Support</h3>
                    <p className="text-gray-600">Dedicated project support throughout the construction process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}

    </div><HomePageNew /></>
  )
}
