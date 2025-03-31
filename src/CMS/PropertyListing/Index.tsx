'use client'
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Property } from '@/types';
import { DeleteDialog } from '@/components/common/DeleteDialog';
import { PropertyTable } from '@/components/common/PropertyTable';
import { EditDialog } from '@/components/common/EditDialog';
import Loader from '@/components/common/Loader';
import { Input } from '@/components/ui/input';
import { debounce } from '@/utils/globalfunctions';
import { Pagination } from '@/components/common/Pagination';

export default function PropertyListings() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
    const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const limit = 4;

    const fetchProperties = async (query: string = '', pageNum: number = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/properties?search=${query}&page=${pageNum}&limit=${limit}`);
            setProperties(response.data.result.data);
            setTotalPages(Math.ceil(response.data.result.pagination.total / limit));
        } catch (error) {
            console.error('Error fetching properties:', error);
            toast.error('Failed to fetch properties');
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setPage(1);
            fetchProperties(query, 1);
        }, 500),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query);
        debouncedSearch(query);
    };

    useEffect(() => {
        fetchProperties(search, page);
    }, [search, page]);


    const handleDeleteClick = (id: string) => {
        setPropertyToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleEditClick = (property: Property) => {
        setPropertyToEdit(property);
        setEditDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!propertyToDelete) return;

        try {
            await axios.delete(`/api/properties/${propertyToDelete}`);
            toast.success('Property deleted successfully');
            fetchProperties(search, page);
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error('Failed to delete property');
        } finally {
            setDeleteDialogOpen(false);
            setPropertyToDelete(null);
        }
    };

    const handleEditSuccess = async () => {
        fetchProperties(search, page);
    };

    return (
        <div className="w-full mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Properties</h1>
                <Link href="/new-destination">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Property
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="w-full flex justify-between items-center">
                    <CardTitle>Your Properties</CardTitle>
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search properties..."
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
                            <PropertyTable
                                properties={properties}
                                onDelete={handleDeleteClick}
                                onEdit={handleEditClick}
                            />
                            <Pagination page={page} setPage={setPage} totalPages={totalPages} />

                        </>
                    )}
                </CardContent>
            </Card>

            <DeleteDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
            />

            <EditDialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                property={propertyToEdit}
                onSuccess={handleEditSuccess}
            />
        </div>
    );
}
