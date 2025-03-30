import axios from "axios";
import { toast } from "sonner";

export const uploadImagesFunction = async (formData: FormData, setIsUploading:any) => {
    setIsUploading(true);
    try {
      const response = await axios.post('/api/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Images uploaded successfully!");
      return response.data.uploadedUrls;
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error("Failed to upload images");
      return [];
    } finally {
      setIsUploading(false);
    }
  };