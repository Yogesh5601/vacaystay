import { Schema, model } from 'mongoose';

export interface IDestinations {
    name: string;
    country: string;
    city: string;
    description: string;
    coverImage: string;
    bestTimeToVisit: string;
    averageCostPerDay?: number | null ;
    category: string[];
    isPopular: boolean;
    averageRating?: number | null;
}

const destinationSchema = new Schema<IDestinations>({
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },

    description: { type: String, required: true },
    coverImage: { type: String, required: true },

    bestTimeToVisit: { type: String, required: true },
    averageCostPerDay: { type: Number },
    category: { type: [String], default: [] },

    isPopular: { type: Boolean, default: false },
    averageRating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

export default model<IDestinations>('Destination', destinationSchema);