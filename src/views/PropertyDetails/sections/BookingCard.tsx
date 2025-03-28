"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Star } from "lucide-react"
import { DatePickerWithRange } from "./DatePickerWithRange"

interface BookingCardProps {
  pricePerNight: number
  rating: number
  maxGuests: number
  cleaningFee: number
  serviceFee: number
}

export function BookingCard({
  pricePerNight,
  rating,
  maxGuests,
  cleaningFee,
  serviceFee
}: BookingCardProps) {
  const [guests, setGuests] = useState(2)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold">${pricePerNight}</span>
            <span className="text-muted-foreground"> / night</span>
          </div>
          <div className="flex items-center">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="border rounded-lg mb-4">
          <div className="grid grid-cols-2 divide-x">
            <div className="p-4">
              <div className="text-sm font-medium">Check-in</div>
              <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} className="w-full" />
            </div>
            <div className="p-4">
              <div className="text-sm font-medium">Check-out</div>
              <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} className="w-full" />
            </div>
          </div>
          <div className="border-t p-4">
            <div className="text-sm font-medium mb-2">Guests</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{guests} guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{guests}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                  disabled={guests >= maxGuests}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full mb-4">Reserve</Button>
        <p className="text-center text-sm text-muted-foreground mb-4">You won't be charged yet</p>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="underline">${pricePerNight} x 5 nights</span>
            <span>${pricePerNight * 5}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Cleaning fee</span>
            <span>${cleaningFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className="flex justify-between pt-4 border-t font-bold">
            <span>Total before taxes</span>
            <span>${pricePerNight * 5 + cleaningFee + serviceFee}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}