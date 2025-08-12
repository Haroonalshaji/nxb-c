"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Search,
    Filter,
    MapPin,
    Star,
    Grid,
    List,
    SlidersHorizontal,
    X,
    Building,
    Users,
    ArrowRight,
} from "lucide-react"

// Dummy data structure
const dummyServices = [
    {
        id: 1,
        businessName: "Elite Electrical Solutions",
        category: "Electrical Works",
        subCategory: "Commercial Electrical",
        description:
            "Professional electrical installation and maintenance services for commercial and residential projects.",
        location: "Dubai",
        rating: 4.8,
        reviewCount: 127,
        verified: true,
        premium: true,
        yearsExperience: 8,
        projectsCompleted: 250,
        phone: "+971 50 123 4567",
        email: "info@eliteelectrical.ae",
        website: "www.eliteelectrical.ae",
        services: ["Electrical Installation", "Maintenance", "Emergency Repairs", "Smart Home Automation"],
        image: "/placeholder.svg?height=200&width=300&text=Elite+Electrical",
        priceRange: "AED 500 - 5000",
        availability: "Available",
    },
    {
        id: 2,
        businessName: "Premium HVAC Systems",
        category: "HVAC Works",
        subCategory: "Air Conditioning",
        description: "Complete HVAC solutions including installation, maintenance, and repair services across UAE.",
        location: "Abu Dhabi",
        rating: 4.9,
        reviewCount: 89,
        verified: true,
        premium: false,
        yearsExperience: 12,
        projectsCompleted: 180,
        phone: "+971 50 987 6543",
        email: "contact@premiumhvac.ae",
        website: "www.premiumhvac.ae",
        services: ["AC Installation", "Duct Cleaning", "Maintenance", "Ventilation Systems"],
        image: "/placeholder.svg?height=200&width=300&text=Premium+HVAC",
        priceRange: "AED 800 - 8000",
        availability: "Available",
    },
    {
        id: 3,
        businessName: "Master Plumbing Works",
        category: "Plumbing Works",
        subCategory: "Residential Plumbing",
        description: "Expert plumbing services for homes and offices with 24/7 emergency support.",
        location: "Sharjah",
        rating: 4.6,
        reviewCount: 156,
        verified: true,
        premium: false,
        yearsExperience: 6,
        projectsCompleted: 320,
        phone: "+971 50 456 7890",
        email: "info@masterplumbing.ae",
        website: "www.masterplumbing.ae",
        services: ["Pipe Installation", "Leak Repairs", "Bathroom Fitting", "Emergency Services"],
        image: "/placeholder.svg?height=200&width=300&text=Master+Plumbing",
        priceRange: "AED 200 - 3000",
        availability: "Busy",
    },
    {
        id: 4,
        businessName: "Artistic Gypsum Designs",
        category: "Gypsum Works",
        subCategory: "Decorative Gypsum",
        description: "Creative gypsum board installation and decorative ceiling designs for modern interiors.",
        location: "Dubai",
        rating: 4.7,
        reviewCount: 94,
        verified: true,
        premium: true,
        yearsExperience: 10,
        projectsCompleted: 145,
        phone: "+971 50 234 5678",
        email: "design@artisticgypsum.ae",
        website: "www.artisticgypsum.ae",
        services: ["Ceiling Design", "Wall Partitions", "Decorative Elements", "False Ceiling"],
        image: "/placeholder.svg?height=200&width=300&text=Artistic+Gypsum",
        priceRange: "AED 1000 - 10000",
        availability: "Available",
    },
    {
        id: 5,
        businessName: "Luxury Joinery Workshop",
        category: "Joinery",
        subCategory: "Custom Furniture",
        description: "Bespoke joinery and custom furniture solutions for residential and commercial spaces.",
        location: "Dubai",
        rating: 4.9,
        reviewCount: 73,
        verified: true,
        premium: true,
        yearsExperience: 15,
        projectsCompleted: 98,
        phone: "+971 50 345 6789",
        email: "orders@luxuryjoinery.ae",
        website: "www.luxuryjoinery.ae",
        services: ["Custom Furniture", "Kitchen Cabinets", "Wardrobes", "Office Furniture"],
        image: "/placeholder.svg?height=200&width=300&text=Luxury+Joinery",
        priceRange: "AED 2000 - 20000",
        availability: "Available",
    },
    {
        id: 6,
        businessName: "Smart Glass Solutions",
        category: "Internal Glass Partitions",
        subCategory: "Office Partitions",
        description: "Modern glass partition systems for offices and commercial spaces with smart glass technology.",
        location: "Abu Dhabi",
        rating: 4.5,
        reviewCount: 62,
        verified: true,
        premium: false,
        yearsExperience: 7,
        projectsCompleted: 87,
        phone: "+971 50 567 8901",
        email: "info@smartglass.ae",
        website: "www.smartglass.ae",
        services: ["Glass Partitions", "Smart Glass", "Shower Enclosures", "Glass Doors"],
        image: "/placeholder.svg?height=200&width=300&text=Smart+Glass",
        priceRange: "AED 1500 - 15000",
        availability: "Available",
    },
    {
        id: 7,
        businessName: "Royal Furniture Makers",
        category: "Custom Furniture Supply",
        subCategory: "Luxury Furniture",
        description: "High-end custom furniture manufacturing and supply for luxury residential and commercial projects.",
        location: "Dubai",
        rating: 4.8,
        reviewCount: 45,
        verified: true,
        premium: true,
        yearsExperience: 20,
        projectsCompleted: 67,
        phone: "+971 50 678 9012",
        email: "royal@furnituremakers.ae",
        website: "www.royalfurniture.ae",
        services: ["Luxury Furniture", "Custom Design", "Hotel Furniture", "Residential Sets"],
        image: "/placeholder.svg?height=200&width=300&text=Royal+Furniture",
        priceRange: "AED 5000 - 50000",
        availability: "Available",
    },
    {
        id: 8,
        businessName: "Stone Masters UAE",
        category: "Stone Supply & Installation",
        subCategory: "Natural Stone",
        description: "Premium natural and engineered stone supply and installation for construction projects.",
        location: "Sharjah",
        rating: 4.6,
        reviewCount: 118,
        verified: true,
        premium: false,
        yearsExperience: 11,
        projectsCompleted: 203,
        phone: "+971 50 789 0123",
        email: "stones@stonemasters.ae",
        website: "www.stonemasters.ae",
        services: ["Marble Installation", "Granite Supply", "Stone Cladding", "Countertops"],
        image: "/placeholder.svg?height=200&width=300&text=Stone+Masters",
        priceRange: "AED 800 - 12000",
        availability: "Available",
    },
]

