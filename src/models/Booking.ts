import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
    rentalId: Types.ObjectId;  // Correct type for ObjectId
    userId: Types.ObjectId; 
  checkIn: Date;
  checkOut: Date;
  totalAmount: number;
}

const BookingSchema = new Schema<IBooking>(
  {
    rentalId: { type: Schema.Types.ObjectId, ref: "Rental", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
