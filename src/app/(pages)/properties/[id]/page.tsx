"use client"

import PropertyDetail from "@/views/PropertyDetails"
import { use } from "react"

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const property = properties.find((p) => p.id.toString() === id) || properties[0]

  return (
    <div className="flex flex-col min-h-screen">
      <PropertyDetail property={property} />
    </div>
  )
}


const properties = [
  {
    id: 1,
    title: "Luxury Beach Villa",
    location: "Malibu, CA",
    description:
      "Stunning beachfront villa with panoramic ocean views, private pool, and direct beach access. This spacious property features modern architecture, floor-to-ceiling windows, and an open floor plan perfect for entertaining. Enjoy breathtaking sunsets from the expansive deck or take a short walk to the pristine beach.",
    images: [
      "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGhvdGVsJTIwaW1hZ2VzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGhvdGVsJTIwaW1hZ2VzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGhvdGVsJTIwaW1hZ2VzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGhvdGVsJTIwaW1hZ2VzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1440151050977-247552660a3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fGhvdGVsJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    ],

    pricePerNight: 499,
    cleaningFee: 150,
    serviceFee: 100,
    beds: 4,
    baths: 3,
    maxGuests: 8,
    rating: 4.9,
    amenities: [
      "Ocean view",
      "Private pool",
      "Direct beach access",
      "Fully equipped kitchen",
      "Free WiFi",
      "Smart TV",
      "Air conditioning",
      "Washer & dryer",
      "Free parking",
      "Outdoor grill",
      "Fireplace",
      "Deck/patio",
    ],
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        date: "August 2023",
        comment:
          "We had an amazing stay at this beautiful beach villa. The views are even better than the pictures show. The host was very responsive and made sure we had everything we needed. We'll definitely be back!",
        avatar: "https://images.unsplash.com/photo-1587837073080-448bc6a2329b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Michael Brown",
        rating: 5,
        date: "July 2023",
        comment:
          "Perfect location right on the beach. The house is beautifully designed and has everything you need for a luxury vacation. Highly recommend!",
        avatar: "https://images.unsplash.com/photo-1587837073080-448bc6a2329b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Emily Davis",
        rating: 4,
        date: "June 2023",
        comment:
          "Gorgeous property with stunning views. The only reason for 4 stars instead of 5 is that the air conditioning in one bedroom wasn't working properly. The host was quick to respond but couldn't get it fixed during our stay.",
        avatar: "https://images.unsplash.com/photo-1587837073080-448bc6a2329b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "David Wilson",
        rating: 5,
        date: "May 2023",
        comment:
          "This place is a slice of paradise. We loved waking up to the sound of waves and having coffee on the deck overlooking the ocean. Can't wait to come back!",
        avatar: "https://images.unsplash.com/photo-1587837073080-448bc6a2329b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Jennifer Lee",
        rating: 3,
        date: "April 2023",
        comment:
          "The location and views are amazing, but we found the furniture to be a bit worn and outdated compared to the photos. The host was very nice though.",
        avatar: "https://images.unsplash.com/photo-1587837073080-448bc6a2329b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
  },
]

