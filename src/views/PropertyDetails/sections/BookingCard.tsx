// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Users, Star, Calendar as CalendarIcon } from "lucide-react"
// import { format } from "date-fns"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
// import { cn } from "@/lib/utils"

// interface BookingCardProps {
//   pricePerNight: number
//   rating: number
//   maxGuests: number
//   cleaningFee: number
//   serviceFee: number
// }

// export function BookingCard({
//   pricePerNight,
//   rating,
//   maxGuests,
//   cleaningFee,
//   serviceFee
// }: BookingCardProps) {
//   const [guests, setGuests] = useState(2)
//   const [checkInDate, setCheckInDate] = useState<Date | undefined>()
//   const [checkOutDate, setCheckOutDate] = useState<Date | undefined>()
//   const [openPicker, setOpenPicker] = useState<'checkIn' | 'checkOut' | null>(null)

//   const today = new Date()
//   today.setHours(0, 0, 0, 0)

//   const handleCheckInSelect = (date: Date | undefined) => {
//     setCheckInDate(date)
//     // Reset check-out date if it's before the new check-in date
//     if (date && checkOutDate && date > checkOutDate) {
//       setCheckOutDate(undefined)
//     }
//     setOpenPicker(null)
//   }

//   const handleCheckOutSelect = (date: Date | undefined) => {
//     setCheckOutDate(date)
//     setOpenPicker(null)
//   }

//   // Calculate number of nights and total price
//   const nights = checkInDate && checkOutDate ? 
//     Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) : 
//     0
//   const subtotal = nights * pricePerNight
//   const total = subtotal + cleaningFee + serviceFee

//   return (
//     <Card className="sticky top-24">
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <span className="text-2xl font-bold">${pricePerNight}</span>
//             <span className="text-muted-foreground"> / night</span>
//           </div>
//           <div className="flex items-center">
//             <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
//             <span>{rating}</span>
//           </div>
//         </div>

//         <div className="border rounded-lg mb-4">
//           <div className="grid grid-cols-2 divide-x">
//             {/* Check-in Date */}
//             <div className="p-4">
//               <div className="text-sm font-medium">Check-in</div>
//               <Popover open={openPicker === 'checkIn'} onOpenChange={(open) => setOpenPicker(open ? 'checkIn' : null)}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className={cn(
//                       "w-full justify-start text-left font-normal border p-2 h-auto",
//                       !checkInDate && "text-muted-foreground"
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {checkInDate ? format(checkInDate, "MMM dd") : "Add date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={checkInDate}
//                     onSelect={handleCheckInSelect}
//                     disabled={{ before: today }}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>

//             {/* Check-out Date */}
//             <div className="p-4">
//               <div className="text-sm font-medium">Check-out</div>
//               <Popover open={openPicker === 'checkOut'} onOpenChange={(open) => setOpenPicker(open ? 'checkOut' : null)}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className={cn(
//                       "w-full justify-start text-left font-normal border p-2 h-auto",
//                       !checkOutDate && "text-muted-foreground"
//                     )}
//                     disabled={!checkInDate}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {checkOutDate ? format(checkOutDate, "MMM dd") : "Add date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={checkOutDate}
//                     onSelect={handleCheckOutSelect}
//                     disabled={{ before: checkInDate || today }}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>

//           <div className="border-t p-4">
//             <div className="text-sm font-medium mb-2">Guests</div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <Users className="h-5 w-5 mr-2 text-muted-foreground" />
//                 <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="h-8 w-8 hover:bg-primary"
//                   onClick={() => setGuests(Math.max(1, guests - 1))}
//                   disabled={guests <= 1}
//                 >
//                   -
//                 </Button>
//                 <span className="w-8 text-center">{guests}</span>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="h-8 w-8 hover:bg-primary"
//                   onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
//                   disabled={guests >= maxGuests}
//                 >
//                   +
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Button className="w-full mb-4" disabled={!checkInDate || !checkOutDate}>
//           Reserve
//         </Button>
//         <p className="text-center text-sm text-muted-foreground mb-4">You won't be charged yet</p>

//         <div className="space-y-4">
//           {nights > 0 && (
//             <div className="flex justify-between">
//               <span className="underline">${pricePerNight} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
//               <span>${subtotal}</span>
//             </div>
//           )}
//           <div className="flex justify-between">
//             <span className="underline">Cleaning fee</span>
//             <span>${cleaningFee}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="underline">Service fee</span>
//             <span>${serviceFee}</span>
//           </div>
//           <div className="flex justify-between pt-4 border-t font-bold">
//             <span>Total before taxes</span>
//             <span>${total}</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }





"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Star, Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { BooknowPopUp } from "@/components/common/Booknow"

interface BookingCardProps {
  pricePerNight: number
  rating: number
  maxGuests: number
  cleaningFee: number
  serviceFee: number
}

interface TravelerDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
}


