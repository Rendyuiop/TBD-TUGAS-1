const { Router } = require("express");
const controller = require("./controller");

const router = Router();

// Routes to create a new review,
router.post("/reviews", controller.addReview);

// Routes to update a review
router.put("/reviews/:id", controller.updateReview);

// Routes to get reviews
router.get("/reviews", controller.getAllReviews);
router.get("/reviews/:id", controller.getReviewByID);
router.get("/reviews/user/:userid", controller.getReviewsByUser);
router.get("/reviews/book/:bookid", controller.getReviewsByBook);
router.get("/reviews/rate/:rating", controller.getReviewsByRate);

// Routes to delete a review
router.delete("/reviews/:id", controller.deleteReview);

module.exports = router;
