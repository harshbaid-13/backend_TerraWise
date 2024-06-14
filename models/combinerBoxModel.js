const mongoose = require("mongoose");

const combinerBoxSchema = new mongoose.Schema(
  {
    collection_id: { type: String },
    combiner_box_id: { type: String },
    robot_lat: { type: Number },
    robot_lon: { type: Number },
    Avg_temp: { type: Number },
    Min_temp: { type: Number },
    Max_temp: { type: Number },
    No_of_images: { type: Number },
    data_record_time: { type: String },
    data_process_time: { type: Date },
    insertedAt: { type: Date, default: Date.now },
    frame_data: { type: [Object] },
  },
  { timestamps: true }
);

const CombinerBox = mongoose.model("CombinerBox", combinerBoxSchema);

module.exports = CombinerBox;
