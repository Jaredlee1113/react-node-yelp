import { describe, it, expect, vi, beforeEach } from "vitest";
import * as db from "../db/index.js";
import {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
} from "../controllers/reviews.controller.js";

describe("Test reviews controllers", () => {
    let res;
    let req;
    beforeEach(() => {
        vi.restoreAllMocks();
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        req = {
            body: {
                restaurant_id: 5,
            },
        };
    });

    it("Get reviews - success", async () => {
        const reviews = [
            {
                name: "Mock name",
                review: "This is a mock review",
                rating: 4,
            },
        ];

        vi.spyOn(db.default, "query").mockResolvedValueOnce({
            rows: reviews,
            rowCount: reviews.length,
        });
        await getReviews(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: {
                reviews,
                count: reviews.length,
            },
        });
    });
    it("Get review by id - success", async () => {
        const reviewId = 15;
        const review = {
            name: "Mock name",
            review: "This is a mock review",
            rating: 4,
            id: reviewId,
        };

        vi.spyOn(db.default, "query").mockResolvedValueOnce({
            rows: [review],
            rowCount: 1,
        });

        req.params = {
            id: reviewId,
        };
        await getReviewById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: {
                count: 1,
                review,
            },
        });
    });

    it("Create review - success", async () => {
        const reviewData = {
            name: "Mock create name",
            review: "This is a mock create review",
            rating: 3,
        };

        const avgReview = {
            average_rating: 3.5,
        };

        vi.spyOn(db.default, "query")
            .mockResolvedValueOnce({
                rows: [reviewData],
            })
            .mockResolvedValueOnce({
                rows: [avgReview],
            });

        req.body = { ...reviewData, ...req.body };
        try {
            await createReview(req, res);
        } catch (error) {
            console.log(" it ~ error:", error);
        }
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: {
                review: {
                    ...reviewData,
                    ...avgReview,
                },
            },
        });
    });
    it("Update review - success", async () => {
        const reviewData = {
            name: "Mock update name",
            review: "This is a mock update review",
            rating: 4,
        };

        const avgReview = {
            average_rating: 4.5,
        };

        vi.spyOn(db.default, "query")
            .mockResolvedValueOnce({
                rows: [reviewData],
            })
            .mockResolvedValueOnce({
                rows: [avgReview],
            });

        req.body = { ...reviewData, ...req.body };
        req.params = { id: 15 };
        await createReview(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: {
                review: {
                    ...reviewData,
                    ...avgReview,
                },
            },
        });
    });

    it("Delete review - success", async () => {
        vi.spyOn(db.default, "query").mockResolvedValueOnce({});

        req.params = {
            id: 15,
        };
        await deleteReview(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
        });
    });
});
