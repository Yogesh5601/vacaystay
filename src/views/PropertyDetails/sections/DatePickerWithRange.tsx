"use client"

import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface DatePickerWithSeparateDatesProps {
  checkInDate: Date | undefined
  setCheckInDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  checkOutDate: Date | undefined
  setCheckOutDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  className?: string
}

export function DatePickerWithSeparateDates({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  className,
}: DatePickerWithSeparateDatesProps) {
  const [openPicker, setOpenPicker] = useState<'checkIn' | 'checkOut' | null>(null)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckInDate(date)
    // If check-out is before new check-in, reset check-out
    if (date && checkOutDate && date > checkOutDate) {
      setCheckOutDate(undefined)
    }
    setOpenPicker(null)
  }

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOutDate(date)
    setOpenPicker(null)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      {/* Check-in Date Picker */}
      <Popover open={openPicker === 'checkIn'} onOpenChange={(open) => setOpenPicker(open ? 'checkIn' : null)}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !checkInDate && "text-muted-foreground")}
            onClick={() => setOpenPicker('checkIn')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {checkInDate ? format(checkInDate, "LLL dd") : <span>Select check-in date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={checkInDate}
            onSelect={handleCheckInSelect}
            disabled={{ before: today }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Check-out Date Picker */}
      <Popover open={openPicker === 'checkOut'} onOpenChange={(open) => setOpenPicker(open ? 'checkOut' : null)}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !checkOutDate && "text-muted-foreground")}
            onClick={() => setOpenPicker('checkOut')}
            disabled={!checkInDate}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {checkOutDate ? format(checkOutDate, "LLL dd") : <span>Select check-out date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={checkOutDate}
            onSelect={handleCheckOutSelect}
            disabled={{ before: checkInDate || today }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}