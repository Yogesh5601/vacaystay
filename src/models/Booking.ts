import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    propertyId: { type: String, ref: "properties", required: false },
    userId: { type: String, ref: "User", required: false },
    checkIn: { type: Date, required: false },
    checkOut: { type: Date, required: false },
    totalPrice: { type: Number, required: false },
    guests: { type: Number, required: false },
    paymentId: { type: String, required: false }, 
    paymentStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    },
    paymentMethod: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer'], required: false },
    bookingStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    },

    specialRequests: { type: String },
    // transactionDetails: {
    //   amount: Number,
    //   currency: { type: String, default: 'USD' },
    //   paymentGateway: String,
    //   transactionDate: Date
    // },
    refundAmount: { type: Number, default: 0 },
    cancellationDate: { type: Date, default: null },
    reviewLeft: { type: Boolean, default: false }
  },
  { timestamps: false }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
