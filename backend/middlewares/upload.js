import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../service/cloudinary.js";

/* VERIFY CONFIG */
console.log("Cloudinary config inside upload.js:");
console.log(cloudinary.config());

/* STORAGE */
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "event_payments",
      allowed_formats: ["jpg", "jpeg", "png"],
      public_id: `payment_${Date.now()}`,
    };
  },
});

/* MULTER */
const upload = multer({
  storage: storage,
});

export default upload;
