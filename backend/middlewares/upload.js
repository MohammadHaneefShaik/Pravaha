import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../service/cloudinary.js";

/* VERIFY CONFIG */
console.log("Cloudinary config inside upload.js:");
console.log(cloudinary.config());

/* ============================
   STORAGE — Payment Screenshots
============================ */
const paymentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "event_payments",
      allowed_formats: ["jpg", "jpeg", "png"],
      public_id: `payment_${Date.now()}`,
    };
  },
});

/* ============================
   STORAGE — Abstract Documents
============================ */
const abstractStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "event_abstracts",
      allowed_formats: ["pdf", "doc", "docx"],
      resource_type: "raw",
      public_id: `abstract_${Date.now()}`,
    };
  },
});

/* MULTER INSTANCES */
const upload = multer({ storage: paymentStorage });
const uploadAbstract = multer({ storage: abstractStorage });

export { uploadAbstract };
export default upload;
