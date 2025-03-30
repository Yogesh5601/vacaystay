
import { uploadToCloudinary } from "@/utils/cloudnairy";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // Convert File objects to Buffers and upload to Cloudinary
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        // Check if it's actually a File object
        if (!(file instanceof File)) {
          throw new Error("Invalid file format");
        }
        
        const buffer = Buffer.from(await file.arrayBuffer());
        return uploadToCloudinary({ buffer, originalname: file.name });
      })
    );

    return NextResponse.json({ uploadedUrls });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload images" }, 
      { status: 500 }
    );
  }
}