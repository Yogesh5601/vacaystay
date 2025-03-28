// components/destination-grid.tsx
import { TabsContent } from "@/components/ui/tabs"
import { DestinationCard } from "./DestinationCard"

interface DestinationGridProps {
  destinations: any[]
  type?: string
}

export function DestinationGrid({ destinations, type }: DestinationGridProps) {
  const filteredDestinations = type 
    ? destinations.filter(d => d.type === type)
    : destinations

  return (
    <TabsContent value={type || "all"} className="mt-0 p-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {filteredDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </TabsContent>
  )
}