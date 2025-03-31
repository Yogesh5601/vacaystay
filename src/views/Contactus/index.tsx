import React from 'react'
import { useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { HeroSection } from './Sections/heroSection'
import { ContactForm } from './Sections/ContactForm'
import { ContactInfoCard } from './Sections/ContactInfoCard'
import { SocialLinks } from './Sections/SocialLinks'
import { FAQSection } from './Sections/FAQSection'

const Contactus = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const handleReset = () => {
    setFormSubmitted(false)
  }

  return (
    <main className="flex-1">
      <HeroSection 
        title="Contact Us"
        subtitle="We're here to help with any questions about your stay."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdCUyMHVzfGVufDB8fDB8fHww"
      />

      <section className="container py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div id="contact-form">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have questions about a property, booking, or anything else? We&apos;re here to help! Fill out the form and
              our team will get back to you as soon as possible.
            </p>

            <ContactForm 
              onSubmit={handleSubmit}
              onReset={handleReset}
              submitted={formSubmitted}
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ContactInfoCard 
                icon={<MapPin className="h-5 w-5 text-primary" />}
                title="Our Office"
              >
                <address className="not-italic">
                  123 Vacation Way
                  <br />
                  Suite 400
                  <br />
                  San Francisco, CA 94103
                  <br />
                  United States
                </address>
              </ContactInfoCard>

              <ContactInfoCard 
                icon={<Clock className="h-5 w-5 text-primary" />}
                title="Office Hours"
              >
                <p>Monday - Friday: 9am - 6pm</p>
                <p>Saturday: 10am - 4pm</p>
                <p>Sunday: Closed</p>
              </ContactInfoCard>

              <ContactInfoCard 
                icon={<Phone className="h-5 w-5 text-primary" />}
                title="Phone"
              >
                <p>US: +1 (555) 123-4567</p>
                <p>International: +1 (555) 987-6543</p>
                <p className="text-sm mt-1">Customer support available 24/7</p>
              </ContactInfoCard>

              <ContactInfoCard 
                icon={<Mail className="h-5 w-5 text-primary" />}
                title="Email"
              >
                <p>General: info@vacaystay.com</p>
                <p>Support: support@vacaystay.com</p>
                <p>Bookings: bookings@vacaystay.com</p>
              </ContactInfoCard>
            </div>

            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-6">
              <Image src="https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFwfGVufDB8fDB8fHww" alt="Map" fill className="object-cover" />
            </div>

            <SocialLinks />
          </div>
        </div>
      </section>

      <section className="bg-muted py-12 md:py-24">
        <div className="container">
          <FAQSection />
        </div>
      </section>
    </main>
  )
}

export default Contactus