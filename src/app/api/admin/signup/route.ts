
import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { ROLES } from "@/utils/role";

export async function POST(req: Request) {
  let firebaseUser = null;
  
  try {
    const { email, password, name } = await req.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" }, 
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
      role:ROLES.SUPER_ADMIN,
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser }, 
      { status: 201 }
    );

  } catch (error: any) {
    // Cleanup Firebase user if MongoDB save failed
    if (firebaseUser) {
      try {
        await deleteUser(firebaseUser);
      } catch (deleteError) {
        console.error("Failed to delete Firebase user during rollback:", deleteError);
      }
    }

    console.error("Error in sign-up:", error);
    
    return NextResponse.json(
      { 
        error: "Internal Server Error",
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}