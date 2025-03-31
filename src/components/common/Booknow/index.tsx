// "use client"

// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Button } from "@/components/ui/button"
// import { useState } from 'react'
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from 'axios'

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

// function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) return;

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: { return_url: `${window.location.origin}/success` },
//       redirect: 'if_required'
//     });

//     if (error) {
//       console.error("Payment error:", error.message);
//     } else {
//       onSuccess();
//     }
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <Button type="submit" disabled={!stripe || loading} className="w-full mt-4">
//         {loading ? "Processing..." : "Pay Now"}
//       </Button>
//     </form>
//   );
// }

// interface TravelerDetails {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
// }

// interface BooknowPopUpProps {
//   checkInDate: Date | undefined
//   checkOutDate: Date | undefined
//   total: number
//   onBookNow: (details: TravelerDetails) => Promise<string | undefined> // Now returns client secret
//   isOpen: boolean
//   onOpenChange: (open: boolean) => void
// }

// export function BooknowPopUp({
//   checkInDate,
//   checkOutDate,
//   total,
//   onBookNow,
//   isOpen,
//   onOpenChange
// }: BooknowPopUpProps) {
//   const [travelerDetails, setTravelerDetails] = useState<TravelerDetails>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: ''
//   });

//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [paymentCompleted, setPaymentCompleted] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setTravelerDetails(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const isDetailsComplete = (
//     travelerDetails.firstName.trim() &&
//     travelerDetails.lastName.trim() &&
//     travelerDetails.email.trim() &&
//     travelerDetails.phone.trim()
//   );

//   const handleReserveClick = () => {
//     onOpenChange(true);
//   };

//   const handleBookNowClick = async () => {
//     try {
//       const secret = await onBookNow(travelerDetails);
//       if (secret) {
//         setClientSecret(secret);
//       }
//     } catch (error) {
//       console.error("Error creating payment intent:", error);
//     }
//   };

//   const handlePaymentSuccess = async () => {
//     setPaymentCompleted(true);

//     try {
//       const bookingResponse = await axios.post('/api/booking', {
//         firstName: travelerDetails.firstName,
//         lastName: travelerDetails.lastName,
//         email: travelerDetails.email,
//         phone: travelerDetails.phone,
//         checkInDate,
//         checkOutDate,
//         total,
//         paymentId:""
//       });

//       if (bookingResponse.status === 200) {
//         console.log('Booking stored successfully:', bookingResponse.data);

//         // 2. Send confirmation email
//         try {
//           await sendBookingConfirmationEmail(travelerDetails.email, {
//             firstName: travelerDetails.firstName,
//             lastName: travelerDetails.lastName,
//             email: travelerDetails.email,
//             checkInDate,
//             checkOutDate,
//             total,
//             bookingId: bookingResponse.data.id,
//           });
//           console.log('Confirmation email sent successfully');
//         } catch (emailError) {
//           console.error('Error sending confirmation email:', emailError);
//         }
//       } else {
//         console.error('Error storing booking:', bookingResponse.data.error);
//       }
//     } catch (error) {
//       console.error('Error in payment success handler:', error);
//     }
//   };


//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => {
//       if (!open) {
//         // Reset state when dialog closes
//         setClientSecret(null);
//         setPaymentCompleted(false);
//       }
//       onOpenChange(open);
//     }}>
//       <DialogTrigger asChild>
//         <Button
//           className="w-full mb-4"
//           disabled={!checkInDate || !checkOutDate}
//           onClick={handleReserveClick}
//         >
//           Reserve
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>
//             {clientSecret ? "Payment Details" : "Traveler Details"}
//           </DialogTitle>
//         </DialogHeader>

//         {paymentCompleted ? (
//           <div className="text-center py-4">
//             <p className="text-green-500 font-bold">Payment Successful!</p>
//             <p>Thank you for your booking.</p>
//           </div>
//         ) : clientSecret ? (
//           <Elements
//             stripe={stripePromise}
//             options={{
//               clientSecret,
//               appearance: { theme: 'stripe' }
//             }}
//           >
//             <PaymentForm onSuccess={handlePaymentSuccess} />
//           </Elements>
//         ) : (
//           <>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="firstName">First Name</Label>
//                   <Input
//                     id="firstName"
//                     name="firstName"
//                     value={travelerDetails.firstName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="lastName">Last Name</Label>
//                   <Input
//                     id="lastName"
//                     name="lastName"
//                     value={travelerDetails.lastName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={travelerDetails.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   value={travelerDetails.phone}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="pt-4 border-t">
//                 <div className="flex justify-between font-bold">
//                   <span>Total</span>
//                   <span>${total}</span>
//                 </div>
//               </div>
//             </div>
//             <Button
//               className="w-full"
//               onClick={handleBookNowClick}
//               disabled={!isDetailsComplete}
//             >
//               Proceed to Payment
//             </Button>
//           </>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from 'axios'
import { sendBookingConfirmationEmail } from '@/utils/mailler'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

interface TravelerDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  city?: string
  country?: string
  postalCode?: string
  specialRequests?: string
  guests?: number
}

