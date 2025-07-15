"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for services (copy from your dashboard/page.jsx)
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
]

const categories = ["All", ...new Set(services.map(s => s.category))];
const allSubcategories = Array.from(new Set(services.map(s => s.subcategory)));
const subcategoriesByCategory = {};
services.forEach(s => {
  if (!subcategoriesByCategory[s.category]) subcategoriesByCategory[s.category] = [];
  if (!subcategoriesByCategory[s.category].includes(s.subcategory)) {
    subcategoriesByCategory[s.category].push(s.subcategory);
  }
});

export default function ServiceSelectionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const router = useRouter();

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === "All" || service.subcategory === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const subcategoryOptions = selectedCategory === "All"
    ? ["All", ...allSubcategories]
    : ["All", ...(subcategoriesByCategory[selectedCategory] || [])];

  const handleServiceClick = (service) => {
    router.push(`/dashboard/services/${service.id}/vendors`);
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl py-8">
      <h1 className="text-3xl font-bold text-[#B80D2D] mb-6">Select a Service</h1>
      <div className="mb-6 grid md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={e => {
            setSelectedCategory(e.target.value);
            setSelectedSubcategory("All");
          }}
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
          {subcategoryOptions.map(subcat => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
        <Button variant="outline" onClick={() => {
          setSearchTerm("");
          setSelectedCategory("All");
          setSelectedSubcategory("All");
        }} className="border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Clear Filter
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-[#B80D2D]"
            onClick={() => handleServiceClick(service)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription className="mt-2">{service.description}</CardDescription>
                </div>
                <Badge variant="secondary">{service.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{service.vendors.length} Vendors Available</span>
                <Badge className="bg-[#B80D2D] text-white">{service.subcategory}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 