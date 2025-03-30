"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Review {
  name: string
  rating: number
  date: string
  comment: string
  avatar?: string
}

interface PropertyReviewsProps {
  rating: number
  reviews: Review[]
}

export function PropertyReviews({ rating, reviews }: PropertyReviewsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="flex items-center">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-medium">{rating}</span>
          <span className="text-muted-foreground ml-1">({reviews?.length || 3} reviews)</span>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {renderReviews(reviews)}
        </TabsContent>
        
        <TabsContent value="positive" className="space-y-6">
          {renderReviews(reviews?.filter(r => r.rating >= 4))}
        </TabsContent>
        
        <TabsContent value="critical" className="space-y-6">
          {renderReviews(reviews?.filter(r => r.rating < 4))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function renderReviews(reviews: Review[]) {
  return reviews?.map((review, index) => (
    <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
      <div className="flex items-start mb-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-4">
          <Image
            src={review.avatar || "/placeholder.svg"}
            alt={review.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{review.name}</h3>
          <p className="text-sm text-muted-foreground">{review.date}</p>
        </div>
      </div>
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted",
            )}
          />
        ))}
      </div>
      <p className="text-muted-foreground">{review.comment}</p>
    </div>
  ))
}