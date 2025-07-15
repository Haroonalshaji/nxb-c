"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Star, MapPin, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";

// Mock data for vendors (should match your dashboard data)
const vendors = [
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
  // ... add all other vendors here ...
];

export default function VendorProfile() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const vendor = vendors.find(v => String(v.id) === String(id));

  const [open, setOpen] = useState(false);
  const [enquiry, setEnquiry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!vendor) {
    return (
      <div className="container mx-auto px-4 max-w-7xl py-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#B80D2D]">Vendor Not Found</h1>
          <Button onClick={() => router.back()}>Back</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle enquiry submission (API call, etc.)
    setOpen(false);
    setEnquiry("");
    setName("");
    setEmail("");
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6 bg-white">← Back to Vendors</Button>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row gap-8">
        {/* Left: Vendor Info */}
        <div className="flex-1 min-w-[250px]">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{vendor.name}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-lg font-medium">{vendor.rating}</span>
            </div>
            <span className="text-gray-500">({vendor.reviews} reviews)</span>
            <Badge className="bg-[#B80D2D] text-white">{vendor.experience}</Badge>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{vendor.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{vendor.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{vendor.email}</span>
            </div>
          </div>
        </div>
        {/* Right: Services & Actions */}
        <div className="flex-1 min-w-[250px] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Services Offered</h3>
            <div className="space-y-3">
              {vendor.services.map((service, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-[#B80D2D] rounded-full"></div>
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <Button className="w-full bg-[#B80D2D] hover:bg-[#9A0B26] text-white">Contact Vendor</Button>
            <Button
              variant="outline"
              className="w-full border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white bg-transparent"
              onClick={() => setOpen(true)}
            >
              Request Quote
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Enquiry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Enquiry</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows={4}
                value={enquiry}
                onChange={e => setEnquiry(e.target.value)}
                required
              />
            </div>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Close</Button>
              </DialogClose>
              <Button type="submit" className="bg-[#B80D2D] hover:bg-[#9A0B26] text-white">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 