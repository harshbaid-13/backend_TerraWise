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

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS, GET");
//   next();
// });

// var corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(express.json(), cors(corsOptions));
// app.use("/api/users", userRoutes), cors(corsOptions);
// app.use("/api/geojson", geojsonRoutes, cors(corsOptions));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/geojson", geojsonRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
