'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

interface EditDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    property: any | null;
    onSuccess: () => void;
}

export function EditDialog({ open, onOpenChange, property, onSuccess }: EditDialogProps) {
    const { register, handleSubmit, setValue } = useForm();
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const coverImageRef = useRef<HTMLInputElement>(null);
    const propertyImagesRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (property) {
            // Reset all state when property changes
            setCoverImage(null);
            setCoverImageUrl(null);
            setSelectedImages([]);
            setUploadedImageUrls([]);
            setImagesToDelete([]);
            
            // Set form values
            setValue('title', property.title);
            setValue('location', property.location);
            setValue('description', property.description);
            setValue('pricePerNight', property.pricePerNight);
            setValue('beds', property.beds);
            setValue('baths', property.baths);
            setValue('propertyType', property.propertyType);
            setValue('maxGuests', property.maxGuests);
            
            // Set amenities
            property.amenities?.forEach((amenity: any) => {
                setValue(`amenities.${amenity}`, true);
            });

            // Set images
            setCoverImageUrl(property.coverImage);
        }
    }, [property, setValue]);

    const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCoverImage(file);
            
            // Upload cover image immediately
            const formData = new FormData();
            formData.append("files", file);
            const urls = await uploadImagesFunction(formData);
            if (urls.length > 0) {
                setCoverImageUrl(urls[0]);
            }
        }
    };

    const uploadImagesFunction = async (formData: FormData) => {
        setIsUploading(true);
        try {
            const response = await axios.post('/api/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Images uploaded successfully!");
            return response.data.uploadedUrls;
        } catch (error) {
            console.error('Error uploading files:', error);
            toast.error("Failed to upload images"); 
            return [];
        } finally {
            setIsUploading(false);
        }
    };

    const handlePropertyImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            setSelectedImages(prev => [...prev, ...files]);
            
            const formData = new FormData();
            files.forEach(file => formData.append("files", file));
            const urls = await uploadImagesFunction(formData);
            setUploadedImageUrls(prev => [...prev, ...urls]);
        }
    };

    const removeExistingImage = (url: string) => {
        // Mark existing image for deletion
        setImagesToDelete(prev => [...prev, url]);
    };

    const removeNewImage = (index: number) => {
        // Remove newly uploaded image
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setUploadedImageUrls(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: any) => {
        if (!property) return;

        try {
            // Filter out images marked for deletion
            const remainingImages = property.images?.filter((img: string) => 
                !imagesToDelete.includes(img)
            ) || [];

            const propertyData = {
                ...data,
                coverImage: coverImageUrl || property.coverImage,
                images: [...remainingImages, ...uploadedImageUrls],
                imagesToDelete, // Send list of images to delete
                amenities: Object.keys(data.amenities || {}).filter(key => data.amenities[key]),
                host: property.host
            };

            await axios.put(`/api/properties/${property._id}`, propertyData);
            toast.success("Property updated successfully!");
            onSuccess();
            onOpenChange(false);
        } catch (error) {
            console.error('Error updating property:', error);
            toast.error("Failed to update property");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Property</DialogTitle>
                    <DialogDescription>
                        Make changes to your property here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title" className="block mb-2 font-medium">
                                Property Title
                            </Label>
                            <Input
                                id="title"
                                {...register("title")}
                                placeholder="Beautiful Beachfront Villa"
                                className="p-3 border rounded-md"
                            />
                        </div>

                        <div>
                            <Label htmlFor="location" className="block mb-2 font-medium">
                                Location
                            </Label>
                            <Input
                                id="location"
                                {...register("location")}
                                placeholder="Malibu, California"
                                className="p-3 border rounded-md"
                            />
                        </div>

                        <div>
                            <Label htmlFor="description" className="block mb-2 font-medium">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                {...register("description")}
                                placeholder="Describe your property..."
                                rows={4}
                                className="p-3 border rounded-md"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label className="block mb-2 font-medium">Cover Image</Label>
                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => coverImageRef.current?.click()}
                                    className="w-1/3"
                                    disabled={isUploading}
                                >
                                    {coverImage ? "Change Cover" : "Upload New Cover"}
                                </Button>
                                <input
                                    type="file"
                                    ref={coverImageRef}
                                    accept="image/*"
                                    onChange={handleCoverImageChange}
                                    className="hidden"
                                    disabled={isUploading}
                                />
                                {(coverImage || coverImageUrl) && (
                                    <div className="relative w-32 h-32 border rounded-md overflow-hidden">
                                        <Image
                                            src={coverImage ? URL.createObjectURL(coverImage) : coverImageUrl!}
                                            alt="Cover Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            {isUploading && coverImage && (
                                <p className="text-sm text-gray-500">Uploading cover image...</p>
                            )}
                        </div>

                     
                    <div className="space-y-4">
                        <div>
                            <Label className="block mb-2 font-medium">Property Images</Label>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => propertyImagesRef.current?.click()}
                                        className="w-1/3"
                                        disabled={isUploading}
                                    >
                                        Add More Images
                                    </Button>
                                    <input
                                        type="file"
                                        ref={propertyImagesRef}
                                        accept="image/*"
                                        multiple
                                        onChange={handlePropertyImagesChange}
                                        className="hidden"
                                        disabled={isUploading}
                                    />
                                </div>
                                {isUploading && selectedImages.length > 0 && (
                                    <p className="text-sm text-gray-500">Uploading images...</p>
                                )}

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {/* Existing images (not marked for deletion) */}
                                    {property?.images
                                        ?.filter((img: string) => !imagesToDelete.includes(img))
                                        .map((url: string, index: number) => (
                                            <div key={`existing-${index}`} className="relative group">
                                                <div className="relative aspect-square w-full rounded-md overflow-hidden border">
                                                    <Image
                                                        src={url}
                                                        alt={`Property ${index}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(url)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}

                                    {/* Newly uploaded images */}
                                    {selectedImages.map((file, index) => (
                                        <div key={`new-${index}`} className="relative group">
                                            <div className="relative aspect-square w-full rounded-md overflow-hidden border">
                                                <Image
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Property ${index}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="pricePerNight" className="block mb-2 font-medium">
                                Price per night ($)
                            </Label>
                            <Input
                                id="pricePerNight"
                                {...register("pricePerNight")}
                                type="number"
                                className="p-3 border rounded-md"
                            />
                        </div>

                        <div>
                            <Label htmlFor="propertyType" className="block mb-2 font-medium">
                                Property Type
                            </Label>
                            <Input
                                id="propertyType"
                                {...register("propertyType")}
                                placeholder="Villa, Apartment, etc."
                                className="p-3 border rounded-md"
                            />
                        </div>

                        <div>
                            <Label htmlFor="beds" className="block mb-2 font-medium">
                                Beds
                            </Label>
                            <Input
                                id="beds"
                                {...register("beds")}
                                type="number"
                                className="p-3 border rounded-md"
                            />
                        </div>

                        <div>
                            <Label htmlFor="baths" className="block mb-2 font-medium">
                                Baths
                            </Label>
                            <Input
                                id="baths"
                                {...register("baths")}
                                type="number"
                                step="0.5"
                                className="p-3 border rounded-md"
                            />
                        </div>

                        <div>
                            <Label htmlFor="maxGuests" className="block mb-2 font-medium">
                                Max Guests
                            </Label>
                            <Input
                                id="maxGuests"
                                {...register("maxGuests")}
                                type="number"
                                className="p-3 border rounded-md"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="block font-medium">Amenities</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                                "Infinity Pool",
                                "Beach Access",
                                "Air Conditioning",
                                "WiFi",
                                "Smart TV",
                                "Fully Equipped Kitchen",
                                "Washer/Dryer",
                                "Parking",
                                "Ocean View",
                            ].map((amenity) => (
                                <div key={amenity} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={`amenity-${amenity}`} 
                                        {...register(`amenities.${amenity}`)} 
                                        defaultChecked={property?.amenities?.includes(amenity)}
                                    />
                                    <label
                                        htmlFor={`amenity-${amenity}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {amenity}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isUploading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isUploading}>
                            {isUploading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}