const Feedback = require("../models/Feedback");


exports.getFeedbacks = async (req, res) => {
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
};


exports.getFeedbackById = async (req, res) => {
  try {
    const fb = await Feedback.findById(req.params.id);
    if (!fb) return res.status(404).json({ error: "Not found" });
    res.json(fb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createFeedback = async (req, res) => {
  try {
    const fb = new Feedback(req.body);
    await fb.save();
    res.status(201).json(fb);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.upvoteFeedback = async (req, res) => {
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
};


exports.replyFeedback = async (req, res) => {
  try {
    const { reply } = req.body;
    const fb = await Feedback.findByIdAndUpdate(
      req.params.id,
      { $set: { reply } },
      { new: true }
    );
    res.json(fb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAnalytics = async (req, res) => {
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
};
