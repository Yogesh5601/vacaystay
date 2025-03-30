import Properties, { IProperties } from "@/models/Properties";
import { validateRentalData } from "@/utils/validation";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";


export async function POST(req: Request) {
    try {
      await connectDB();
  
      const data = await req.json();
  
      const validationErrors = validateRentalData(data);
      if (validationErrors) {
        return NextResponse.json(
          { error: "Validation failed", details: validationErrors },
          { status: 400 }
        );
      }
  
      // Transform data if needed
      const propertyData: Partial<IProperties> = {
        title: data.title,
        location: data.location,
        description: data.description,
        coverImage: data.coverImage,
        images: data.images || [],
        pricePerNight: Number(data.pricePerNight),
        beds: Number(data.beds),
        baths: Number(data.baths),
        rating: data.rating ? Number(data.rating) : undefined,
        propertyType: data.propertyType,
        maxGuests: data.maxGuests ? Number(data.maxGuests) : undefined,
        amenities: data.amenities || [],
        host: data.host
      };
  
      // Create new Property instance and save it
      const property = new Properties(propertyData);
      await property.save();
  
      // Return success response
      const responseData = property.toObject();
      return NextResponse.json(responseData, { status: 201 });
  
    } catch (error: any) {
      console.error("Error creating property:", error);
  
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { error: "Validation failed", details: error.errors },
          { status: 400 }
        );
      }
  
      if (error.code === 11000) {
        return NextResponse.json(
          { error: "Property with similar unique properties already exists" },
          { status: 409 }
        );
      }
  
      return NextResponse.json(
        { error: "Failed to create property", details: error.message },
        { status: 500 }
      );
    }
  }