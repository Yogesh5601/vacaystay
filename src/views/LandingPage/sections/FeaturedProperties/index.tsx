import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { PropertyCard } from '@/components/common/PropertyCard'
import { featuredProperties } from '@/data'
import axios from 'axios'


const FeaturedProperties = ({properties}:any) => {


  
  return (
    <section className=" py-12 px-4  md:py-16 w-full flex justify-center">
     <div className="container">
     <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
        <Button variant="outline" asChild>
          <Link href="/properties">View all</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property:any) => (
        <PropertyCard property={property} key={property._id}/>
        ))}
      </div>
     </div>
    </section>
  )
}

export default FeaturedProperties



