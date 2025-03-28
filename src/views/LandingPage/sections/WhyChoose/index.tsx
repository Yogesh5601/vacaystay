import React from 'react'
import Image from "next/image"

const WhyChoose = () => {
  return (
    <section className="bg-muted py-12 md:py-16 w-full flex justify-center">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose VacayStay?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Verified Properties</h3>
                <p className="text-muted-foreground">
                  All our properties are carefully verified for quality and accuracy.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Best Price Guarantee</h3>
                <p className="text-muted-foreground">
                  We offer competitive prices and match any lower price you find elsewhere.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                  <path d="M12 13v8" />
                  <path d="M5 13v6a2 2 0 0 0 2 2h8" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">24/7 Customer Support</h3>
                <p className="text-muted-foreground">
                  Our dedicated support team is available around the clock to assist you.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1554009975-d74653b879f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxob3RlbCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Happy family on vacation"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  </section>
  )
}

export default WhyChoose