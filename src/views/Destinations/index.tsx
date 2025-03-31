import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import Link from "next/link"
import { HeroSection } from "./Section/HeroSection"
import { DestinationCard } from "./Section/DestinationCard"
import { DestinationGrid } from "./Section/DestinationGrid"

const categoryFilters = ["all", "beach", "mountain", "city", "countryside"]

const Destinations = ({ destinations}: any) => {
  console.log(destinations,"data")
  return (
    <main className="flex-1 px-4 py-6">
      <HeroSection 
        title="Explore Destinations" 
        subtitle="Discover amazing vacation spots around the world."
      />

      <section className="container pt-12 py-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center pb-6">
            <TabsList>
              {categoryFilters.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                Map View
              </Button>
            </div>
          </div>

          {categoryFilters.map((category) => (
            <DestinationGrid key={category} destinations={destinations} type={category !== "all" ? category : undefined} />
          ))}
        </Tabs>

        {/* <Pagination page={page} setPage={setPage} totalPages={totalPages} /> */}
      </section>

      <section className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Featured Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((destination: any) => (
            <DestinationCard key={destination._id} destination={destination} variant="featured" />
          ))}
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

export default Destinations
