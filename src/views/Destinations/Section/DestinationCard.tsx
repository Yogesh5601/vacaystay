// components/destination-card.tsx
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin } from "lucide-react"



export const DestinationCard = ({ destination, variant = 'default' }:any) => {

  if (variant === 'featured') {
    return (
      <Link href={`/destinations/${destination.id}`}>
        <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow p-0">
          <div className="grid md:grid-cols-2 h-full">
            <div className="relative ">
              <Image
                src={destination.coverImage}
                alt={destination.name}
                fill
                className="object-cover "
              />
            </div>
            <div className="p-6 flex flex-col">
              <div>
                <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                <div className="flex items-center text-muted-foreground text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{destination.region}</span>
                </div>
                <p className="text-muted-foreground mb-4">{destination.description}</p>
              </div>
              <div className="mt-auto">
                <div className="flex items-center text-sm mb-4">
                  <span className="font-medium">{destination.propertyCount || 5} properties</span>
                  <span className="mx-2">•</span>
                  <span>from ${destination.priceFrom}/night</span>
                </div>
                <Button>Explore {destination.name}</Button>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/destinations/${destination._id}`}>
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow p-0">
        <div className="relative aspect-[4/3]">
          <Image
            src={destination.coverImage || "/placeholder.svg"}
            alt={destination.name}
            fill
            className="object-cover"
          />
          {destination.featured && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
              Featured
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
          <div className="flex items-center text-muted-foreground text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{destination.region}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{destination.description}</p>
          <div className="flex items-center text-sm">
            <span className="font-medium">{destination.propertyCount} properties</span>
            <span className="mx-2">•</span>
            <span>from ${destination.priceFrom}/night</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" className="w-full">
            Explore
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}