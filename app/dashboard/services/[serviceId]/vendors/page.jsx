"use client"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Phone, Mail, Filter, Search } from "lucide-react"

// Import your services data (copy from your services/page.jsx)
const services = [
  {
    id: 1,
    name: "Roofing Services",
    category: "Exterior",
    subcategory: "Roofing",
    description: "Professional roofing installation and repair",
    vendors: [
      {
        id: 1,
        name: "Elite Roofing Co.",
        rating: 4.8,
        reviews: 156,
        location: "Downtown",
        phone: "(555) 123-4567",
        email: "info@eliteroofing.com",
        services: ["Shingle Installation", "Roof Repair", "Gutter Installation"],
        experience: "15+ years",
      },
      {
        id: 2,
        name: "Premium Roof Solutions",
        rating: 4.6,
        reviews: 89,
        location: "Midtown",
        phone: "(555) 234-5678",
        email: "contact@premiumroof.com",
        services: ["Metal Roofing", "Tile Installation", "Roof Inspection"],
        experience: "12+ years",
      },
    ],
  },
  {
    id: 2,
    name: "Ceiling Installation",
    category: "Interior",
    subcategory: "Ceiling",
    description: "Ceiling design, installation and repair services",
    vendors: [
      {
        id: 3,
        name: "Modern Ceiling Designs",
        rating: 4.9,
        reviews: 203,
        location: "Uptown",
        phone: "(555) 345-6789",
        email: "hello@modernceiling.com",
        services: ["Drop Ceiling", "Coffered Ceiling", "Acoustic Ceiling"],
        experience: "20+ years",
      },
    ],
  },
  {
    id: 3,
    name: "Flooring Services",
    category: "Interior",
    subcategory: "Flooring",
    description: "Complete flooring solutions for residential and commercial",
    vendors: [
      {
        id: 4,
        name: "FloorMaster Pro",
        rating: 4.7,
        reviews: 134,
        location: "Westside",
        phone: "(555) 456-7890",
        email: "info@floormasterpro.com",
        services: ["Hardwood Installation", "Tile Flooring", "Carpet Installation"],
        experience: "18+ years",
      },
      {
        id: 5,
        name: "Luxury Floors Inc.",
        rating: 4.5,
        reviews: 67,
        location: "Eastside",
        phone: "(555) 567-8901",
        email: "sales@luxuryfloors.com",
        services: ["Laminate Flooring", "Vinyl Installation", "Floor Refinishing"],
        experience: "10+ years",
      },
    ],
  },
  {
    id: 4,
    name: "Electrical Services",
    category: "Utilities",
    subcategory: "Electrical",
    description: "Licensed electrical installation and maintenance",
    vendors: [
      {
        id: 6,
        name: "PowerTech Electrical",
        rating: 4.8,
        reviews: 178,
        location: "Central",
        phone: "(555) 678-9012",
        email: "service@powertech.com",
        services: ["Wiring Installation", "Panel Upgrades", "Lighting Systems"],
        experience: "25+ years",
      },
    ],
  },
  {
    id: 5,
    name: "Plumbing Services",
    category: "Utilities",
    subcategory: "Plumbing",
    description: "Professional plumbing installation and repair",
    vendors: [
      {
        id: 7,
        name: "AquaFlow Plumbing",
        rating: 4.6,
        reviews: 145,
        location: "Southside",
        phone: "(555) 789-0123",
        email: "info@aquaflow.com",
        services: ["Pipe Installation", "Fixture Repair", "Drain Cleaning"],
        experience: "16+ years",
      },
    ],
  },
  {
    id: 6,
    name: "HVAC Services",
    category: "Utilities",
    subcategory: "HVAC",
    description: "Heating, ventilation, and air conditioning services",
    vendors: [
      {
        id: 8,
        name: "Climate Control Experts",
        rating: 4.9,
        reviews: 234,
        location: "Northside",
        phone: "(555) 890-1234",
        email: "contact@climatecontrol.com",
        services: ["AC Installation", "Heating Systems", "Duct Cleaning"],
        experience: "22+ years",
      },
    ],
  },
];

const categories = ["All", ...new Set(services.map(s => s.category))];
const subcategoriesByCategory = {};
services.forEach(s => {
  if (!subcategoriesByCategory[s.category]) subcategoriesByCategory[s.category] = [];
  if (!subcategoriesByCategory[s.category].includes(s.subcategory)) {
    subcategoriesByCategory[s.category].push(s.subcategory);
  }
});

export default function VendorSelectionPage() {
  const router = useRouter();
  const params = useParams();
  const { serviceId } = params;

  // Find the selected service
  const selectedService = services.find(s => String(s.id) === String(serviceId));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(selectedService?.category || "All");
  const [selectedSubcategory, setSelectedSubcategory] = useState(selectedService?.subcategory || "All");

  // Get all vendors for the selected service
  const allVendors = selectedService ? selectedService.vendors : [];

  // Filter vendors by search, category, subcategory
  const filteredVendors = allVendors.filter(vendor => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || selectedService.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === "All" || selectedService.subcategory === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  return (
    <div className="container mx-auto px-4 max-w-7xl py-8">
      <h1 className="text-3xl font-bold text-[#B80D2D] mb-6">Select a Vendor</h1>
      <Button variant="outline" onClick={() => router.back()} className="mb-6 bg-white">← Back to Services</Button>
      {/* Filter/Search UI */}
      <div className="mb-6 grid md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search vendors by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B80D2D]"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={selectedSubcategory}
          onChange={e => setSelectedSubcategory(e.target.value)}
          className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B80D2D]"
        >
          {(subcategoriesByCategory[selectedCategory] || []).map(subcat => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
        <Button variant="outline" className="border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {filteredVendors.map((vendor) => (
          <Card
            key={vendor.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push(`/dashboard/vendor/${vendor.id}`)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{vendor.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{vendor.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({vendor.reviews} reviews)</span>
                  </div>
                </div>
                <Badge className="bg-[#B80D2D] text-white">{vendor.experience}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{vendor.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{vendor.phone}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {vendor.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 