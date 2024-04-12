const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const GeojsonData = require("../models/geojsonModel");
const Image = require("../models/imageModel");

//@desc get a geoJSON file
//@route GET /api/geojson/
//@access private
const getGeoJSON = asyncHandler(async (req, res) => {
  const { role } = req.user;
  let email;
  if (role === "admin") {
    const { clientEmail } = req.query;
    if (!clientEmail) res.status(400).send("Send Client Email");
    email = clientEmail;
  } else email = req.user?.email;
  const user = await User.findOne({ email });
  const geoJSONData = await GeojsonData.findById(user.dataId);
  res.json(geoJSONData);
});

//@desc Upload a geoJSON file
//@route POST /api/geojson/upload
//@access private
const uploadGeoJSON = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  if (!req.file.buffer) {
    return res.status(400).send("File buffer is missing");
  }
  const { role } = req.user;
  let email;
  if (role === "admin") {
    const { clientEmail } = req.query;
    if (!clientEmail) res.status(400).send("Send Client Email");
    email = clientEmail;
  } else email = req.user?.email;
  const user = await User.findOne({ email });
  const geoJSONData = JSON.parse(req.file.buffer.toString());
  const data = await GeojsonData.create({ data: geoJSONData });
  user.dataId = data._id;
  await user.save();
  res.status(200).send("File uploaded successfully").json(data);
});

//@desc Get images using name of Combiner Box
//@route GET /api/geojson/images?name="xyz"
//@access private
const getImages = asyncHandler(async (req, res) => {
  const { name } = req.query;
  try {
    const images = await Image.findOne({ name });
    if (!images) {
      return res.json({ message: "Images not found" });
    }
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = { uploadGeoJSON, getGeoJSON, getImages };
