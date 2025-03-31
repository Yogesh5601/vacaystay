import { NextRequest, NextResponse } from 'next/server'
import properties from '@/models/Properties'
import connectDB from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const { id } = await params; 
    const response = await properties.findById(id).lean()
    
    if (!properties) {
      return NextResponse.json(
        { success:false, error: 'properties not found' }
      )
    }
    
    return NextResponse.json({success:true, response})
  } catch (error) {
    console.log("error fetch property:", error)
    return NextResponse.json(
      {success:false, error: 'Failed to fetch properties' }
    )
  }
}

// PUT update properties
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const data = await request.json()
    
    const response = await properties.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    )
    
    return NextResponse.json({response, success:true})
  } catch (error) {
    console.log("error update property:", error)
    return NextResponse.json(
      {success:false, error: 'Failed to update properties' }
    )
  }
}

// DELETE properties
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    await properties.findByIdAndDelete(params.id)
    
    return NextResponse.json(
      { success:true,message: 'properties deleted successfully' }
    )
  } catch (error) {
    console.log("error delete property:", error)
    return NextResponse.json(
      {success:false, error: 'Failed to delete properties' }
    )
  }
}