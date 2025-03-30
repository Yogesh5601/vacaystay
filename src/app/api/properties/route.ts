import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { IProperties } from "@/models/Properties";
import { validateRentalData } from "@/utils/validation";
import Properties from "@/models/Properties";



export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 10
    const page = Number(searchParams.get('page')) || 1;
    const location = searchParams.get('location') || '';

    // Build the query object
    const query: any = {};

    if (location) {
      // Case-insensitive search for location
      query.location = { $regex: new RegExp(location, 'i') };
    }

    const total = await Properties.countDocuments(query);
    const data = await Properties.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()

    const result = {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
    return NextResponse.json({ success: true, result })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, message: 'Failed to fetch rentals' }
    )
  }
}



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

    const property = new Properties(propertyData);
    await property.save();

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


