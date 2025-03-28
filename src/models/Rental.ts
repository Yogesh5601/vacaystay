import mongoose, { Schema, Document } from "mongoose";

export interface IRental extends Document {
  title: string;
  location: string;
  price: number;
  images: string[];
  inventory: number;
}

const RentalSchema = new Schema<IRental>(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    inventory: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Rental || mongoose.model<IRental>("Rental", RentalSchema);
