import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import { PropertyCard } from '@/components/common/PropertyCard'
import { featuredProperties } from '@/data'


const FeaturedProperties = () => {
  return (
    <section className=" py-12 md:py-16 w-full flex justify-center">
     <div className="container">
     <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
        <Button variant="outline" asChild>
          <Link href="/properties">View all</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProperties.map((property) => (
        <PropertyCard property={property} key={property.id}/>
        ))}
      </div>
     </div>
    </section>
  )
}

export default FeaturedProperties



