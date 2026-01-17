const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },

    weight: Number,
    height: Number,
    pace: Number,
    flexibility: Number,
    leap: Number,
    armStrength: Number,
    legStrength: Number,
    muscleAnatomy: String,

    gradeLevel: String,
    gradeSection: String,

    picture: String,

    preferredSports: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Sports" }
    ],

    suitableSports: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Sports" }
    ],

    parents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Parent" }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);