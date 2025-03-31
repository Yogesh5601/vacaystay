'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Loader from '@/components/common/Loader';
import { DestinationTable } from '@/components/common/DestinationListingTable';
import { debounce } from '@/utils/globalfunctions';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Pagination } from '@/components/common/Pagination';

export default function DestinationListings() {
    const [destinations, setDestinations] = useState<any[]>([]);
    const [destinationToEdit, setDestinationToEdit] = useState<any | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const fetchDestinations = async (query: string = '', pageNum: number = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/admin/destination?search=${query}&page=${pageNum}&limit=${limit}`);
            setDestinations(response.data.result.data);
            setTotalPages(Math.ceil(response.data.result.pagination.total / limit));
        } catch (error) {
            console.error('Error fetching destinations:', error);
            toast.error('Failed to fetch destinations');
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setPage(1);
            fetchDestinations(query, 1);
        }, 500),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query);
        debouncedSearch(query);
    };

    useEffect(() => {
        fetchDestinations(search, page);
    }, [search, page]);

    const handleDeleteClick = async (id: string) => {
        try {
            await axios.delete(`/api/destinations/${id}`);
            toast.success('Destination deleted successfully');
            setDestinations(destinations.filter(dest => dest.id !== id));
        } catch (error) {
            console.error('Error deleting destination:', error);
            toast.error('Failed to delete destination');
        }
    };

    const handleEditClick = (destination: any) => {
        setDestinationToEdit(destination);
        setEditDialogOpen(true);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationToEdit({ ...destinationToEdit, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`/api/destinations/${destinationToEdit.id}`, destinationToEdit);
            toast.success('Destination updated successfully');
            setEditDialogOpen(false);
            fetchDestinations(search, page);
        } catch (error) {
            console.error('Error updating destination:', error);
            toast.error('Failed to update destination');
        }
    };

    return (
        <div className="w-full mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Destinations</h1>
                <Link href="/new-destination">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Destination
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="w-full flex justify-between items-center ">
                    <CardTitle>Your Destinations</CardTitle>
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search destinations..."
                            value={search}
                            onChange={handleSearchChange}
                            className="w-64"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <Search className="h-5 w-5" />
                        </span>
                    </div>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <Loader loading={loading} />
                    ) : (
                        <>
                            <DestinationTable
                                destinations={destinations}
                                onDelete={handleDeleteClick}
                                onEdit={handleEditClick}
                            />

                            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                        </>
                    )}
                </CardContent>
            </Card>

            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogTitle>Edit Destination</DialogTitle>
                    <DialogDescription>Update the details of the destination.</DialogDescription>
                    <Input
                        type="text"
                        name="name"
                        value={destinationToEdit?.name || ''}
                        onChange={handleEditChange}
                        placeholder="Destination Name"
                    />
                    <Input
                        type="text"
                        name="location"
                        value={destinationToEdit?.location || ''}
                        onChange={handleEditChange}
                        placeholder="Location"
                    />
                    <Button onClick={handleEditSubmit}>Save Changes</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
