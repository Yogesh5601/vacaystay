// components/Hero.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import { GuestSelector } from "@/components/common/GuestSelector";
import { DateRangePicker } from "@/components/common/DateRangepicker";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Suggestion {
  _id: string;
  location: string;
}

export default function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState<DateRange | undefined>();
  const [guestDetails, setGuestDetails] = useState({
    adults: 2,
    children: 0,
    pets: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  // Fetch suggestions when destination changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (destination.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsFetchingSuggestions(true);
      try {
        const response = await axios.get("/api/search-destination", {
          params: { query: destination }
        });
        setSuggestions(response.data.result.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsFetchingSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [destination]);

  const handleSearch = async () => {
    if (!destination) return;
    
    setIsLoading(true);
    try {
      await axios.get("/api/search-property", {
        params: { 
          query: destination,
          startDate: dates?.from?.toISOString(),
          endDate: dates?.to?.toISOString(),
          adults: guestDetails.adults,
          children: guestDetails.children,
          pets: guestDetails.pets
        }
      });
      router.push("/properties")
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setDestination(suggestion.name);
    setShowSuggestions(false);
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

console.log(destination,showSuggestions,"destinationdestinationdestination")

  return (
    <section className="relative w-full flex flex-col justify-center px-4">
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
            Find your perfect getaway from our curated collection of properties
          </p>
        </div>

        {/* Booking Form */}
        <div className="absolute -bottom-9 w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            {/* Destination Input */}
            <div className="space-y-2 text-left relative">
              <label className="text-sm font-medium block">Where to?</label>
              <div className="relative">
                <Input
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setShowSuggestions(true);
                  }}
                  className="pl-10 pr-10"
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowSuggestions(true)}
                />
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <button 
                  onClick={toggleSuggestions}
                  className="absolute right-3 top-3 h-5 w-5 text-gray-400"
                >
                  {showSuggestions}
                </button>
              </div>
              
              {/* Suggestions dropdown */}
              {showSuggestions && (destination || suggestions.length > 0) && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {isFetchingSuggestions ? (
                    <div className="p-2 text-center text-gray-500">Loading...</div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion:any) => (
                      <div
                        key={suggestion._id}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <div>
                          <div className="font-medium">{suggestion.name}</div>
                        </div>
                      </div>
                    ))
                  ) : destination ? (
                    <div className="p-2 text-center text-gray-500">No results found</div>
                  ) : null}
                </div>
              )}
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
                // eslint-disable-next-line react/no-children-prop
                children={guestDetails.children}
                pets={guestDetails.pets}
                onChange={setGuestDetails}
              />
            </div>

            {/* Search Button */}
            <div className="text-left">
              <label className="text-sm font-medium block">&nbsp;</label>
              <Button 
                className="w-full h-12 flex items-center justify-center gap-2 text-white"
                onClick={handleSearch}
                disabled={isLoading || !destination}
              >
                <Search className="h-5 w-5" />
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}