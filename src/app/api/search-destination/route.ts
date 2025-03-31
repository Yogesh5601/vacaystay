import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Destinations from "@/models/Destinations";

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const searchQuery = searchParams.get('query') || '';


    const query: any = {};

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, 'i');
      query.$or = [
        { city: searchRegex },
        { country: searchRegex },
        { name: searchRegex },
      ];
    }
    const total = await Destinations.countDocuments(query);


    const data = await Destinations.find(query)
      .select("name coverImage")
      .lean()


    const result = {
      total,
      data
    }
    return NextResponse.json({ success: true, result })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error, message: 'Failed to fetch rentals' }
    )
  }
}