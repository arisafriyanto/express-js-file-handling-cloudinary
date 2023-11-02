const multer = require("multer");
const path = require("path");

// menentukan tempat penyimpanan file
const publicDirectory = path.join(__dirname, "public");
const uploadDirectory = path.join(publicDirectory, "uploads");

// mendefinisikan gimana cara menyimpan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

module.exports = multer({ storage });
