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
        {success:false, error: 'properties not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({response, success:true})
  } catch (error) {
    return NextResponse.json(
      {success:false, message: 'Failed to fetch properties' ,error },
      { status: 500 }
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
    return NextResponse.json(
      { message: 'Failed to update properties' , error},
      { status: 500 }
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
      { message: 'properties deleted successfully' }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete properties', error },
      { status: 500 }
    )
  }
}