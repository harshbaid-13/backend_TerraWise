const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");
const geojsonRoutes = require("./routes/geojsonRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/geojson", geojsonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
