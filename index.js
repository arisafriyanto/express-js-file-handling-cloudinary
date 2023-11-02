const express = require("express");
const cors = require("cors");
const upload = require("./upload");
const cloudinary = require("./cloudinary");
const uploadOnMemory = require("./uploadOnMemory");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.put("/api/v1/profiles/:id/picture", upload.single("picture"), (req, res) => {
  const url = `/uploads/${req.file.filename}`;

  res.status(200).json({
    status: true,
    message: `Foto berhasil diupload!`,
    file: url,
  });
});

app.put("/api/v1/profiles/:id/picture/cloudinary", uploadOnMemory.single("picture"), (req, res) => {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, { folder: "my-folder" }, (err, result) => {
    if (!!err) {
      console.log(err);
      return res.status(401).json({
        message: "Upload image failed!",
      });
    }

    res.status(201).json({
      status: true,
      message: "Upload image berhasil!",
      url: result.url,
    });
  });
});

app.listen(PORT, "localhost", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
