const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ── MongoDB Connection ──────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/feedbackdb";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ── Schema & Model ──────────────────────────────────────────────────────────
const feedbackSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    course:      { type: String, required: true, trim: true },
    instructor:  { type: String, required: true, trim: true },
    rating:      { type: Number, required: true, min: 1, max: 5 },
    comment:     { type: String, required: true, maxlength: 1000 },
    category: {
      type: String,
      enum: ["Overall", "Teaching Quality", "Course Content", "Support", "Infrastructure"],
      default: "Overall",
    },
    helpful:  { type: Number, default: 0 },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

// ── Routes ──────────────────────────────────────────────────────────────────

// GET /api/feedbacks
app.get("/api/feedbacks", async (req, res) => {
  try {
    const { course, instructor, rating, category, sort = "-createdAt" } = req.query;
    const filter = { approved: true };
    if (course)     filter.course     = new RegExp(course, "i");
    if (instructor) filter.instructor = new RegExp(instructor, "i");
    if (category)   filter.category   = category;
    if (rating)     filter.rating     = Number(rating);

    const feedbacks = await Feedback.find(filter).sort(sort).limit(100);
    const stats = await Feedback.aggregate([
      { $match: { approved: true } },
      { $group: { _id: null, avgRating: { $avg: "$rating" }, total: { $sum: 1 } } },
    ]);
    res.json({ feedbacks, stats: stats[0] || { avgRating: 0, total: 0 } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/feedbacks/:id
app.get("/api/feedbacks/:id", async (req, res) => {
  try {
    const fb = await Feedback.findById(req.params.id);
    if (!fb) return res.status(404).json({ error: "Not found" });
    res.json(fb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/feedbacks
app.post("/api/feedbacks", async (req, res) => {
  try {
    const fb = new Feedback(req.body);
    await fb.save();
    res.status(201).json(fb);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/feedbacks/:id/helpful
app.patch("/api/feedbacks/:id/helpful", async (req, res) => {
  try {
    const fb = await Feedback.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpful: 1 } },
      { new: true }
    );
    res.json(fb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/feedbacks/:id
app.delete("/api/feedbacks/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/analytics
app.get("/api/analytics", async (req, res) => {
  try {
    const [byCourse, byCategory, byRating] = await Promise.all([
      Feedback.aggregate([
        { $group: { _id: "$course", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
        { $sort: { avg: -1 } },
      ]),
      Feedback.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ]),
      Feedback.aggregate([
        { $group: { _id: "$rating", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);
    res.json({ byCourse, byCategory, byRating });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
