"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <div className="lg:col-span-2 relative aspect-[16/9] rounded-lg overflow-hidden">
        <Image
          src={images[0] || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="hidden lg:grid grid-cols-2 gap-4">
        {images.slice(1, 5).map((image, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - Image ${index + 2}`}
              fill
              className="object-cover"
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Button variant="secondary">+{images.length - 5} more</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}