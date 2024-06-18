import express from "express";
import ReviewController from "../controllers/review.controller";

const router = express.Router();

router.get("/reviews", ReviewController.getReviews);
router.post("/reviews", ReviewController.createReview);
router.get("/reviews/:id", ReviewController.getReviewById);
router.put("/reviews/:id", ReviewController.updateReviewInfo);
router.delete("/reviews/:id", ReviewController.deleteReviewInfo);

export default router;
