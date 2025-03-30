import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const CallToActiion = () => {
  return (
  
    <section className="bg-primary text-primary-foreground py-12 px-4 md:py-16 w-full flex justify-center">
    <div className="container text-center">
      <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Find Your Perfect Getaway?</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        Join thousands of happy travelers who have found their ideal vacation rentals through VacayStay.
      </p>
      <Button size="lg" variant="secondary" asChild>
        <Link href="/properties">Browse Properties</Link>
      </Button>
    </div>
  </section>
  )
}

export default CallToActiion