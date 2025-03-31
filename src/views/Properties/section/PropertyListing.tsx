import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyCard } from "@/components/common/PropertyCard";
import { Pagination } from "@/components/common/Pagination";

export const PropertyList = ({ featuredProperties, page, setPage, totalPages, sortBy, setSortBy }: any) => {

  return (
    <div className="w-full md:w-3/4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Properties ({featuredProperties?.length || 0})</h1>
        <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperties?.map((property: any) => (
          <PropertyCard property={property} key={property._id} />
        ))}
      </div>

 
    <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
    </div>
  );
};

const SortSelector = ({ sortBy, setSortBy }: any) => (
  <div className="flex items-center gap-2">
    <label className="text-sm">Sort by:</label>
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Recommended" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem value="recommended">Recommended</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
        <SelectItem value="rating">Rating</SelectItem>
      </SelectContent>
    </Select>
  </div>
);
