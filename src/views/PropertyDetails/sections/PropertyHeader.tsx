"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Heart } from "lucide-react"

interface PropertyHeaderProps {
  title: string
  location: string
  rating: number
  reviewsCount: number
}

export function PropertyHeader({ title, location, rating, reviewsCount }: PropertyHeaderProps) {
  return (
    <div className="mb-8">
      <Link href="/properties" className="text-sm text-muted-foreground hover:underline mb-4 inline-block">
        &larr; Back to Properties
      </Link>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
          <div className="flex items-center mt-2 text-muted-foreground flex-wrap gap-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="whitespace-nowrap">{location}</span>
            <div className="mx-2 hidden sm:block">•</div>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>
                {rating} ({reviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}