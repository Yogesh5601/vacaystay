// app/destinations/page.tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { destinations, featuredDestinations, regions } from '@/data'
import Image from "next/image"
import Link from "next/link"
import { HeroSection } from "./Section/HeroSection"
import { DestinationCard } from "./Section/DestinationCard"
import { DestinationGrid } from "./Section/DestinationGrid"
import { RegionCard } from "./Section/ResionCard"

export default function Destinations() {
  return (
    <main className="flex-1">
      <HeroSection 
        title="Explore Destinations" 
        subtitle="Discover amazing vacation spots around the world."
      />

      <section className="container py-12">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All Destinations</TabsTrigger>
              <TabsTrigger value="beach">Beach</TabsTrigger>
              <TabsTrigger value="mountain">Mountain</TabsTrigger>
              <TabsTrigger value="city">City</TabsTrigger>
              <TabsTrigger value="countryside">Countryside</TabsTrigger>
            </TabsList>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                Map View
              </Button>
            </div>
          </div>

          <DestinationGrid destinations={destinations} />
          <DestinationGrid destinations={destinations} type="beach" />
          <DestinationGrid destinations={destinations} type="mountain" />
          <DestinationGrid destinations={destinations} type="city" />
          <DestinationGrid destinations={destinations} type="countryside" />
        </Tabs>
      </section>

      <section className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Featured Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredDestinations.map((destination) => (
            <DestinationCard 
              key={destination.id} 
              destination={destination} 
              variant="featured" 
            />
          ))}
        </div>
      </section>

      <section className="bg-muted py-12 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Popular Destinations by Region</h2>
            <p className="text-muted-foreground">Explore our most popular vacation spots across different regions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regions.map((region) => (
              <RegionCard key={region.name} region={region} />
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Travel Inspiration</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Not sure where to go next? Let us inspire your next adventure with our curated selection of amazing
                destinations.
              </p>
              <p>
                Whether you're looking for a relaxing beach getaway, an exciting city exploration, or a peaceful
                retreat in the mountains, we have the perfect destination for you.
              </p>
              <p>
                Our team of travel experts has personally visited each destination to ensure we recommend only the
                best experiences for our guests.
              </p>
            </div>
            <div className="mt-6">
              <Button asChild>
                <Link href="/blog">Visit Our Travel Blog</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Travel inspiration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-12 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Explore?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find your perfect vacation rental in any of our amazing destinations.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/properties">Browse All Properties</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}