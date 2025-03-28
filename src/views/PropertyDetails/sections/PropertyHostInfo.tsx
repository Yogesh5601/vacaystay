"use client"

import Image from "next/image"

interface PropertyHostInfoProps {
  hostName: string
  beds: number
  baths: number
  maxGuests: number
}

export function PropertyHostInfo({ hostName, beds, baths, maxGuests }: PropertyHostInfoProps) {
  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-2">Hosted by {hostName}</h2>
          <p className="text-muted-foreground">
            {beds} beds • {baths} baths • Up to {maxGuests} guests
          </p>
        </div>
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1587837073080-448bc6a2329b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D" 
            alt="Host" 
            fill 
            className="object-cover" 
          />
        </div>
      </div>
    </div>
  )
}