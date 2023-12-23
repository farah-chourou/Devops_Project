//const { cloudinary } = require("../utils/cloudinaryConfig");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinaryConfig = require("../utils/cloudinaryConfig");
const cloudinary = require("cloudinary").v2;

const Storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      resource_type: "auto",
      folder: "Platform_Suivis_Client",
      public_id: file.originalname,
    };
  },
});
const uploadDoc = multer({
  storage: Storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).fields([{ name: "Documentation", maxCount: 1 }]);
module.exports = { uploadDoc };
