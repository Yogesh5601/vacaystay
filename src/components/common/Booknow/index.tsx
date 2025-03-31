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
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/success` },
      redirect: 'if_required'
    });

    if (error) {
      console.error("Payment error:", error.message);
    } else {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" disabled={!stripe || loading} className="w-full mt-4">
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
}

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
  onBookNow: (details: TravelerDetails) => Promise<string | undefined> // Now returns client secret
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
  });

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTravelerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isDetailsComplete = (
    travelerDetails.firstName.trim() &&
    travelerDetails.lastName.trim() &&
    travelerDetails.email.trim() &&
    travelerDetails.phone.trim()
  );

  const handleReserveClick = () => {
    onOpenChange(true);
  };

  const handleBookNowClick = async () => {
    try {
      const secret = await onBookNow(travelerDetails);
      if (secret) {
        setClientSecret(secret);
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    // You might want to close the dialog or show a success message here
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        // Reset state when dialog closes
        setClientSecret(null);
        setPaymentCompleted(false);
      }
      onOpenChange(open);
    }}>
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
          <DialogTitle>
            {clientSecret ? "Payment Details" : "Traveler Details"}
          </DialogTitle>
        </DialogHeader>
        
        {paymentCompleted ? (
          <div className="text-center py-4">
            <p className="text-green-500 font-bold">Payment Successful!</p>
            <p>Thank you for your booking.</p>
          </div>
        ) : clientSecret ? (
          <Elements 
            stripe={stripePromise} 
            options={{ 
              clientSecret,
              appearance: { theme: 'stripe' }
            }}
          >
            <PaymentForm onSuccess={handlePaymentSuccess} />
          </Elements>
        ) : (
          <>
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
              Proceed to Payment
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}