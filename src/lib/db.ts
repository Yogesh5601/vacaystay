// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// try {
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
  
//   clientPromise.catch((error) => {
//     console.error("MongoDB connection error:", error);
//     process.exit(1); // Exit the process on connection failure
//   });

// } catch (error) {
//   console.error("MongoDB initialization error:", error);
//   throw new Error("Failed to initialize MongoDB client");
// }

// export default clientPromise;

// lib/db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;