export function BookingCard({
  pricePerNight,
  rating,
  maxGuests,
  cleaningFee,
  serviceFee
}: BookingCardProps) {
  const [guests, setGuests] = useState(2)
  const [checkInDate, setCheckInDate] = useState<Date | undefined>()
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>()
  const [openPicker, setOpenPicker] = useState<'checkIn' | 'checkOut' | null>(null)
  // const [travelerDetails, setTravelerDetails] = useState<TravelerDetails>({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: ''
  // })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckInDate(date)
    if (date && checkOutDate && date > checkOutDate) {
      setCheckOutDate(undefined)
    }
    setOpenPicker(null)
  }

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOutDate(date)
    setOpenPicker(null)
  }

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setTravelerDetails(prev => ({
  //     ...prev,
  //     [name]: value
  //   }))
  // }

  const nights = checkInDate && checkOutDate ? 
    Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) : 
    0
  const subtotal = nights * pricePerNight
  const total = subtotal + cleaningFee + serviceFee

  // Check if all traveler details are filled
  // const isDetailsComplete = (
  //   travelerDetails.firstName.trim() &&
  //   travelerDetails.lastName.trim() &&
  //   travelerDetails.email.trim() &&
  //   travelerDetails.phone.trim()
  // )

  // const handleReserveClick = () => {
  //   setIsDialogOpen(true)
  // }

  const handleBookNow = async (details: TravelerDetails) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total * 100, // Convert to cents
          travelerDetails: details
        })
      });
      
      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return undefined;
    }
  };

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
            {/* Check-in Date */}
            <div className="p-4">
              <div className="text-sm font-medium">Check-in</div>
              <Popover open={openPicker === 'checkIn'} onOpenChange={(open) => setOpenPicker(open ? 'checkIn' : null)}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left font-normal border p-2 hover:bg-primary h-auto",
                      !checkInDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "MMM dd") : "Add date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={handleCheckInSelect}
                    disabled={{ before: today }}
                    initialFocus
                    className="bg-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out Date */}
            <div className="p-4">
              <div className="text-sm font-medium">Check-out</div>
              <Popover open={openPicker === 'checkOut'} onOpenChange={(open) => setOpenPicker(open ? 'checkOut' : null)}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left font-normal border p-2 hover:bg-primary h-auto",
                      !checkOutDate && "text-muted-foreground "
                    )}
                    disabled={!checkInDate}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, "MMM dd") : "Add date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 " align="start">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={handleCheckOutSelect}
                    disabled={{ before: checkInDate || today }}
                    initialFocus
                     className="bg-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="border-t p-4">
            <div className="text-sm font-medium mb-2">Guests</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{guests}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary"
                  onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                  disabled={guests >= maxGuests}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>

        <BooknowPopUp
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          total={total}
          onBookNow={handleBookNow}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />

        <p className="text-center text-sm text-muted-foreground mb-4">You won&apos;t be charged yet</p>

        <div className="space-y-4">
          {nights > 0 && (
            <div className="flex justify-between">
              <span className="underline">${pricePerNight} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
              <span>${subtotal}</span>
            </div>
          )}
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
            <span>${total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}