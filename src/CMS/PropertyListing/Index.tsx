'use client'
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Property } from '@/types';
import { DeleteDialog } from '@/components/common/DeleteDialog';
import { PropertyTable } from '@/components/common/PropertyTable';
import { EditDialog } from '@/components/common/EditDialog';

export default function PropertyListings() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
    const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('/api/properties');
                setProperties(response.data.result.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
                toast.error('Failed to fetch properties');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

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
            // Refresh the list after deletion
            const response = await axios.get('/api/properties');
            setProperties(response.data.result.data);
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error('Failed to delete property');
        } finally {
            setDeleteDialogOpen(false);
            setPropertyToDelete(null);
        }
    };

    const handleEditSuccess = async () => {
        try {
            // Refresh the list after edit
            const response = await axios.get('/api/properties');
            setProperties(response.data.result.data);
        } catch (error) {
            console.error('Error refreshing properties:', error);
        }
    };

    return (
        <div className="w-full mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Vacation Rentals CMS</h1>
                <Link href="/new-property">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Rental
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Properties</CardTitle>
                    <CardDescription>Manage your vacation rental listings</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <PropertyTable 
                            properties={properties} 
                            onDelete={handleDeleteClick}
                            onEdit={handleEditClick}
                        />
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