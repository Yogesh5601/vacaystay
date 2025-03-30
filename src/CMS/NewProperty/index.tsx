"use client";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ghost } from "lucide-react";

const propertyTypes = [
  "Apartment", "House", "Villa", "Cabin", "Cottage", "Condominium", "Beach House", "Loft", "Farm Stay", "Other"
];

export default function AddProperty() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      location: "",
      description: "",
      pricePerNight: 100,
      cleaningFee: 20,
      serviceFee: 30,
      propertyType: "",
      beds: 2,
      baths: 1,
      maxGuests: 2,
      amenities: [],
    },
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const coverImageRef = useRef<HTMLInputElement>(null);
  const propertyImagesRef = useRef<HTMLInputElement>(null);

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

  const removePropertyImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setUploadedImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    if (!coverImageUrl) {
      toast.error("Please upload a cover image");
      return;
    }

    try {
      const propertyData = {
        ...data,
        coverImage: coverImageUrl,
        images: uploadedImageUrls,
        amenities: data.amenities ? (Array.isArray(data.amenities) ? data.amenities : [data.amenities]) : [],
        host: "67e67ce1aff2ee5b8eca1ca0"
      };

      const response = await axios.post('/api/properties', propertyData);
      toast.success("Property added successfully!");
      console.log("Property created:", response.data);
      // Optionally reset form or redirect here
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error("Failed to add property");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Add New Property
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="block mb-2 font-medium text-gray-700">
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
                <Label htmlFor="location" className="block mb-2 font-medium text-gray-700">
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
                <Label htmlFor="description" className="block mb-2 font-medium text-gray-700">
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
                <Label className="block mb-2 font-medium text-gray-700">Cover Image</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => coverImageRef.current?.click()}
                    className="w-1/3 hover:bg-primary"
                    disabled={isUploading}
                  >
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

              <div>
                <Label className="block mb-2 font-medium text-gray-700">Property Images</Label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => propertyImagesRef.current?.click()}
                      className="w-1/3 hover:bg-primary"
                      disabled={isUploading}
                    >
                      Add Images
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

                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {selectedImages.map((file, index) => (
                        <div key={index} className="relative group">
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
                            onClick={() => removePropertyImage(index)}
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
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pricePerNight" className="block mb-2 font-medium text-gray-700">
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
                <Label htmlFor="cleaningFee" className="block mb-2 font-medium text-gray-700">
                  Clealing Fee ($)
                </Label>
                <Input
                  id="cleaningFee"
                  {...register("cleaningFee")}
                  type="number"
                  className="p-3 border rounded-md"
                />
              </div>

              <div>
                <Label htmlFor="serviceFee" className="block mb-2 font-medium text-gray-700">
                  Service fee ($)
                </Label>
                <Input
                  id="serviceFee"
                  {...register("serviceFee")}
                  type="number"
                  className="p-3 border rounded-md"
                />
              </div>

              <div>
                <Label htmlFor="propertyType" className="block mb-2 font-medium text-gray-700">Property Type</Label>
                <Select {...register("propertyType")}>
                  <SelectTrigger className="bg-white/90 hover:bg-white focus:bg-white">
                    <SelectValue placeholder="Select Property Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 border-gray-200">
                    {propertyTypes.map((type: any) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="hover:bg-primary/10 focus:bg-primary"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="beds" className="block mb-2 font-medium text-gray-700">
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
                <Label htmlFor="baths" className="block mb-2 font-medium text-gray-700">
                  Baths
                </Label>
                <Input
                  id="baths"
                  {...register("baths")}
                  type="number"
                  className="p-3 border rounded-md"
                />
              </div>

              <div>
                <Label htmlFor="maxGuests" className="block mb-2 font-medium text-gray-700">
                  Max Guests
                </Label>
                <Input
                  id="maxGuests"
                  {...register("maxGuests")}
                  type="number"
                  value={register.maxGuests}
                  className="p-3 border rounded-md"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="block font-medium text-gray-700">Amenities</Label>
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
                    <Checkbox id={`amenity-${amenity}`} {...register("amenities")} value={amenity} />
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

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-3"
                disabled={isUploading}
              >
                {isUploading ? "Processing..." : "Submit Property"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}