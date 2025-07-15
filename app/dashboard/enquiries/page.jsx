"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for user enquiries
const enquiries = [
  {
    id: 1,
    vendor: "Premium Roof Solutions",
    vendorId: 2,
    date: "2024-07-12",
    name: "John Doe",
    email: "john@example.com",
    message: "I would like a quote for metal roofing.",
    status: "Pending",
  },
  {
    id: 2,
    vendor: "Modern Ceiling Designs",
    vendorId: 3,
    date: "2024-07-10",
    name: "John Doe",
    email: "john@example.com",
    message: "Need a drop ceiling for my office.",
    status: "Responded",
  },
];

export default function EnquiriesPage() {
  return (
    <div className="container mx-auto px-4 max-w-7xl py-8">
      <h1 className="text-3xl font-bold text-[#B80D2D] mb-6">My Enquiries</h1>
      <div className="grid gap-6">
        {enquiries.length === 0 ? (
          <div className="text-gray-500">No enquiries found.</div>
        ) : (
          enquiries.map((enquiry) => (
            <Card key={enquiry.id} className="shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">
                  <span className="font-semibold">{enquiry.vendor}</span>
                  <span className="ml-2 text-sm text-gray-400">({enquiry.date})</span>
                </CardTitle>
                <Badge className={enquiry.status === "Pending" ? "bg-yellow-500 text-white" : "bg-green-600 text-white"}>{enquiry.status}</Badge>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-gray-700">
                  <span className="font-medium">To:</span> {enquiry.vendor}
                </div>
                <div className="mb-2 text-gray-700">
                  <span className="font-medium">Your Name:</span> {enquiry.name}
                </div>
                <div className="mb-2 text-gray-700">
                  <span className="font-medium">Your Email:</span> {enquiry.email}
                </div>
                <div className="mb-2 text-gray-700">
                  <span className="font-medium">Message:</span> {enquiry.message}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 