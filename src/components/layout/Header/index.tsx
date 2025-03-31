import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import SignOutButton from '@/components/common/Buttons/SignOutButton';
import { Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authOptions } from '@/lib/auth'

const Header = async () => {
  const session = await getServerSession(authOptions)
  const isLoggedIn = !!session?.user
  const user = session?.user

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="w-full container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-white shadow-md">
              <DropdownMenuItem asChild>
                <Link href="/properties">Properties</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/destinations">Destinations</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
              {isLoggedIn && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">VacayStay</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="/properties" className="text-sm font-medium hover:underline underline-offset-4 transition-colors hover:text-primary">
            Properties
          </Link>
          <Link href="/destinations" className="text-sm font-medium hover:underline underline-offset-4 transition-colors hover:text-primary">
            Destinations
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4 transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4 transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white shadow-md">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/dashboard" className="hidden md:flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4 transition-colors hover:text-primary">
                {user?.image ? (
                  <Image 
                    src={user.image} 
                    alt="Profile" 
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                )}
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
              
              <SignOutButton  />
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4 transition-colors hover:text-primary">
                Login
              </Link>
              <Button asChild size="sm" className="hidden sm:flex">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
