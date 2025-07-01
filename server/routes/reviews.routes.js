import express from "express";
import {
    getReviews,
    getReviewById,
    updateReview,
    createReview,
    deleteReview,
} from "../controllers/reviews.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/:id", getReviewById);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
