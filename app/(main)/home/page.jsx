import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Search,
    Star,
    MapPin,
    Clock,
    Users,
    TrendingUp,
    Shield,
    Zap,
    CheckCircle,
    Award,
    List,
    LayoutDashboard,
} from "lucide-react";
import nexusLogo from "../../../public/assets/header images/nexus_white_no_bg.png";
import WhyChooseSection from '../../../components/whyChooseSection'
import VendorSection from '../../../components/vendorSection'
import VendorRequirementsSection from '../../../components/vendor-req'
import Link from "next/link"
import Image from "next/image";

export default function HomePageNew() {
    const categories = [
        { name: "Electrical", icon: "/assets/clientHome/Electrical.png" },
        { name: "HVAC", icon: "/assets/clientHome/HVAC.png" },
        { name: "Plumbing", icon: "/assets/clientHome/Plumbing.png" },
        { name: "Gypsum", icon: "/assets/clientHome/Gypsum.png" },
        { name: "Joinery", icon: "/assets/clientHome/Joinery.png" },
        { name: "Stone Supply & Installation", icon: "/assets/clientHome/Stone.png" },
        { name: "Internal Glass Partitions", icon: "/assets/clientHome/GlassPartition.png" },
        { name: "Swimming Pool Works", icon: "/assets/clientHome/SwimmingPool.png" },
        { name: "Custom Furniture Supply", icon: "/assets/clientHome/CustomFurn.png" },
        { name: "Home Automation", icon: "/assets/clientHome/HomeAutomation.png" },
    ];

    const featuredVendors = [
        {
            name: "Premium Electric Solutions",
            category: "Electrical",
            rating: 4.9,
            reviews: 127,
            location: "Austin, TX",
            image:
                "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop",
            specialty: "Commercial Wiring",
            verified: true,
            premium: true,
        },
        {
            name: "Apex Construction Group",
            category: "Construction",
            rating: 4.8,
            reviews: 203,
            location: "Dallas, TX",
            image:
                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop",
            specialty: "General Contracting",
            verified: true,
            premium: false,
        },
        {
            name: "FlowTech Plumbing",
            category: "Plumbing",
            rating: 4.9,
            reviews: 89,
            location: "Houston, TX",
            image:
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
            specialty: "Emergency Repairs",
            verified: true,
            premium: true,
        },
    ];

    const howItWorks = [
        {
            step: "1",
            title: "Create your account to access the vendor directory",
            description:
                "Set up your vendor profile with services, credentials, and portfolio",
        },
        {
            step: "2",
            title: "Search by trade or service category",
            description:
                "Browse verified vendors or post your project needs",
        },
        {
            step: "3",
            title: "Submit enquiries and track everything from your dashboard",
            description:
                "Build partnerships, share resources, and grow your business",
        },
    ];

    return (
        <div className="min-h-screen bg-white relative">
            {/* Decorative Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#B93239]/10 to-transparent rounded-full blur-xl"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#B93239]/15 to-transparent rounded-full blur-lg"></div>
                <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-[#B93239]/8 to-transparent rounded-full blur-2xl"></div>
            </div>

            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 hidden">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <img
                            src={nexusLogo}
                            alt="Nexus Built"
                            className="h-12 w-auto"
                        />
                        <nav className="hidden md:flex items-center space-x-6">
                            <a
                                href="#"
                                className="hover:text-[#B93239] transition-colors"
                            >
                                Browse Vendors
                            </a>
                            <a
                                href="#"
                                className="hover:text-[#B93239] transition-colors"
                            >
                                Categories
                            </a>
                            <a
                                href="#"
                                className="hover:text-[#B93239] transition-colors"
                            >
                                How It Works
                            </a>
                            <a
                                href="#"
                                className="hover:text-[#B93239] transition-colors"
                            >
                                Support
                            </a>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost">Sign In</Button>
                        <Button className="bg-[#B93239] hover:bg-[#A02A31] text-white shadow-lg hover:shadow-xl transition-all">
                            Join as Vendor
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#B93239] via-[#A02A31] to-[#8B1E25] text-white py-24 overflow-hidden">
                {/* Geometric Patterns */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rotate-45"></div>
                    <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white/15 rotate-12"></div>
                    <div className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-white/10 rotate-45"></div>
                    <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-white/20 rotate-12"></div>
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>

                {/* Dotted Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                    }}
                ></div>

                <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-6xl mb-8 text-white font-semibold leading-tight">
                            Where Trades Meet
                            <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                Opportunity
                            </span>
                        </h1>
                        <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
                            Nexus Built helps you find trusted vendors across the UAE’s construction and fit-out industry. Explore services by category, view verified business profiles, and send enquiries from one secure platform.
                        </p>

                        <div className="max-w-2xl mx-auto mb-12">
                            <div className="flex gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-2xl">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <Input
                                        placeholder="Search vendors, services, or locations..."
                                        className="pl-12 border-0 focus:ring-0 text-gray-900 bg-transparent h-12 text-lg"
                                    />
                                </div>
                                <Link href='/contactUs'>
                                    <Button className="bg-[#B93239] hover:bg-[#A02A31] px-8 h-12 text-lg shadow-lg hover:shadow-xl transition-all">
                                        Search
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-90">
                            <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                                <List className="h-5 w-5" />
                                <span>90+ Service Categories</span>
                            </div>
                            <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                                <Shield className="h-5 w-5" />
                                <span>100% Verified Vendors</span>
                            </div>
                            <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                                <LayoutDashboard className="h-5 w-5" />
                                <span>Enquiry Dashboard Access</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories with Glass-morphism */}
            <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
                {/* Background Glow Effects */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B93239]/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#B93239]/15 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl mb-6 text-white">
                            Explore Service Categories
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                            Browse active vendors across the most requested trades in construction and fit-out.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 justify-center gap-8">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                                data-aos-duration="800"
                                className="group cursor-pointer min-h-[230px] h-full transform hover:scale-105 transition-all duration-300"

                            >
                                <div
                                    className="relative h-full flex items-center justify-center backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:border-[#B93239]/50 hover:shadow-2xl hover:shadow-[#B93239]/25 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${category.icon})` }}
                                >
                                    <div className="absolute -inset-[1px] bg-black/35 rounded-2xl"></div>
                                    {/* Overlay for glow effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#B93239]/20 to-black/40 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                                    <div className="relative z-10">
                                        <h3 className="text-2xl mb-3 text-white group-hover:text-[#B93239] transition-colors duration-300">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-300 text-lg">{category.count}</p>
                                    </div>

                                    {/* Corner accents */}
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-[#B93239] rounded-full opacity-60"></div>
                                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-white/40 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <VendorRequirementsSection />

            {/* Featured Vendors - Premium */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-[#B93239]/10 to-transparent rounded-full"></div>
                <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-[#B93239]/5 to-transparent rounded-full blur-xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl mb-6 text-gray-900">
                            Trusted Vendors, Ready to Work
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            These businesses are approved and ready to take on your next project.

                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredVendors.map((vendor, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                                data-aos-duration="800"
                                className="group transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white relative">
                                    {vendor.premium && (
                                        <div className="absolute top-4 left-4 z-20">
                                            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-0 shadow-lg">
                                                <Award className="w-3 h-3 mr-1" />
                                                Premium
                                            </Badge>
                                        </div>
                                    )}

                                    <div className="h-56 bg-gray-200 relative overflow-hidden">
                                        <img
                                            src={vendor.image}
                                            alt={vendor.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                        <Badge className="absolute bottom-4 right-4 bg-[#B93239]/90 backdrop-blur-sm border-0">
                                            {vendor.category}
                                        </Badge>
                                    </div>

                                    <CardContent className="p-8">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl text-gray-900">
                                                {vendor.name}
                                            </h3>
                                            {vendor.verified && (
                                                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                            )}
                                        </div>

                                        <p className="text-gray-600 mb-4 text-lg">
                                            {vendor.specialty}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-2">


                                            </div>
                                        </div>

                                        <div className="flex items-center text-gray-600 mb-6">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            <span>{vendor.location}</span>
                                        </div>

                                        <Link href={'/vendor'}>
                                            <Button className="w-full bg-gradient-to-r from-[#B93239] to-[#A02A31] hover:from-[#A02A31] hover:to-[#8B1E25] text-white shadow-lg hover:shadow-xl transition-all text-lg h-12">
                                                View Profile
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl mb-6 text-gray-900">
                            How Nexus Built Works
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            Getting Started Is Simple
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {howItWorks.map((item, index) => (
                            <div key={index} className="text-center group" data-aos="fade-up"
                                data-aos-delay={index * 150}
                                data-aos-duration="800">
                                <div className="relative mb-8">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#B93239] to-[#A02A31] text-white rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110">
                                        {item.step}
                                    </div>
                                    {index < howItWorks.length - 1 && (
                                        <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-[#B93239]/30 to-transparent"></div>
                                    )}
                                </div>
                                <h3 className="text-2xl mb-4 text-gray-900">
                                    {item.title}
                                </h3>
                                {/* <p className="text-gray-600 text-lg leading-relaxed">
                                    {item.description}
                                </p> */}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <VendorSection />
            <WhyChooseSection />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#B93239] via-[#A02A31] to-[#8B1E25] text-white relative overflow-hidden">
                {/* Background patterns */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
                    <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/15 rounded-full"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl mb-6">
                        Ready to Grow Your Trade Business?
                    </h2>
                    <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of verified trade professionals
                        building partnerships and growing their businesses
                        on Nexus Built.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/vendor/register">
                            <Button
                                size="lg"
                                className="bg-white text-[#B93239] hover:bg-gray-100 px-10 h-14 text-lg shadow-xl hover:shadow-2xl transition-all"
                            >
                                Register as Vendor
                            </Button>
                        </Link>
                        <Link href='/signin'>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white text-[#B93239] hover:bg-white hover:text-[#B93239] px-10 h-14 text-lg backdrop-blur-sm"
                            >
                                Browse Vendors
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>


        </div>
    );
}