import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Send } from "lucide-react"

type ContactFormProps = {
    onSubmit: (e: React.FormEvent) => void
    onReset: () => void
    submitted: boolean
  }

export const ContactForm = ({ onSubmit, onReset, submitted }: ContactFormProps) => {
  if (submitted) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for contacting us. We&apos;ll get back to you as soon as possible.
            </p>
            <Button onClick={onReset}>Send Another Message</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" placeholder="Enter your first name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" placeholder="Enter your last name" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="Enter your email address" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" placeholder="Enter your phone number" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry-type">Inquiry Type</Label>
        <Select defaultValue="general">
          <SelectTrigger id="inquiry-type">
            <SelectValue placeholder="Select inquiry type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="booking">Booking Question</SelectItem>
            <SelectItem value="property">Property Information</SelectItem>
            <SelectItem value="support">Customer Support</SelectItem>
            <SelectItem value="feedback">Feedback</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="How can we help you?" rows={5} required />
      </div>

      <div>
        <RadioGroup defaultValue="email" className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="contact-email" />
            <Label htmlFor="contact-email">Contact me via email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="contact-phone" />
            <Label htmlFor="contact-phone">Contact me via phone</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  )
}