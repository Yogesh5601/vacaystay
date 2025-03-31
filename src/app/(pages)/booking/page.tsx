"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, CreditCard, Calendar, Users } from "lucide-react"

export default function BookingPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="flex flex-col min-h-screen px-4 ">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
      <main className="flex-1 container py-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
            <p className="text-muted-foreground">You&apos;re just a few steps away from your dream vacation.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Your Trip</h2>
                  <Link href="/properties/1" className="text-sm text-primary hover:underline">
                    Edit
                  </Link>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src="/placeholder.svg?height=200&width=200"
                          alt="Property"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">Luxury Beach Villa</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Malibu, CA</span>
                        </div>
                        <div className="flex items-center text-sm gap-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Aug 15 - Aug 20, 2023</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>2 guests</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium mr-3">
                    1
                  </div>
                  <h2 className="text-xl font-semibold">Guest Information</h2>
                </div>

                {step >= 1 && (
                  <Card className={step > 1 ? "opacity-70" : ""}>
                    <CardContent className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="Enter your first name" disabled={step > 1} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Enter your last name" disabled={step > 1} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter your email" disabled={step > 1} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter your phone number" disabled={step > 1} />
                      </div>

                      {step === 1 && (
                        <Button className="w-full" onClick={() => setStep(2)}>
                          Continue to Payment
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} font-medium`}
                  >
                    2
                  </div>
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                </div>

                {step >= 2 && (
                  <Card className={step > 2 ? "opacity-70" : ""}>
                    <CardContent className="p-6 space-y-4">
                      <Tabs defaultValue="card">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="card">Credit Card</TabsTrigger>
                          <TabsTrigger value="paypal">PayPal</TabsTrigger>
                          <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                        </TabsList>
                        <TabsContent value="card" className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-name">Name on Card</Label>
                            <Input id="card-name" placeholder="Enter name on card" disabled={step > 2} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="0000 0000 0000 0000" disabled={step > 2} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" disabled={step > 2} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" disabled={step > 2} />
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="paypal" className="pt-4">
                          <div className="text-center py-8">
                            <div className="mb-4">
                              <Image
                                src="/placeholder.svg?height=60&width=120"
                                alt="PayPal"
                                width={120}
                                height={60}
                                className="mx-auto"
                              />
                            </div>
                            <p className="text-muted-foreground mb-4">
                              You will be redirected to PayPal to complete your payment securely.
                            </p>
                            <Button variant="outline" className="mx-auto">
                              Continue with PayPal
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="bank" className="pt-4">
                          <div className="space-y-4">
                            <div className="p-4 bg-muted rounded-lg">
                              <p className="font-medium">Bank Account Details</p>
                              <p className="text-sm text-muted-foreground">
                                Please use the following details to make your transfer:
                              </p>
                              <div className="mt-2 space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">Bank:</span> National Bank
                                </p>
                                <p>
                                  <span className="font-medium">Account Name:</span> VacayStay Inc.
                                </p>
                                <p>
                                  <span className="font-medium">Account Number:</span> 1234567890
                                </p>
                                <p>
                                  <span className="font-medium">Routing Number:</span> 987654321
                                </p>
                                <p>
                                  <span className="font-medium">Reference:</span> BOOKING-12345
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Please note that your booking will be confirmed once we receive your payment. This
                              typically takes 1-3 business days.
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="space-y-2">
                        <Label htmlFor="billing-address">Billing Address</Label>
                        <Input id="billing-address" placeholder="Enter your address" disabled={step > 2} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="City" disabled={step > 2} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="State" disabled={step > 2} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">Zip Code</Label>
                          <Input id="zip" placeholder="Zip code" disabled={step > 2} />
                        </div>
                      </div>

                      {step === 2 && (
                        <Button className="w-full" onClick={() => setStep(3)}>
                          Continue to Review
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} font-medium`}
                  >
                    3
                  </div>
                  <h2 className="text-xl font-semibold">Review & Confirm</h2>
                </div>

                {step >= 3 && (
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Cancellation Policy</h3>
                          <p className="text-sm text-muted-foreground">
                            Free cancellation before August 10, 2023. Cancel before check-in on August 15, 2023 for a
                            partial refund.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">House Rules</h3>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>Check-in: After 3:00 PM</li>
                            <li>Checkout: 11:00 AM</li>
                            <li>No smoking</li>
                            <li>No pets</li>
                            <li>No parties or events</li>
                          </ul>
                        </div>

                        <div className="pt-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="terms" className="rounded border-gray-300" />
                            <label htmlFor="terms" className="text-sm">
                              I agree to the{" "}
                              <Link href="/terms" className="text-primary hover:underline">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                              </Link>
                            </label>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">Confirm and Pay</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            <div>
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>Price Details</CardTitle>
                    <CardDescription>5 nights at Luxury Beach Villa</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>$499 x 5 nights</span>
                      <span>$2,495</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>$150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>$100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes (8%)</span>
                      <span>$220</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total (USD)</span>
                      <span>$2,965</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-muted-foreground">
                      You won&apos;t be charged until you complete your booking.
                    </p>
                  </CardFooter>
                </Card>

                <div className="mt-6 bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Secure Payment
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure. We use industry-standard security measures to
                    protect your data.
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Need help?{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      Contact our support team
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-muted py-12">
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
    </div>
  )
}

