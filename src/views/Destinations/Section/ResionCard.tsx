// components/region-card.tsx
import Image from "next/image"
import { Card } from "@/components/ui/card"

interface Region {
  name: string
  image?: string
  destinationCount: number
}

export function RegionCard({ region }: { region: Region }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3]">
        <Image src={region.image || "/placeholder.svg"} alt={region.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="font-bold text-xl">{region.name}</h3>
          <p className="text-sm opacity-90">{region.destinationCount} destinations</p>
        </div>
      </div>
    </Card>
  )
}