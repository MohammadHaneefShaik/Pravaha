import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../service/cloudinary.js";

/* =========================
   PAYMENT SCREENSHOTS
========================= */
const paymentStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "event_payments",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: `payment_${Date.now()}`,
  },
});

/* =========================
   ABSTRACT FILE STORAGE
========================= */
const abstractStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "event_abstracts",
    resource_type: "raw",
    public_id: `abstract_${Date.now()}`,
  },
});

/* =========================
   FILE FILTER
========================= */
const abstractFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF/DOC/DOCX allowed"), false);
  }
};

/* =========================
   MULTER INSTANCES
========================= */
const upload = multer({ storage: paymentStorage });

const uploadAbstract = multer({
  storage: abstractStorage,
  fileFilter: abstractFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
export { uploadAbstract };
