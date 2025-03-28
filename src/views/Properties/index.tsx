// app/properties/page.tsx

import { FilterSidebar } from "./section/FilterSidebar";
import { PropertyList } from "./section/PropertyListing";

const Properties = () => {
  return (
    <main className="flex-1">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar />
          <PropertyList />
        </div>
      </div>
    </main>
  );
};

export default Properties;