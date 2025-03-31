import React, { useState } from 'react'
import Hero from './sections/Hero'
import CallToActiion from './sections/CallToAction'
import Testimanial from './sections/Testimonials'
import FeaturedProperties from './sections/FeaturedProperties'
import PopularDestination from './sections/PopularDestination'
import WhyChoose from './sections/WhyChoose'


const LandingPage = () => {

 
  return (
    <main className="space-y-4 w-full">
      <Hero />
      <PopularDestination />
      <FeaturedProperties />
      <WhyChoose />     
      <Testimanial />
      <CallToActiion />
    </main>
  )
}

export default LandingPage








