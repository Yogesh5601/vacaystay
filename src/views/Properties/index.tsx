// app/properties/page.tsx

import { FilterSidebar } from "./section/FilterSidebar";
import { PropertyList } from "./section/PropertyListing";

const Properties = ({ featuredProperties, page, setPage, totalPages, sortBy, setSortBy }: any) => {
  return (
    <main className="flex-1">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar />
          <PropertyList
            featuredProperties={featuredProperties}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      </div>
    </main>
  );
};

export default Properties;
