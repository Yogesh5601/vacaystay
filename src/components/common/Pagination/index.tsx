import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
}

export function Pagination({ page, setPage, totalPages }: PaginationProps) {
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <div className="flex justify-end items-center space-x-3 mt-4">
            <Button onClick={handlePrevPage} disabled={page === 1} variant="outline" className='hover:bg-primary'>
                <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <span>Page {page} of {totalPages}</span>
            <Button onClick={handleNextPage} disabled={page === totalPages} variant="outline" className='hover:bg-primary'>
                Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
    );
}
