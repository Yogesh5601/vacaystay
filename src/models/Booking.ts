import mongoose, { Schema} from "mongoose";

const BookingSchema = new Schema(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "properties", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    guests: { type: Number, required: true },
    paymentId: { type: String, required: true }, // Changed to String as payment IDs are often alphanumeric
    paymentStatus: { type: Boolean, default: false }, // Changed to default false
    paymentMethod: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer'], required: true },
    bookingStatus: { 
      type: String, 
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending' 
    },
    cancellationPolicy: { type: String, required: true },
    specialRequests: { type: String },
    transactionDetails: {
      amount: Number,
      currency: { type: String, default: 'USD' },
      paymentGateway: String,
      transactionDate: Date
    },
    guestDetails: {
      name: String,
      email: String,
      phone: String,
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
      }
    },
    propertySnapshot: {
      // Store property details at time of booking
      title: String,
      images: [String],
      address: String,
      amenities: [String]
    },
    taxesAndFees: {
      serviceFee: Number,
      cleaningFee: Number,
      occupancyTax: Number
    },
    refundAmount: { type: Number, default: 0 },
    cancellationDate: { type: Date },
    reviewLeft: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
