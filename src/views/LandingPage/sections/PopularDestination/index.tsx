import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { popularDestinations } from '@/data'
import axios from 'axios'


const PopularDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/destinations');
        setDestinations(response.data.result.data.slice(0, 4));
     
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(destinations,"destinations")

  return (
    <section className=" py-12 px-4  md:py-16 w-full flex justify-center">
      <div className="container">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Popular Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {destinations?.map((destination:any) => (
          <Link key={destination._id} href={`/properties`} className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={destination.coverImage || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-bold text-lg">{destination.name}</h3>
                {/* <p className="text-sm opacity-90">{destination.propertyCount} properties</p> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  )
}

export default PopularDestination