const categories = [
    "Electrical Works",
    "HVAC Works",
    "Plumbing Works",
    "Gypsum Works",
    "Joinery",
    "Internal Glass Partitions",
    "Custom Furniture Supply",
    "Stone Supply & Installation",
]

const locations = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"]

export default function ServicesListingPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [sortBy, setSortBy] = useState("rating")
    const [viewMode, setViewMode] = useState("grid")
    const [showFilters, setShowFilters] = useState(false)
    const [verifiedOnly, setVerifiedOnly] = useState(false)
    const [premiumOnly, setPremiumOnly] = useState(false)
    const [availableOnly, setAvailableOnly] = useState(false)
    const [minRating, setMinRating] = useState(0)

    // Filter and search logic
    const filteredServices = useMemo(() => {
        const filtered = dummyServices.filter((service) => {
            const matchesSearch =
                service.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.services.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(service.category)
            const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(service.location)
            const matchesVerified = !verifiedOnly || service.verified
            const matchesPremium = !premiumOnly || service.premium
            const matchesAvailable = !availableOnly || service.availability === "Available"
            const matchesRating = service.rating >= minRating

            return (
                matchesSearch &&
                matchesCategory &&
                matchesLocation &&
                matchesVerified &&
                matchesPremium &&
                matchesAvailable &&
                matchesRating
            )
        })

        // Sort results
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "rating":
                    return b.rating - a.rating
                case "reviews":
                    return b.reviewCount - a.reviewCount
                case "experience":
                    return b.yearsExperience - a.yearsExperience
                case "name":
                    return a.businessName.localeCompare(b.businessName)
                default:
                    return 0
            }
        })

        return filtered
    }, [searchTerm, selectedCategories, selectedLocations, sortBy, verifiedOnly, premiumOnly, availableOnly, minRating])

    const handleCategoryChange = (category, checked) => {
        console.log(selectedCategories)
        if (checked) {
            setSelectedCategories([...selectedCategories, category])
        } else {
            setSelectedCategories(selectedCategories.filter((c) => c !== category))
        }
    }

    const handleLocationChange = (location, checked) => {
        if (checked) {
            setSelectedLocations([...selectedLocations, location])
        } else {
            setSelectedLocations(selectedLocations.filter((l) => l !== location))
        }
    }

    const clearAllFilters = () => {
        setSelectedCategories([])
        setSelectedLocations([])
        setVerifiedOnly(false)
        setPremiumOnly(false)
        setAvailableOnly(false)
        setMinRating(0)
        setSearchTerm("")
    }

    const activeFiltersCount =
        selectedCategories.length +
        selectedLocations.length +
        (verifiedOnly ? 1 : 0) +
        (premiumOnly ? 1 : 0) +
        (availableOnly ? 1 : 0) +
        (minRating > 0 ? 1 : 0)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-white">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#B93239] via-[#A02A31] to-[#8B1E25] text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Browse All Services</h1>
                        <p className="text-xl opacity-90 mb-8">
                            Discover verified vendors across 90+ service categories in the UAE
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    placeholder="Search for services, vendors, or categories..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 pr-4 h-14 text-lg text-black bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm sticky top-6">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <SlidersHorizontal className="h-5 w-5 mr-2" />
                                        Filters
                                    </h2>
                                    {activeFiltersCount > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearAllFilters}
                                            className="text-[#B93239] hover:text-[#A02A31] hover:bg-[#B93239]/10"
                                        >
                                            Clear All ({activeFiltersCount})
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Quick Filters */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Quick Filters</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="verified" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                                            <label htmlFor="verified" className="text-sm text-gray-700">
                                                Verified Only
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="premium" checked={premiumOnly} onCheckedChange={setPremiumOnly} />
                                            <label htmlFor="premium" className="text-sm text-gray-700">
                                                Premium Partners
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="available" checked={availableOnly} onCheckedChange={setAvailableOnly} />
                                            <label htmlFor="available" className="text-sm text-gray-700">
                                                Available Now
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Rating Filter */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Minimum Rating</h3>
                                    <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Any rating" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Any rating</SelectItem>
                                            <SelectItem value="3">3+ stars</SelectItem>
                                            <SelectItem value="4">4+ stars</SelectItem>
                                            <SelectItem value="4.5">4.5+ stars</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Categories */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {categories.map((category) => (
                                            <div key={category} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={category}
                                                    checked={selectedCategories.includes(category)}
                                                    onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                                                />
                                                <label htmlFor={category} className="text-sm text-gray-700">
                                                    {category}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Locations */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Locations</h3>
                                    <div className="space-y-2">
                                        {locations.map((location) => (
                                            <div key={location} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={location}
                                                    checked={selectedLocations.includes(location)}
                                                    onCheckedChange={(checked) => handleLocationChange(location, checked )}
                                                />
                                                <label htmlFor={location} className="text-sm text-gray-700">
                                                    {location}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Controls Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                                </Button>
                                <p className="text-gray-600">
                                    <span className="font-medium">{filteredServices.length}</span> services found
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Sort */}
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="rating">Highest Rated</SelectItem>
                                        <SelectItem value="reviews">Most Reviews</SelectItem>
                                        <SelectItem value="experience">Most Experience</SelectItem>
                                        <SelectItem value="name">Name A-Z</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* View Mode */}
                                <div className="flex border border-gray-200 rounded-lg">
                                    <Button
                                        variant={viewMode === "grid" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                        className="rounded-r-none"
                                    >
                                        <Grid className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === "list" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("list")}
                                        className="rounded-l-none"
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {activeFiltersCount > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedCategories.map((category) => (
                                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                                        {category}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(category, false)} />
                                    </Badge>
                                ))}
                                {selectedLocations.map((location) => (
                                    <Badge key={location} variant="secondary" className="flex items-center gap-1">
                                        {location}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleLocationChange(location, false)} />
                                    </Badge>
                                ))}
                                {verifiedOnly && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        Verified Only
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => setVerifiedOnly(false)} />
                                    </Badge>
                                )}
                                {premiumOnly && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        Premium Partners
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => setPremiumOnly(false)} />
                                    </Badge>
                                )}
                                {availableOnly && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        Available Now
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => setAvailableOnly(false)} />
                                    </Badge>
                                )}
                                {minRating > 0 && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        {minRating}+ stars
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => setMinRating(0)} />
                                    </Badge>
                                )}
                            </div>
                        )}

                        {/* Services Grid/List */}
                        {filteredServices.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Search className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
                                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                                <Button onClick={clearAllFilters} variant="outline">
                                    Clear All Filters
                                </Button>
                            </div>
                        ) : (
                            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                                {filteredServices.map((service) => (
                                    <Card
                                        key={service.id}
                                        className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${viewMode === "list" ? "flex" : ""}`}
                                    >
                                        {viewMode === "grid" ? (
                                            <>
                                                <div className="relative">
                                                    <img
                                                        src={service.image || "/placeholder.svg"}
                                                        alt={service.businessName}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                    {service.premium && (
                                                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0">
                                                            Premium
                                                        </Badge>
                                                    )}
                                                    {service.verified && (
                                                        <Badge className="absolute top-3 right-3 bg-green-500 text-white border-0">Verified</Badge>
                                                    )}
                                                </div>
                                                <CardHeader className="pb-3">
                                                    <CardTitle className="text-lg">{service.businessName}</CardTitle>
                                                    <div className="flex items-center justify-between">
                                                        <Badge variant="outline" className="text-xs">
                                                            {service.category}
                                                        </Badge>
                                                        <div className="flex items-center space-x-1">
                                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-sm font-medium">{service.rating}</span>
                                                            <span className="text-xs text-gray-500">({service.reviewCount})</span>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pt-0">
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                                                    <div className="space-y-2 mb-4">
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <MapPin className="h-4 w-4 mr-2" />
                                                            {service.location}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <Building className="h-4 w-4 mr-2" />
                                                            {service.yearsExperience} years experience
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <Users className="h-4 w-4 mr-2" />
                                                            {service.projectsCompleted} projects completed
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-1 mb-4">
                                                        {service.services.slice(0, 3).map((svc, idx) => (
                                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                                {svc}
                                                            </Badge>
                                                        ))}
                                                        {service.services.length > 3 && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                +{service.services.length - 3} more
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium text-[#B93239]">{service.priceRange}</span>
                                                        <Button size="sm" className="bg-[#B93239] hover:bg-[#A02A31]">
                                                            View Details
                                                            <ArrowRight className="h-4 w-4 ml-1" />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-48 flex-shrink-0">
                                                    <img
                                                        src={service.image || "/placeholder.svg"}
                                                        alt={service.businessName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 p-6">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="text-lg font-semibold">{service.businessName}</h3>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Badge variant="outline" className="text-xs">
                                                                    {service.category}
                                                                </Badge>
                                                                {service.premium && (
                                                                    <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0 text-xs">
                                                                        Premium
                                                                    </Badge>
                                                                )}
                                                                {service.verified && (
                                                                    <Badge className="bg-green-500 text-white border-0 text-xs">Verified</Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-sm font-medium">{service.rating}</span>
                                                            <span className="text-xs text-gray-500">({service.reviewCount})</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>

                                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                        <div className="flex items-center">
                                                            <MapPin className="h-4 w-4 mr-1" />
                                                            {service.location}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Building className="h-4 w-4 mr-1" />
                                                            {service.yearsExperience} years
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Users className="h-4 w-4 mr-1" />
                                                            {service.projectsCompleted} projects
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium text-[#B93239]">{service.priceRange}</span>
                                                        <Button size="sm" className="bg-[#B93239] hover:bg-[#A02A31]">
                                                            View Details
                                                            <ArrowRight className="h-4 w-4 ml-1" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Load More */}
                        {filteredServices.length > 0 && (
                            <div className="text-center mt-12">
                                <Button variant="outline" size="lg">
                                    Load More Services
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
