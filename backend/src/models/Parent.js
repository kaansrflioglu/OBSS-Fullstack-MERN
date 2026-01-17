const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: String,
    height: Number,
    relation: String,
    sportsBackground: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sports"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parent", parentSchema);