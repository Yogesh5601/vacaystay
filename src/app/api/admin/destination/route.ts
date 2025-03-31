
import { NextRequest, NextResponse } from "next/server";
import Destinations, { IDestinations } from "@/models/Destinations";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data = await req.json();

    // Only essential destination data
    const destinationData: Partial<IDestinations> = {
      // Core identification
      name: data.name,
      country: data.country,
      city: data.city,

      // Basic info
      description: data.description,
      coverImage: data.coverImage, // Just the URL string

      // Travel essentials
      bestTimeToVisit: data.bestTimeToVisit, // String like "May-September"
      averageCostPerDay: data.averageCostPerDay ? Number(data.averageCostPerDay) : null,

      // Simple categorization
      category: data.category || [], // Array of strings like ["beach", "cultural"]

      // Basic stats
      isPopular: data.isPopular || false,
      averageRating: data.averageRating ? Number(data.averageRating) : null
    };
    await dbConnect()
    // Create and save destination
    const destination = new Destinations(destinationData);
    await destination.save();

    // Return success response
    return NextResponse.json({
      success: true,
      data: destination.toObject()
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error creating destination:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Destination already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create destination",
        message: error.message
      },
      { status: 500 }
    );
  }
}


export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 10;
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }, 
        { country: { $regex: search, $options: "i" } }, 
        { city: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Destinations.countDocuments(query);
    const data = await Destinations.find(query).limit(limit).skip(skip).lean();

    return NextResponse.json({
      success: true,
      result: {
        data,
        pagination: { total, page, limit },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, message: "Failed to fetch rentals" },
      { status: 500 }
    );
  }
}
