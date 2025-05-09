const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  validateReview,
  isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");

//Reviews route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete reviews
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
