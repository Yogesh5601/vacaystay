// components/properties/PropertyList.tsx
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyCard } from "@/components/common/PropertyCard";
import { featuredProperties } from "@/data";
import { Pagination } from "@/components/common/Pagination";

export const PropertyList = () => {
  return (
    <div className="w-full md:w-3/4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Properties (24)</h1>
        <SortSelector />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperties.map((property) => (
          <PropertyCard property={property} key={property.id} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};

const SortSelector = () => (
  <div className="flex items-center gap-2">
    <label className="text-sm">Sort by:</label>
    <Select defaultValue="recommended">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Recommended" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recommended">Recommended</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
        <SelectItem value="rating">Rating</SelectItem>
      </SelectContent>
    </Select>
  </div>
);