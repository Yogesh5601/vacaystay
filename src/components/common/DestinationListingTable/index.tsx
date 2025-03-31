'use client';

import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

interface DestinationTableProps {
  destinations: any[];
  onDelete: (id: string) => void;
  onEdit: (destination: any) => void;
}

export function DestinationTable({ destinations, onDelete, onEdit }: DestinationTableProps) {
  console.log(destinations,"destinationsssssssssssssss")
  return (
    <div className="overflow-x-auto">
      <Table className="w-full border border-gray-200">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="p-3">Name</TableHead>
            <TableHead className="p-3">Country</TableHead>
            <TableHead className="p-3">City</TableHead>
            <TableHead className="p-3">Best Time to Visit</TableHead>
            <TableHead className="p-3">Average Rating</TableHead>
            <TableHead className="p-3">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {destinations.length > 0 ? (
            destinations.map((destination) => (
              <TableRow key={destination._id} className="border-b hover:bg-gray-50">
                <TableCell className="p-3">{destination.name}</TableCell>
                <TableCell className="p-3">{destination.country}</TableCell>
                <TableCell className="p-3">{destination.city}</TableCell>
                <TableCell className="p-3">{destination.bestTimeToVisit}</TableCell>
                <TableCell className="p-3">{destination.averageRating ?? 'N/A'}</TableCell>
                <TableCell className="p-3 flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(destination)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(destination._id)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                No destinations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}