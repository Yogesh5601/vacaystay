"use client"

interface PropertyDescriptionProps {
  description: string
}

export function PropertyDescription({ description }: PropertyDescriptionProps) {
  return (
    <div className="border-b pb-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">About this place</h2>
      <p className="text-muted-foreground mb-4">{description}</p>
      <p className="text-muted-foreground">
        This beautiful property offers all the amenities you need for a perfect vacation. Enjoy stunning
        views, modern furnishings, and a prime location close to local attractions.
      </p>
    </div>
  )
}