"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";

// Shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ImagePlus } from "lucide-react";
import { uploadImagesFunction } from "@/lib/uploadFiles";

// Form validation schema
const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
    city: z.string().min(1, "City is required"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    coverImage: z.string().min(1, "Cover image is required"),
    bestTimeToVisit: z.string().min(3, "Best time to visit is required"),
    averageCostPerDay: z.number().optional().nullable(),
    category: z.array(z.string()).default([]),
    isPopular: z.boolean().default(false),
    averageRating: z.number().min(1).max(5).optional().nullable(),
});

type DestinationFormData = z.infer<typeof formSchema>;

const categories = [
    'Beach', 'Mountain', 'City', 'Historical',
    'Adventure', 'Cultural', 'Nature', 'Food'
];

export default function AddDestination() {
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImageUrl, setCoverImageUrl] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const coverImageRef = useRef<HTMLInputElement>(null);

    const form = useForm<DestinationFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            country: "",
            city: "",
            description: "",
            coverImage: "",
            bestTimeToVisit: "",
            averageCostPerDay: null,
            category: [],
            isPopular: false,
            averageRating: null,
        }
    });

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
                form.setValue("coverImage", urls[0]);
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

    const onSubmit = async (data: DestinationFormData) => {
        if (!data.coverImage) {
            toast.error("Please upload a cover image");
            return;
        }

        try {
            const destinationData = {
                ...data,
                images: uploadedImageUrls,
            };

            const response = await axios.post('/api/admin/destination', destinationData);
            toast.success("Destination added successfully!");

            // Reset form
            form.reset();
            setCoverImage(null);
            setCoverImageUrl("");
            setSelectedImages([]);
            setUploadedImageUrls([]);

        } catch (error) {
            console.error('Error adding destination:', error);
            toast.error("Failed to add destination");
        }
    };

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">
                    Add New Destination
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Destination Name</Label>
                            <Input
                                id="name"
                                placeholder="Paris, France"
                                {...form.register("name")}
                            />
                            {form.formState.errors.name && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Country */}
                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                placeholder="France"
                                {...form.register("country")}
                            />
                            {form.formState.errors.country && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.country.message}
                                </p>
                            )}
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                placeholder="Paris"
                                {...form.register("city")}
                            />
                            {form.formState.errors.city && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.city.message}
                                </p>
                            )}
                        </div>

                        {/* Best Time to Visit */}
                        <div className="space-y-2">
                            <Label htmlFor="bestTimeToVisit">Best Time to Visit</Label>
                            <Input
                                id="bestTimeToVisit"
                                placeholder="April to June"
                                {...form.register("bestTimeToVisit")}
                            />
                            {form.formState.errors.bestTimeToVisit && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.bestTimeToVisit.message}
                                </p>
                            )}
                        </div>

                        {/* Average Cost */}
                        <div className="space-y-2">
                            <Label htmlFor="averageCostPerDay">Average Cost Per Day ($)</Label>
                            <Input
                                id="averageCostPerDay"
                                type="number"
                                {...form.register("averageCostPerDay", {
                                    valueAsNumber: true,
                                    setValueAs: (v) => v === "" ? null : Number(v)
                                })}
                            />
                            {form.formState.errors.averageCostPerDay && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.averageCostPerDay.message}
                                </p>
                            )}
                        </div>

                        {/* Average Rating */}
                        <div className="space-y-2">
                            <Label htmlFor="averageRating">Average Rating (1-5)</Label>
                            <Input
                                id="averageRating"
                                type="number"
                                min={1}
                                max={5}
                                step={0.1}
                                {...form.register("averageRating", {
                                    valueAsNumber: true,
                                    setValueAs: (v) => v === "" ? null : Number(v)
                                })}
                            />
                            {form.formState.errors.averageRating && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.averageRating.message}
                                </p>
                            )}
                        </div>

                        {/* Popular Destination */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isPopular"
                                {...form.register("isPopular")}
                                className="border-black"
                            />
                            <Label htmlFor="isPopular">Mark as Popular Destination</Label>
                        </div>
                    </div>

                    {/* Cover Image Upload */}
                    <div className="space-y-2">
                        <Label>Cover Image</Label>
                        <div className="flex items-center gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => coverImageRef.current?.click()}
                                disabled={isUploading}
                            >
                                <ImagePlus className="mr-2 h-4 w-4" />
                                {coverImage ? "Change Cover" : "Upload Cover"}
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
                                        src={coverImage ? URL.createObjectURL(coverImage) : coverImageUrl}
                                        alt="Cover preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        {form.formState.errors.coverImage && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.coverImage.message}
                            </p>
                        )}
                        {isUploading && coverImage && (
                            <p className="text-sm text-muted-foreground">Uploading cover image...</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Tell travelers about this destination..."
                            rows={5}
                            {...form.register("description")}
                        />
                        {form.formState.errors.description && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="space-y-2">
                        <Label>Categories</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {categories.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`category-${category}`}
                                        value={category}
                                        checked={form.watch("category")?.includes(category)}
                                        onCheckedChange={(checked) => {
                                            const currentCategories = form.getValues("category") || [];
                                            if (checked) {
                                                form.setValue("category", [...currentCategories, category]);
                                            } else {
                                                form.setValue(
                                                    "category",
                                                    currentCategories.filter((c) => c !== category)
                                                );
                                            }
                                        }}
                                    />
                                    <Label htmlFor={`category-${category}`}>{category}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isUploading}>
                        {isUploading ? "Processing..." : "Add Destination"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}