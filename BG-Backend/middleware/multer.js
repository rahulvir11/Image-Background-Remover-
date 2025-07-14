import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /\.(jpg|jpeg|png|webp)$/i;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Multer upload instance
const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25 MB limit
});

export const uploadSingleImage = upload.single('image'); // field name must be 'image'
