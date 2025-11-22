"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle, Award, User } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import EmptyPremiumCTA from "@/components/emptyPremState"
import "swiper/css/pagination";

import { getAllThePremiumVendors } from '@/lib/api/commonApi'
import { useEffect, useState } from "react";

export default function TrustedVendorSection() {
    const [premiumVendors, setPremiumVendors] = useState([])
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

    const getAllPremVendor = async () => {
        try {
            const allPremVendors = await getAllThePremiumVendors();
            console.log(allPremVendors.data)
            setPremiumVendors(allPremVendors.data.result || [])
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllPremVendor();
    }, [])

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-[#B93239]/10 to-transparent rounded-full"></div>
            <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-[#B93239]/5 to-transparent rounded-full blur-xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-2" data-aos="fade-up">
                    <h2 className="text-4xl mb-4 text-gray-900">
                        Trusted Vendors, Ready to Work
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        These businesses are approved and ready to take on your next project.

                    </p>
                </div>

                <div className="w-full pb-10 pt-5">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        spaceBetween={30}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-12"
                    >
                        {premiumVendors.length === 0 ? (
                            <EmptyPremiumCTA />
                        ) : (
                            premiumVendors.map((vendor, i) => (
                                <SwiperSlide key={i} className="!h-auto my-14">
                                    <Card className="relative p-3 border mb-6 rounded-2xl bg-white shadow hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">

                                        {/* Premium Tag */}
                                        {vendor.isPremium === "Yes" && (
                                            <Badge className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 flex items-center gap-1 shadow-md text-sm">
                                                <Award className="w-4 h-4" /> Premium
                                            </Badge>
                                        )}

                                        <CardContent className="space-y-4 mt-12">
                                            {/* Vendor Name */}
                                            <div className="flex justify-between">

                                                <div className="flex items-center gap-3">
                                                    <User className="w-6 h-6 text-gray-500" />
                                                    <h3 className="text-xl font-semibold text-gray-800">
                                                        {vendor.firstName} {vendor.lastName}
                                                    </h3>
                                                </div>
                                                <div>
                                                    {/* Business Status */}
                                                    <Badge
                                                        className={`mt-2 ${vendor.businessStatus === "Active"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-red-100 text-red-600"
                                                            }`}
                                                    >
                                                        {vendor.businessStatus}
                                                    </Badge>
                                                </div>
                                            </div>


                                            {/* Business Name */}
                                            <p className="text-gray-700 text-lg font-semibold">
                                                {vendor.businessName}
                                            </p>

                                            {/* Business Type */}
                                            {vendor.businessType && (
                                                <p className="text-gray-500 text-sm">
                                                    Business Type :{" "}
                                                    <span className="font-medium capitalize text-gray-800">
                                                        {vendor.businessType}
                                                    </span>
                                                </p>
                                            )}

                                            {/* Services */}
                                            {vendor.services && vendor.services.length > 0 && (
                                                <div className="text-gray-500 text-sm">
                                                    <p className="font-medium text-gray-800 mb-1">Services:</p>
                                                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                                                        {vendor.services.map((service, idx) => (
                                                            <li key={idx}>{service}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Business Description */}
                                            <p className="text-gray-500 text-sm line-clamp-3">
                                                {vendor.businessDescrption}
                                            </p>

                                            {/* Location */}
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                {vendor.city}, {vendor.state}
                                            </div>

                                            {/* Full Address */}
                                            <p className="text-gray-500 text-sm">
                                                {vendor.streetAddress}, {vendor.city}, {vendor.state} – {vendor.zipCode}
                                            </p>

                                            {/* Experience */}
                                            <p className="text-gray-500 text-sm">
                                                Experience:{" "}
                                                <span className="font-medium text-gray-800">
                                                    {vendor.yearsOfExperience}
                                                </span>
                                            </p>



                                            {/* CTA */}
                                            <Link href={`/vendor/${vendor.vendorGuid}`} className="hidden">
                                                <button className="w-full mt-4 h-12 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transition-all">
                                                    View Profile
                                                </button>
                                            </Link>
                                        </CardContent>

                                    </Card>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>
            </div>
        </section>
    )
} 