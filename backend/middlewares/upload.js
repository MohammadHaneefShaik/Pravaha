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
    const ext =
      file.mimetype === "application/pdf"
        ? "pdf" // Note: Cloudinary adds the dot automatically in many cases
        : file.mimetype === "application/msword"
        ? "doc"
        : "docx";

    return {
      folder: "event_abstracts",
      // CHANGE THIS: "image" allows PDFs to be viewed inline
      resource_type: "image", 
      public_id: `abstract_${Date.now()}`,
      format: ext, // Using format instead of appending to public_id is cleaner
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
