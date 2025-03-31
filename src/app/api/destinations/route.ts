
import {  NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Destinations from "@/models/Destinations";

export async function GET() {
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
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error, message: 'Failed to fetch rentals' }
        )
    }
}