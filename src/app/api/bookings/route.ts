import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { checkIn, checkOut, guests, totalPrice, userId, propertyId } = await req.json();

    if (!checkIn || !checkOut || !guests || !totalPrice || !userId || !propertyId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }


    const newBooking = new Booking({
      checkIn,
      checkOut,
      guests,
      totalPrice,
      userId,
      propertyId,
      createdAt: new Date(),
    });

    await newBooking.save();
  } catch (error) {
    console.log("error:", error)
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
