'use client'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Property } from '@/types';
import { Button } from '@/components/ui/button';

interface PropertyTableProps {
    properties: Property[];
    onDelete: (id: string) => void;
    onEdit: (property: Property) => void;
}

export function PropertyTable({ properties, onDelete, onEdit }: any) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {properties?.map((property:any) => (
                    <TableRow key={property._id}>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell>{property.location}</TableCell>
                        <TableCell>${property.pricePerNight}/night</TableCell>
                        <TableCell>{property.published ? 'Published' : 'Draft'}</TableCell>
                        <TableCell className="flex space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => onEdit(property)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => onDelete(property._id)}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}