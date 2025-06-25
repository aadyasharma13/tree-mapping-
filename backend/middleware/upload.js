const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure local disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg and .png files are allowed!'));
  }
};

// Configure upload middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

// Custom middleware to add URLs to files after upload
const processUploadedFiles = (req, res, next) => {
  if (!req.files) return next();
  
  // Add URL to each file
  req.files = req.files.map(file => {
    const relativePath = path.relative(path.join(__dirname, '..'), file.path).replace(/\\/g, '/');
    return {
      ...file,
      url: `http://${req.headers.host}/${relativePath}`
    };
  });
  
  next();
};

module.exports = {
  upload,
  processUploadedFiles
}; 