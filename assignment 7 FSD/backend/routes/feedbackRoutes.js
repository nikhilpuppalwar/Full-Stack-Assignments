const express = require("express");
const router = express.Router();
const {
  getFeedbacks,
  getFeedbackById,
  createFeedback,
  upvoteFeedback,
  replyFeedback,
  deleteFeedback,
  getAnalytics
} = require("../controllers/feedbackController");


router.get("/analytics", getAnalytics);


router.route("/feedbacks")
  .get(getFeedbacks)
  .post(createFeedback);

router.route("/feedbacks/:id")
  .get(getFeedbackById)
  .delete(deleteFeedback);

router.patch("/feedbacks/:id/helpful", upvoteFeedback);
router.patch("/feedbacks/:id/reply", replyFeedback);

module.exports = router;
