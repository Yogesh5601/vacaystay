"use client"

import { Check } from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  return (
    <div className="border-b pb-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center">
            <Check className="h-5 w-5 mr-2 text-primary" />
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}