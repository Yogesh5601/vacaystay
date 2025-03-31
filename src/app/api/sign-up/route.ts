
import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  let firebaseUser = null;
  
  try {
    const { email, password, name } = await req.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields",  success:false, }, 
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists",  success:false, }, 
        { status: 400 }
      );
    }

    // Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    firebaseUser = userCredential.user;

    // Save to MongoDB
    const newUser = await User.create({
      email,
      name,
      password,
      firebaseUID: firebaseUser.uid,
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser,  success:true, }, 
      { status: 201 }
    );

  } catch (error) {
    // Cleanup Firebase user if MongoDB save failed
    if (firebaseUser) {
      try {
        await deleteUser(firebaseUser);
        console.log(`Rolled back Firebase user ${firebaseUser.uid} due to MongoDB failure`);
      } catch (deleteError) {
        console.error("Failed to delete Firebase user during rollback:", deleteError);
      }
    }

    console.error("Error in sign-up:", error);
    
    return NextResponse.json(
      { 
        success:false,
        error: "Internal Server Error",
        details: error 
      }
    );
  }
}