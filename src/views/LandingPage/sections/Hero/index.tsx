// components/Hero.tsx
import { useState } from "react";
import Image from "next/image";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import { GuestSelector } from "@/components/common/GuestSelector";
import { DateRangePicker } from "@/components/common/DateRangepicker";

export default function Hero() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState<DateRange | undefined>();
  const [guestDetails, setGuestDetails] = useState({
    adults: 2,
    children: 0,
    pets: false,
  });

  return (
    <section className="relative w-full flex flex-col justify-center ">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1500&auto=format&fit=crop&q=80"
          alt="Luxury Villa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="w-full relative flex flex-col justify-center items-center z-10 py-24 md:py-32 text-center">
        <div className="max-w-3xl text-white space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl capitalize">
            Great Experiences Are Just Around The Corner
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Booking Form */}
        <div className="absolute -bottom-9 w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 mt-12">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
    
    {/* Destination Input */}
    <div className="space-y-2 text-left">
      <label className="text-sm font-medium block">Where to?</label>
      <div className="relative">
        <Input
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="pl-10"
        />
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      </div>
    </div>

    {/* Date Range Picker */}
    <div className="space-y-2 text-left">
      <label className="text-sm font-medium block">Dates</label>
      <DateRangePicker value={dates} onChange={setDates} />
    </div>

    {/* Guest Selector */}
    <div className="space-y-2 text-left">
      <label className="text-sm font-medium block">Travelers</label>
      <GuestSelector
        adults={guestDetails.adults}
        children={guestDetails.children}
        pets={guestDetails.pets}
        onChange={setGuestDetails}
      />
    </div>

    {/* Search Button */}
    <div className="text-left">
      <label className="text-sm font-medium block">&nbsp;</label>
      <Button className="w-full h-12 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
        <Search className="h-5 w-5" />
        Search
      </Button>
    </div>

  </div>
</div>

      </div>
    </section>
  );
}