interface BooknowPopUpProps {
  propertyId: string
  propertyTitle: string
  propertyImage: string
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
  total: number
  basePrice: number
  taxes: number
  serviceFee: number
  onBookNow: (details: TravelerDetails) => Promise<string | undefined>
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!stripe || !elements) return

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/success` },
      redirect: 'if_required'
    })

    if (error) {
      console.error("Payment error:", error.message)
    } else {
      onSuccess()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" disabled={!stripe || loading} className="w-full mt-4">
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  )
}

export function BooknowPopUp({
  propertyId,
  propertyTitle,
  propertyImage,
  checkInDate,
  checkOutDate,
  total,
  basePrice,
  taxes,
  serviceFee,
  onBookNow,
  isOpen,
  onOpenChange
}: BooknowPopUpProps) {
  const [travelerDetails, setTravelerDetails] = useState<TravelerDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    specialRequests: '',
    guests: 1
  })

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'details' | 'payment'>('details')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleBookNowClick = async () => {
    try {
      const secret = await onBookNow(travelerDetails)
      if (secret) {
        setClientSecret(secret)
        setActiveTab('payment')
      }
    } catch (error) {
      console.error("Error creating payment intent:", error)
      setBookingError("Failed to initialize payment. Please try again.")
    }
  }

  const handlePaymentSuccess = async () => {
    try {
      setIsSendingEmail(true)
      setBookingError(null)
      
      // Store booking in database
      const bookingResponse = await axios.post('/api/booking', {
        propertyId,
        propertyTitle,
        propertyImage,
        travelerDetails,
        checkInDate,
        checkOutDate,
        basePrice,
        taxes,
        serviceFee,
        total,
        paymentStatus: 'completed',
        bookingStatus: 'confirmed'
      })

      console.log(bookingResponse,"bookingResponsebookingResponsebookingResponse")

      if (bookingResponse.status === 200) {
        console.log('Booking stored successfully:', bookingResponse.data)
        
        // Send confirmation email
        try {
          await sendBookingConfirmationEmail({
            to: travelerDetails.email,
            subject: `Booking Confirmation for ${propertyTitle}`,
            bookingData: {
              propertyTitle,
              propertyImage,
              checkInDate: checkInDate?.toLocaleDateString() || '',
              checkOutDate: checkOutDate?.toLocaleDateString() || '',
              total: total.toFixed(2),
              bookingId: bookingResponse.data._id,
              paymentId: bookingResponse.data.paymentId,
              travelerDetails
            }
          })
          console.log('Confirmation email sent successfully')
          setPaymentCompleted(true)
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError)
          setBookingError("Booking was successful but we couldn't send confirmation email.")
        }
      } else {
        console.error('Error storing booking:', bookingResponse.data.error)
        setBookingError("Failed to complete booking. Please contact support.")
      }
    } catch (error) {
      console.error('Error in payment success handler:', error)
      setBookingError("An unexpected error occurred. Please contact support.")
    } finally {
      setIsSendingEmail(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        // Reset state when dialog closes
        setClientSecret(null)
        setPaymentCompleted(false)
        setBookingError(null)
        setActiveTab('details')
      }
      onOpenChange(open)
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {paymentCompleted 
              ? "Booking Confirmed!" 
              : clientSecret 
                ? "Complete Your Payment" 
                : "Enter Your Details"}
          </DialogTitle>
        </DialogHeader>

        {bookingError && (
          <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">
            {bookingError}
          </div>
        )}

        {paymentCompleted ? (
          <div className="text-center py-4 space-y-4">
            <div className="text-green-500 font-bold text-xl">Payment Successful!</div>
            <p className="text-lg">Thank you for booking {propertyTitle}!</p>
            <p>A confirmation has been sent to {travelerDetails.email}.</p>
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Booking Summary:</h3>
              <div className="grid grid-cols-2 gap-2">
                <span>Booking ID:</span>
                <span className="font-medium">#{propertyId.slice(0, 8)}</span>
                <span>Check-in:</span>
                <span>{checkInDate?.toLocaleDateString()}</span>
                <span>Check-out:</span>
                <span>{checkOutDate?.toLocaleDateString()}</span>
                <span>Total Paid:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="mt-4" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : clientSecret && activeTab === 'payment' ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: { theme: 'stripe' }
            }}
          >
            <div className="space-y-4">
              {/* <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Booking Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span>Property:</span>
                  <span>{propertyTitle}</span>
                  <span>Dates:</span>
                  <span>
                    {checkInDate?.toLocaleDateString()} - {checkOutDate?.toLocaleDateString()}
                  </span>
                  <span>Base Price:</span>
                  <span>${basePrice.toFixed(2)}</span>
                  <span>Taxes:</span>
                  <span>${taxes.toFixed(2)}</span>
                  <span>Service Fee:</span>
                  <span>${serviceFee.toFixed(2)}</span>
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div> */}
              <PaymentForm onSuccess={handlePaymentSuccess} />
            </div>
          </Elements>
        ) : (
          <div className="grid gap-6">
            <div className="flex border-b">
              <button
                className={`pb-2 px-4 ${activeTab === 'details' ? 'border-b-2 border-primary font-semibold' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Traveler Details
              </button>
              <button
                className={`pb-2 px-4 ${activeTab === 'payment' ? 'border-b-2 border-primary font-semibold' : ''}`}
                onClick={() => setActiveTab('payment')}
                disabled={!isDetailsComplete}
              >
                Payment
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={travelerDetails.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name*</Label>
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
                  <Label htmlFor="email">Email*</Label>
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
                  <Label htmlFor="phone">Phone Number*</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={travelerDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    value={travelerDetails.guests}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={travelerDetails.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={travelerDetails.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={travelerDetails.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={travelerDetails.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={travelerDetails.specialRequests}
                    onChange={handleInputChange}
                    className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={handleBookNowClick}
                  disabled={!isDetailsComplete || isSendingEmail}
                >
                  {isSendingEmail ? "Processing..." : "Continue to Payment"}
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}