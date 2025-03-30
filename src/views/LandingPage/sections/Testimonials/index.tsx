import { Card } from '@/components/ui/card'
import React from 'react'
import Image from "next/image"
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import { testimonials } from '@/data'



const Testimanial = () => {
  return (
    <section className="py-12 px-4  md:py-16 w-full flex justify-center">
    <div className="container">
    <h2 className="text-3xl font-bold tracking-tight text-center mb-8">What Our Guests Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">{testimonial.name}</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">{testimonial.comment}</p>
        </Card>
      ))}
    </div>
    </div>
  </section>
  )
}

export default Testimanial


