const mongoose = require("mongoose");
const { Schema } = mongoose;

const travelLogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    comments: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    image: String,
    dateVisited: {
      type: Date,
      required: true,
    },
    latitude: {
      type: Number,
      min: -90,
      max: 90,
      required: true,
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const modelLogEntry = mongoose.model("LogEntry", travelLogSchema);
module.exports = modelLogEntry;
