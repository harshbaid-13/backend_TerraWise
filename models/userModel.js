const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please enter company name"],
      unique: [true, "Company name already exists"],
    },
    email: {
      type: String,
      required: [true, "Please enter email address"],
      unique: [true, "Email address already exists"],
    },
    password: { type: String, required: [true, "Please enter password"] },
    role: {
      type: String,
      default: "client",
    },
    dataId: { type: mongoose.Schema.Types.ObjectId, ref: "GeojsonData" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DemoUser", userSchema);
