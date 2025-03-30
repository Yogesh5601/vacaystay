// utils/validation.ts
export function validateRentalData(data: any): Record<string, string> | null {
  const errors: Record<string, string> = {};

  // Required fields validation
  if (!data.title) errors.title = "Title is required";
  if (!data.description) errors.description = "Description is required";
  if (!data.location) errors.location = "Location is required";
  if (!data.coverImage) errors.coverImage = "Cover image is required";
  
  // Numeric fields validation
  if (!data.pricePerNight || isNaN(data.pricePerNight)) {
    errors.pricePerNight = "Valid price per night is required";
  }
  if (!data.beds || isNaN(data.beds)) {
    errors.beds = "Valid beds count is required";
  }
  if (!data.baths || isNaN(data.baths)) {
    errors.baths = "Valid baths count is required";
  }

  // Optional numeric fields
  if (data.maxGuests && isNaN(data.maxGuests)) {
    errors.maxGuests = "Max guests must be a number";
  }
  if (data.rating && (isNaN(data.rating) || data.rating < 0 || data.rating > 5)) {
    errors.rating = "Rating must be between 0 and 5";
  }

  // Property type validation
  const validPropertyTypes = [
    "Apartment", "House", "Villa", "Cabin", "Cottage", 
    "Condominium", "Beach House", "Loft", "Farm Stay", "Other"
  ];
  if (data.propertyType && !validPropertyTypes.includes(data.propertyType)) {
    errors.propertyType = "Invalid property type";
  }

  // Images array validation
  if (data.images && !Array.isArray(data.images)) {
    errors.images = "Images must be an array";
  }

  // Host validation (if provided)
  // if (data.host && !mongoose.Types.ObjectId.isValid(data.host)) {
  //   errors.host = "Invalid host ID";
  // }

  // Return null if no errors, otherwise return errors object
  return Object.keys(errors).length > 0 ? errors : null;
}