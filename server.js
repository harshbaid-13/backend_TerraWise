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
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.json(), cors(corsOptions));
app.use("/api/users", userRoutes), cors(corsOptions);
app.use("/api/geojson", geojsonRoutes, cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
