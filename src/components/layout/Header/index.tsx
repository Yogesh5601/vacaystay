import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold">VacayStay</span>
      </Link>
      <nav className="hidden md:flex gap-6">
        <Link href="/properties" className="text-sm font-medium hover:underline underline-offset-4">
          Properties
        </Link>
        <Link href="/destinations" className="text-sm font-medium hover:underline underline-offset-4">
          Destinations
        </Link>
        <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
          About
        </Link>
        <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
          Login
        </Link>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  </header>
  )
}

export default Header