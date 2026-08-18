import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const uploadDir = path.resolve("storage/images");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,

  filename: (_, file, callback) => {
    const extension = file.originalname.split(".").pop();

    callback(
      null,
      `${crypto.randomUUID()}.${extension}`
    );
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (_, file, callback) => {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Unsupported file type"));
    }
  },
});