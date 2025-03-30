// // components/properties/Pagination.tsx
// import { Button } from "@/components/ui/button";

// export const Pagination = () => {
//   return (
//     <div className="flex justify-center mt-8">
//       <nav className="flex items-center gap-1">
//         <Button variant="outline" size="icon" disabled>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-4 w-4"
//           >
//             <path d="m15 18-6-6 6-6" />
//           </svg>
//           <span className="sr-only">Previous</span>
//         </Button>
//         <Button variant="outline" size="sm" className="h-8 w-8" aria-current="page">
//           1
//         </Button>
//         <Button variant="outline" size="sm" className="h-8 w-8">
//           2
//         </Button>
//         <Button variant="outline" size="sm" className="h-8 w-8">
//           3
//         </Button>
//         <Button variant="outline" size="sm" className="h-8 w-8">
//           4
//         </Button>
//         <Button variant="outline" size="icon">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-4 w-4"
//           >
//             <path d="m9 18 6-6-6-6" />
//           </svg>
//           <span className="sr-only">Next</span>
//         </Button>
//       </nav>
//     </div>
//   );
// };


import React, { memo } from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5;
    const isTruncated = totalPages > maxPagesToShow;

    for (let i = 1; i <= Math.min(2, totalPages); i++) {
      pageNumbers.push(i);
    }

    if (isTruncated && currentPage > 4) {
      pageNumbers.push("...");
    }

    for (
      let i = Math.max(3, currentPage - 1);
      i <= Math.min(totalPages - 2, currentPage + 1);
      i++
    ) {
      pageNumbers.push(i);
    }

    if (isTruncated && currentPage < totalPages - 3) {
      pageNumbers.push("...");
    }

    for (let i = Math.max(totalPages - 1, 3); i <= totalPages; i++) {
      if (i > 2) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = renderPageNumbers();

  return (
    <div className="flex justify-end">
      <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
        <button
          className="flex w-8 h-8 mx-1 justify-center items-center rounded-md border border-gray-300 bg-transparent text-black hover:bg-sky-600/30 transition duration-300"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft />
        </button>
        <button
          className="flex w-8 h-8 mx-1 justify-center items-center rounded-md border border-gray-300 bg-transparent text-black hover:bg-sky-600/30 transition duration-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>

        {pageNumbers.map((page, index) => (
          <button
            key={index}
            className={`flex w-8 h-8 mx-1 justify-center items-center rounded-md border border-gray-300 text-black ${
              currentPage === page
                ? "bg-gradient-to-r from-blue-300 to-blue-500 text-black"
                : "bg-transparent hover:bg-sky-500/20 transition duration-300"
            }`}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
            title={`Page ${page}`}
          >
            {page}
          </button>
        ))}

        <button
          className="flex w-8 h-8 mx-1 justify-center items-center rounded-md border border-gray-300 bg-transparent text-black hover:bg-sky-600/30 transition duration-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </button>
        <button
          className="flex w-8 h-8 mx-1 justify-center items-center rounded-md border border-gray-300 bg-transparent text-black hover:bg-sky-600/30 transition duration-300"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight />
        </button>
      </nav>
    </div>
  );
};

export default memo(Pagination);
