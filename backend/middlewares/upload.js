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
   NOTE: resource_type "raw" is required for PDFs/docs.
   Do NOT set allowed_formats here — it conflicts with raw uploads.
   File type filtering is handled by multer's fileFilter below.
============================ */
const abstractStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPDF = file.mimetype === "application/pdf";
    
    return {
      folder: "event_abstracts",
      // PDFs work best as 'image' for browser viewing
      // DOC/DOCX MUST be 'raw'
      resource_type: isPDF ? "image" : "raw", 
      public_id: `abstract_${Date.now()}`,
      // format is only used for 'image' type
      ...(isPDF && { format: "pdf" }), 
    };
  },
});

/* ============================
   Abstract file type filter — only PDF/DOC/DOCX
============================ */
function abstractFileFilter(req, file, cb) {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, and DOCX files are allowed"), false);
  }
}

/* ============================
   MULTER INSTANCES
============================ */

const upload = multer({
  storage: paymentStorage,
});

const uploadAbstract = multer({
  storage: abstractStorage,
  fileFilter: abstractFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

/* ============================
   EXPORTS
============================ */

export { uploadAbstract };
export default upload;
