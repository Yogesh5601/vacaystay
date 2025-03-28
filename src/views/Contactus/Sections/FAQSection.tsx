import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export const FAQSection = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Frequently Asked Questions</h2>

      <Tabs defaultValue="booking">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="booking">Booking</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="booking" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="booking-1">
              <AccordionTrigger>How do I make a reservation?</AccordionTrigger>
              <AccordionContent>
                Making a reservation is easy! Simply search for your desired destination, select the property
                you're interested in, choose your dates, and follow the booking process. You'll receive an
                immediate confirmation once your booking is complete.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="booking-2">
              <AccordionTrigger>What is your cancellation policy?</AccordionTrigger>
              <AccordionContent>
                Cancellation policies vary by property. Each listing clearly displays the specific cancellation
                terms that apply. Generally, we offer three types: Flexible (full refund if cancelled 24 hours
                before check-in), Moderate (full refund if cancelled 5 days before check-in), and Strict (50%
                refund if cancelled 7 days before check-in).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="booking-3">
              <AccordionTrigger>How do I modify my reservation?</AccordionTrigger>
              <AccordionContent>
                You can modify your reservation by logging into your account, navigating to "My Trips," and
                selecting the booking you wish to change. Depending on the property's policies, you may be able
                to change dates, guest count, or other details. Some changes may affect the price of your
                booking.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="booking-4">
              <AccordionTrigger>When will I be charged for my booking?</AccordionTrigger>
              <AccordionContent>
                For most bookings, you'll be charged the full amount at the time of booking. For some longer
                stays or bookings made well in advance, you may have the option to pay in installments. The
                payment schedule will be clearly displayed before you confirm your reservation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="properties-1">
              <AccordionTrigger>How do you verify property listings?</AccordionTrigger>
              <AccordionContent>
                We have a thorough verification process for all properties listed on our platform. This includes
                reviewing photos, amenities, and location details. Many of our properties are also personally
                visited by our team. Additionally, we rely on guest reviews to ensure ongoing quality.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="properties-2">
              <AccordionTrigger>What amenities are typically included?</AccordionTrigger>
              <AccordionContent>
                Amenities vary by property, but each listing clearly displays what's included. Common amenities
                include WiFi, kitchen facilities, air conditioning, and parking. Premium properties may offer
                additional features like pools, hot tubs, or concierge services. Always check the property
                details for a complete list.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="properties-3">
              <AccordionTrigger>Can I list my property on VacayStay?</AccordionTrigger>
              <AccordionContent>
                Yes! We welcome property owners who want to list their vacation rentals. You can start by
                creating an account and following our listing process. We offer tools to help you manage
                bookings, set competitive prices, and showcase your property with professional photos and
                descriptions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="properties-4">
              <AccordionTrigger>Are pets allowed in your properties?</AccordionTrigger>
              <AccordionContent>
                Pet policies vary by property. Each listing will clearly indicate whether pets are allowed. You
                can also use our search filters to find pet-friendly accommodations. If you're traveling with
                pets, we recommend contacting the host directly to discuss any specific requirements or
                restrictions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="account-1">
              <AccordionTrigger>How do I create an account?</AccordionTrigger>
              <AccordionContent>
                Creating an account is simple! Click on the "Sign Up" button in the top right corner of our
                website, enter your email address, create a password, and provide some basic information. You
                can also sign up using your Google or Facebook account for faster registration.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="account-2">
              <AccordionTrigger>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                If you've forgotten your password, click on "Login" and then select "Forgot Password." Enter the
                email address associated with your account, and we'll send you a link to reset your password.
                For security reasons, this link will expire after 24 hours.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="account-3">
              <AccordionTrigger>Can I have multiple payment methods?</AccordionTrigger>
              <AccordionContent>
                Yes, you can add multiple payment methods to your account. Go to "Account Settings" and select
                "Payment Methods" to add or remove credit cards, PayPal accounts, or other payment options. You
                can designate one method as your default for future bookings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="account-4">
              <AccordionTrigger>How do I view my booking history?</AccordionTrigger>
              <AccordionContent>
                Your booking history is available in the "My Trips" section of your account. Here you can view
                details of past, current, and upcoming reservations. This section also provides access to
                booking confirmations, receipts, and the option to leave reviews for properties you've stayed
                in.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>

      <div className="text-center mt-8">
        <p className="text-muted-foreground mb-4">
          Can't find the answer you're looking for? Contact our support team.
        </p>
        <Button asChild>
          <a href="#contact-form">Get in Touch</a>
        </Button>
      </div>
    </div>
  )
}