// utils/cloudinary.ts
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'
import { Readable } from 'stream'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true
})

interface UploadedFile {
  buffer: Buffer
  originalname: string
}



export const uploadToCloudinary = async (file: UploadedFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Extract file name and extension
    const fileName = file.originalname.split('.')[0]
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase()
    
    // Determine resource type
    const resourceType = fileExtension === 'pdf' ? 'raw' : 'image'
    
    // Create a readable stream from buffer
    const readableStream = new Readable()
    readableStream.push(file.buffer)
    readableStream.push(null) // Signals end of stream

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: fileName,
        overwrite: true,
        resource_type: resourceType
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          return reject(new Error(error.message || 'Failed to upload file'))
        }
        if (!result) {
          return reject(new Error('Upload result is undefined'))
        }
        resolve(result.secure_url)
      }
    )

    readableStream.pipe(uploadStream)
  })
}



export const extractPublicId = (url: string): string => {
  const parts = url.split('/')
  const filenameWithExt = parts[parts.length - 1]
  return filenameWithExt.split('.')[0]
}

export const deleteFromCloudinary = async (url: string): Promise<boolean> => {
  try {
    const publicId = extractPublicId(url)
    const result = await cloudinary.uploader.destroy(publicId)
    return result.result === 'ok'
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    return false
  }
}