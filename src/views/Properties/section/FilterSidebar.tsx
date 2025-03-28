// components/properties/FilterSidebar.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const FilterSidebar = () => {
  return (
    <div className="w-full md:w-1/4 space-y-6">
      <div className="sticky top-24">
        <div className="bg-card rounded-lg border shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              Clear All
            </Button>
          </div>

          <div className="space-y-4">
            <SearchFilter />
            <SelectFilter 
              label="Location" 
              options={[
                { value: "any", label: "Any location" },
                { value: "malibu", label: "Malibu, CA" },
                { value: "aspen", label: "Aspen, CO" },
                { value: "miami", label: "Miami Beach, FL" },
                { value: "tahoe", label: "Lake Tahoe, NV" },
              ]} 
              placeholder="Any location"
            />
            <SelectFilter 
              label="Property Type" 
              options={[
                { value: "any", label: "Any type" },
                { value: "house", label: "House" },
                { value: "apartment", label: "Apartment" },
                { value: "cabin", label: "Cabin" },
                { value: "villa", label: "Villa" },
                { value: "condo", label: "Condo" },
              ]} 
              placeholder="Any type"
            />
            <PriceRangeFilter />
            <SelectFilter 
              label="Bedrooms" 
              options={[
                { value: "any", label: "Any" },
                { value: "1", label: "1+" },
                { value: "2", label: "2+" },
                { value: "3", label: "3+" },
                { value: "4", label: "4+" },
                { value: "5", label: "5+" },
              ]} 
              placeholder="Any"
            />
            <SelectFilter 
              label="Bathrooms" 
              options={[
                { value: "any", label: "Any" },
                { value: "1", label: "1+" },
                { value: "2", label: "2+" },
                { value: "3", label: "3+" },
                { value: "4", label: "4+" },
              ]} 
              placeholder="Any"
            />
            <AmenitiesFilter />
          </div>

          <Button className="w-full">
            <Filter className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

const SearchFilter = () => (
  <div className="space-y-2">
    <label className="text-sm font-medium">Search</label>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search properties" className="pl-9" />
    </div>
  </div>
);

interface SelectFilterProps {
  label: string;
  options: { value: string; label: string }[];
  placeholder: string;
}

const SelectFilter = ({ label, options, placeholder }: SelectFilterProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const PriceRangeFilter = () => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">Price Range</label>
      <span className="text-xs text-muted-foreground">$50 - $1000</span>
    </div>
    <Slider defaultValue={[50, 1000]} min={0} max={2000} step={10} />
  </div>
);

const AmenitiesFilter = () => {
  const amenities = [
    { id: "pool", label: "Pool" },
    { id: "wifi", label: "WiFi" },
    { id: "ac", label: "Air Conditioning" },
    { id: "kitchen", label: "Kitchen" },
    { id: "parking", label: "Free Parking" },
    { id: "hottub", label: "Hot Tub" },
  ];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Amenities</label>
      <div className="space-y-2">
        {amenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center space-x-2">
            <Checkbox id={amenity.id} />
            <label htmlFor={amenity.id} className="text-sm">
              {amenity.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};