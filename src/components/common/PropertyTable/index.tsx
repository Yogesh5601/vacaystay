'use client'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

interface PropertyTableProps {
    properties: any[];
    onDelete: (id: string) => void;
    onEdit: (property: any) => void;
}

export function PropertyTable({ properties, onDelete, onEdit }: PropertyTableProps) {
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
                {properties?.map((property: any) => (
                    <TableRow key={property._id}>
                        <TableCell className="font-medium">{property.title.slice(0, 10)}</TableCell>
                        <TableCell>{property.location.slice(0, 10)}...</TableCell>
                        <TableCell>${property.pricePerNight}/night</TableCell>
                        <TableCell>{property.published ? 'Published' : 'Draft'}</TableCell>

                        <TableCell className="p-3 flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => onEdit(property)}>
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => onDelete(property._id)}>
                                <Trash className="w-4 h-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}