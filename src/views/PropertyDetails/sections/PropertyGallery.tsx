"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface PropertyGalleryProps {
  coverImage?: string
  images: string[]
  title: string
}

export function PropertyGallery({ coverImage, images, title }: PropertyGalleryProps) {
  console.log(coverImage,'imges')
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Combine cover image with other images
  const allImages = coverImage ? [coverImage, ...images] : [...images]
  

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Main cover image */}
        <div className="lg:col-span-2 relative aspect-[16/9] rounded-lg overflow-hidden">
          <Image
            src={coverImage || images[0] || "/placeholder.svg?height=600&width=800"}
            alt={title}
            fill
            className="object-cover cursor-pointer"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
            onClick={() => {
              setSelectedImageIndex(0)
              setIsGalleryOpen(true)
            }}
          />
        </div>

        {/* Thumbnail grid */}
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {(coverImage ? images.slice(0, 3) : images.slice(1, 5)).map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg?height=300&width=300"}
                alt={`${title} - Image ${index + 2}`}
                fill
                className="object-cover cursor-pointer"
                sizes="(max-width: 1200px) 0vw, 16vw"
                loading="lazy"
                onClick={() => {
                  setSelectedImageIndex(coverImage ? index + 1 : index + 1)
                  setIsGalleryOpen(true)
                }}
              />
            </div>
          ))}

          {/* Show "+X more" button if there are more images */}
          {images.length > (coverImage ? 3 : 4) && (
            <div
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
              onClick={() => {
                setSelectedImageIndex(0)
                setIsGalleryOpen(true)
              }}
            >
              <Button variant="secondary" className="z-10">
                +{images.length - (coverImage ? 3 : 4)} more
              </Button>
              {images[coverImage ? 3 : 4] && (
                <Image
                  src={images[coverImage ? 3 : 4] || "/placeholder.svg"}
                  alt={`${title} - Preview`}
                  fill
                  className="object-cover opacity-50"
                  sizes="(max-width: 1200px) 0vw, 16vw"
                  loading="lazy"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile view all button */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSelectedImageIndex(0)
            setIsGalleryOpen(true)
          }}
        >
          View all {allImages.length} photos
        </Button>
      </div>

      {/* Full Gallery Modal with Slider */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0  border-none overflow-hidden">
          <DialogTitle className="sr-only">Image Gallery: {title}</DialogTitle>

          <Carousel
            className="w-full h-full p-0"
            opts={{
              startIndex: selectedImageIndex,
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="h-full">
              {allImages.map((image, index) => (
                <CarouselItem key={index} className="h-full flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={image || "/placeholder.svg?height=800&width=1200"}
                      alt={`${title} - Image ${index + 1} of ${allImages.length}`}
                      width={1200}
                      height={800}
                      className="object-contain max-w-full max-h-[80vh] rounded-md"
                      priority={index === selectedImageIndex}
                      sizes="90vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 h-12 w-12" />
            <CarouselNext className="right-4 h-12 w-12" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  )
}

