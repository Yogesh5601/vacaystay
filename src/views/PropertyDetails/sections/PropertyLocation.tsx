"use client"

import Image from "next/image"
import { MapPin } from "lucide-react"

interface PropertyLocationProps {
  location: string
}

export function PropertyLocation({ location }: PropertyLocationProps) {
  return (
    <div className="border-b pb-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Location</h2>
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
        <Image src="/placeholder.svg?height=400&width=800" alt="Map" fill className="object-cover" />
      </div>
      <p className="text-muted-foreground">
        {location}. The exact location will be provided after booking.
      </p>
    </div>
  )
}