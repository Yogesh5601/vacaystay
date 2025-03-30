import React from 'react'
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="w-full bg-muted flex justify-center py-12 px-4">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">VacayStay</h3>
          <p className="text-muted-foreground mb-4">
            Find and book the perfect vacation rental for your next trip.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/properties" className="text-muted-foreground hover:text-foreground">
                Properties
              </Link>
            </li>
            <li>
              <Link href="/destinations" className="text-muted-foreground hover:text-foreground">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/deals" className="text-muted-foreground hover:text-foreground">
                Deals & Offers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                Travel Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/press" className="text-muted-foreground hover:text-foreground">
                Press
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/help" className="text-muted-foreground hover:text-foreground">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/safety" className="text-muted-foreground hover:text-foreground">
                Safety Resources
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-muted-foreground/20 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} VacayStay. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer