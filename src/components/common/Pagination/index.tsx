// components/properties/Pagination.tsx
import { Button } from "@/components/ui/button";

export const Pagination = () => {
  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center gap-1">
        <Button variant="outline" size="icon" disabled>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span className="sr-only">Previous</span>
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8" aria-current="page">
          1
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          2
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          3
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          4
        </Button>
        <Button variant="outline" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span className="sr-only">Next</span>
        </Button>
      </nav>
    </div>
  );
};