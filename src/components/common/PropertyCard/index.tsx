// components/property-card.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { MapPin, Star } from 'lucide-react'

interface PropertyCardProps {
  property: any
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link href={`/properties/${property._id}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-lg h-full flex flex-col p-0">
        <div className="relative aspect-video">
          <Image
            src={property.coverImage}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
            ${property.pricePerNight}/night
          </div>
        </div>
        <CardContent className="p-4 flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center bg-secondary rounded-full px-2 py-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm">{property.rating}</span>
            </div>
          </div>
          <div className="flex items-center text-muted-foreground text-sm mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.location}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {property.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{property.beds} beds</span> · {property.baths} baths
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}