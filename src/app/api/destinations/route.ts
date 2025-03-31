import Properties, { IProperties } from "@/models/Properties";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Destinations from "@/models/Destinations";

export async function GET(request: NextRequest) {
    try {
        await connectDB()
        const total = await Destinations.countDocuments();
        const data = await Destinations.find()
            // .select("name coverImage")
            .lean()
        const result = {
            total,
            data
        }
        return NextResponse.json({ success: true, result })
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message, message: 'Failed to fetch rentals' }
        )
    }
}