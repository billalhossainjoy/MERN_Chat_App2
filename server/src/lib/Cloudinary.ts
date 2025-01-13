import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import { CLOUDINARY_API_NAME } from "../config/env.config";

class Cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: CLOUDINARY_API_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  uploader = async (file: string) => {
    try {
      const res = await cloudinary.uploader.upload(file);
      return res;
    } catch (error) {
      throw error;
    }
  };

  delete() {}
}

export default Cloudinary;
