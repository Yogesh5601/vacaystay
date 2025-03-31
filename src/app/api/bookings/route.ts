import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const booking = await Booking.create(data);
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.log("error:", error)
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
