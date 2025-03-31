import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await connectDB();
    const bookingData = await req.json();

    const newBooking = new Booking({
      ...bookingData, 
      createdAt: new Date(), 
    });

    await newBooking.save();

    console.log(newBooking,"new bookingsss")

    return NextResponse.json(
      { 
        message: "Booking created successfully", 
        booking: newBooking 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}