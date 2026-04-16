const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    course:      { type: String, required: true, trim: true },
    instructor:  { type: String, required: true, trim: true },
    rating:      { type: Number, required: true, min: 1, max: 5 },
    comment:     { type: String, required: true, maxlength: 1000 },
    category:    {
      type: String,
      enum: ["Teaching Quality", "Course Content", "Support", "Infrastructure", "Overall"],
      default: "Overall",
    },
    helpful:     { type: Number, default: 0 },
    approved:    { type: Boolean, default: true },
    reply:       { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
