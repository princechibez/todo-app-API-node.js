//Task schema =========>>>>>>>>>> _id, title, description, timestamp

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
  { unique: true }
);

module.exports = mongoose.model("Tasks", taskSchema);
