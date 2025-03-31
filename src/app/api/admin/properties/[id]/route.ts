import { NextRequest, NextResponse } from 'next/server'
import properties from '@/models/Properties'
import connectDB from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Extract ID from URL params
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();


    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Property ID is missing' },
        { status: 400 }
      );
    }

    await connectDB();

    const property = await properties.findById(id).lean();

    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, property });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch property', error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
      // Extract ID from URL params
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop();


      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Property ID is missing' },
          { status: 400 }
        );
      }

      await connectDB()
      const data = await req.json()

      const updatedProperty = await properties.findByIdAndUpdate(
        id,
        data,
        { new: true }
      )

      if (!updatedProperty) {
        return NextResponse.json(
          { success: false, error: 'Property not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ success: true, data: updatedProperty })
    } catch (error) {
      console.error("Error updating property:", error)
      return NextResponse.json(
        { success: false, error: 'Failed to update property' },
        { status: 500 }
      )
    }
  }

export async function DELETE(req: NextRequest) {
    try {
        // Extract ID from URL params
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop(); 
    
    
        if (!id) {
          return NextResponse.json(
            { success: false, error: 'Property ID is missing' },
            { status: 400 }
          );
        }
    
      await connectDB()
      const deletedProperty = await properties.findByIdAndDelete(id)

      if (!deletedProperty) {
        return NextResponse.json(
          { success: false, error: 'Property not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(
        { success: true, message: 'Property deleted successfully' }
      )
    } catch (error) {
      console.error("Error deleting property:", error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete property' },
        { status: 500 }
      )
    }
  }