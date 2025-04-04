"use client"
import { PropertyHeader } from "./sections/PropertyHeader"
import { PropertyGallery } from "./sections/PropertyGallery"
import { PropertyHostInfo } from "./sections/PropertyHostInfo"
import { PropertyDescription } from "./sections/PropertyDescription"
import { PropertyAmenities } from "./sections/PropertyAmenities"
import { BookingCard } from "./sections/BookingCard"


export default function PropertyDetail({property}:any) {
  return (
    <main className="flex-1">
    <div className="container py-8">
      <PropertyHeader 
        title={property.title}
        location={property.location}
        rating={property.rating || 3}
        reviewsCount={property.reviews?.length}
      />

      <PropertyGallery coverImage={property.coverImage} images={property.images} title={property.title} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PropertyHostInfo 
            hostName="John Doe"
            beds={property.beds}
            baths={property.baths}
            maxGuests={property.maxGuests}
          />

          <PropertyDescription description={property.description} />
          <PropertyAmenities amenities={property.amenities} />
          {/* <PropertyLocation location={property.location} /> */}
          {/* <PropertyReviews rating={property.rating} reviews={property.reviews} /> */}
        </div>

        <div>
          <BookingCard
            pricePerNight={property.pricePerNight}
            rating={property.rating || 3}
            maxGuests={property.maxGuests || 2}
            cleaningFee={property.cleaningFee || 0}
            serviceFee={property.serviceFee || 0}
          />
        </div>
      </div>
    </div>
  </main>
  )
}