import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProperties extends Document {
  title: string;
  location: string;
  description: string;
  coverImage: string;
  images: string[];
  pricePerNight: number;
  beds: number;
  baths: number;
  rating: number;
  propertyType?: string;
  maxGuests?: number;
  amenities?: string[];
  host?: mongoose.Types.ObjectId;
  cleaningFee: number;
  serviceFee: number; 
  createdAt?: Date;
  updatedAt?: Date;
}


const PropertiesSchema: Schema = new Schema<IProperties>(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    coverImage: { type: String, required: true }, 
    cleaningFee: { 
      type: Number, 
      required: true, 
      validate: {
        validator: (value) => value >= 0,
        message: "Cleaning fee must be a non-negative number."
      }
    },
     
    serviceFee: { type: Number,
      required: true, 
      validate: {
        validator: (value) => value >= 0,
        message: "service fee must be a non-negative number."
      }}, 
    images: { type: [String], default: [] },
    pricePerNight: { type: Number, required: true, min: 0 },
    beds: { type: Number, required: true, min: 0 },
    baths: { type: Number, required: true, min: 0 },
    rating: { type: Number, min: 0, max: 5 },
    // Optional fields
    propertyType: {
      type: String,
      enum: [
        "Apartment",
        "House",
        "Villa",
        "Cabin",
        "Cottage",
        "Condominium",
        "Beach House",
        "Loft",
        "Farm Stay",
        "Other",
      ],
    },
    maxGuests: { type: Number, min: 1 },
    amenities: { type: [String], default: [] },

    host: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Add text index for search functionality
PropertiesSchema.index({
  title: "text",
  description: "text",
  location: "text",
});

const Properties: Model<IProperties> =
  mongoose.models.Properties || mongoose.model<IProperties>("Properties", PropertiesSchema);

export default Properties;