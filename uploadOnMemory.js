const multer = require("multer");
const path = require("path");

// mendefinisikan gimana cara menyimpan filenya
const storage = multer.memoryStorage();

// membuat upload middleware
module.exports = multer({ storage });
