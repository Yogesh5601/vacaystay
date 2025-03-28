import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import { popularDestinations } from '@/data'


const PopularDestination = () => {
  return (
    <section className=" py-12 md:py-16 w-full flex justify-center">
      <div className="container">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Popular Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularDestinations.map((destination) => (
          <Link key={destination.id} href={`/destinations/${destination.id}`} className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-bold text-lg">{destination.name}</h3>
                <p className="text-sm opacity-90">{destination.propertyCount} properties</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  )
}

export default PopularDestination


