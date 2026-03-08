import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../service/cloudinary.js";
import path from "path";

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
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png"],
      public_id: `payment_${Date.now()}`,
    };
  },
});

/* ============================
   STORAGE — Abstract Documents
   Supports: PDF / DOC / DOCX
============================ */
const abstractStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname); // keeps .pdf .doc .docx

    return {
      folder: "event_abstracts",
      resource_type: "auto", // automatically detects file type
      public_id: `abstract_${Date.now()}${ext}`,
    };
  },
});

/* ============================
   FILE FILTER — Abstract Upload
============================ */
function abstractFileFilter(req, file, cb) {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, and DOCX files are allowed"), false);
  }
}

/* ============================
   MULTER INSTANCES
============================ */

/* Payment screenshot upload */
const upload = multer({
  storage: paymentStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/* Abstract upload */
const uploadAbstract = multer({
  storage: abstractStorage,
  fileFilter: abstractFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

/* ============================
   EXPORTS
============================ */

export { uploadAbstract };
export default upload;
