const express = require("express");
const {
  uploadGeoJSON,
  getGeoJSON,
  getImages,
} = require("../controllers/geojsonControllers");
const validateToken = require("../middlewares/validateTokenHandler");
const multer = require("multer");

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB (adjust as needed)
});

const router = express.Router();

router.post("/upload", validateToken, upload.single("file"), uploadGeoJSON);
router.get("/", validateToken, getGeoJSON);
router.get("/images", validateToken, getImages);

module.exports = router;
