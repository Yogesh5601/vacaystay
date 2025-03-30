import Properties, { IProperties } from "@/models/Properties";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
      await connectDB()
  
      const { searchParams } = new URL(request.url)
      const limit = Number(searchParams.get('limit')) || 10
      const page = Number(searchParams.get('page')) || 1;
      const searchQuery = searchParams.get('query') || '';
      
      const query: any = {};
      
      if (searchQuery) {
        const searchRegex = new RegExp(searchQuery, 'i');
        query.$or = [
          { title: searchRegex },
          { location: searchRegex },
          { description: searchRegex },
          { 'address.street': searchRegex },
          { 'address.city': searchRegex },
          { 'address.state': searchRegex },
          { propertyType: searchRegex }
        ];
      }
      const total = await Properties.countDocuments(query);
  
      const data = await Properties.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
      
      const result = {
        total,
        data
      }
      return NextResponse.json({success:true, result})
    } catch (error:any) {
      return NextResponse.json(
        {success:false, error:error.message, message: 'Failed to fetch rentals' }
      )
    }
  }