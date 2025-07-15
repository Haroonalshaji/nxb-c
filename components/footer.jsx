import { Building2, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"


export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2">
                            <Image src="/assets/header images/nexus_white_no_bg.png" width={80} height={80} />
                        </div>
                        <p className="text-gray-400 ps-2">
                            Your trusted partner for all construction needs. Connecting you with quality vendors and professionals.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Residential Construction</li>
                            <li>Commercial Projects</li>
                            <li>Renovations</li>
                            <li>Specialized Services</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>About Us</li>
                            <li>Our Vendors</li>
                            <li>Careers</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-2 text-gray-400">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>(555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>info@nexusbuilt.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>123 Construction Ave</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 NexusBuilt. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}