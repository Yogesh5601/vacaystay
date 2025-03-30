// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import React from 'react'
// import { Button } from 'react-day-picker'

// export default function BooknowPopUp(data:any) {
//     return (
//         <div>   <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//                 <Button
//                     className="w-full mb-4"
//                     disabled={!checkInDate || !checkOutDate}
//                     onClick={handleReserveClick}
//                 >
//                     Reserve
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <DialogTitle>Traveler Details</DialogTitle>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="firstName">First Name</Label>
//                             <Input
//                                 id="firstName"
//                                 name="firstName"
//                                 value={travelerDetails.firstName}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="lastName">Last Name</Label>
//                             <Input
//                                 id="lastName"
//                                 name="lastName"
//                                 value={travelerDetails.lastName}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="space-y-2">
//                         <Label htmlFor="email">Email</Label>
//                         <Input
//                             id="email"
//                             name="email"
//                             type="email"
//                             value={travelerDetails.email}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>
//                     <div className="space-y-2">
//                         <Label htmlFor="phone">Phone Number</Label>
//                         <Input
//                             id="phone"
//                             name="phone"
//                             type="tel"
//                             value={travelerDetails.phone}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>
//                     <div className="pt-4 border-t">
//                         <div className="flex justify-between font-bold">
//                             <span>Total</span>
//                             <span>${total}</span>
//                         </div>
//                     </div>
//                 </div>
//                 <Button
//                     className="w-full"
//                     onClick={handleBookNow}
//                     disabled={!isDetailsComplete}
//                 >
//                     Book Now
//                 </Button>
//             </DialogContent>
//         </Dialog></div>
//     )
// }




"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import { useState } from 'react'

interface TravelerDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface BooknowPopUpProps {
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
  total: number
  onBookNow: (details: TravelerDetails) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function BooknowPopUp({
  checkInDate,
  checkOutDate,
  total,
  onBookNow,
  isOpen,
  onOpenChange
}: BooknowPopUpProps) {
  const [travelerDetails, setTravelerDetails] = useState<TravelerDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTravelerDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isDetailsComplete = (
    travelerDetails.firstName.trim() &&
    travelerDetails.lastName.trim() &&
    travelerDetails.email.trim() &&
    travelerDetails.phone.trim()
  )

  const handleReserveClick = () => {
    onOpenChange(true)
  }

  const handleBookNowClick = () => {
    onBookNow(travelerDetails)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="w-full mb-4"
          disabled={!checkInDate || !checkOutDate}
          onClick={handleReserveClick}
        >
          Reserve
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Traveler Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={travelerDetails.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={travelerDetails.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={travelerDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={travelerDetails.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="pt-4 border-t">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
        <Button
          className="w-full"
          onClick={handleBookNowClick}
          disabled={!isDetailsComplete}
        >
          Book Now
        </Button>
      </DialogContent>
    </Dialog>
  )
}