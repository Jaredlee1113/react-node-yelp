import { describe, it, expect, vi, beforeEach } from "vitest";
import * as db from "../db/index.js";
import {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} from "../controllers/restaurants.controller.js";

describe("Restaurants Controllers", () => {
    const res = {
        json: vi.fn(),
        status: vi.fn().mockReturnThis(),
    };
    beforeEach(() => {
        vi.restoreAllMocks();
        res.json.mockReset();
        res.status.mockReset();
    });

    it("Get all restaunrants - success", async () => {
        vi.spyOn(db.default, "query").mockResolvedValueOnce({
            rowCount: 1,
            rows: [{ id: 1, name: "Mock Restaurant", price_range: "Mock Price Range 3" }],
        });

        await getAllRestaurants({}, res);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            count: 1,
            data: [{ id: 1, name: "Mock Restaurant", price_range: "Mock Price Range 3" }],
        });
    });

    it("Get restaurant by id - success", async () => {
        vi.spyOn(db.default, "query")
            .mockResolvedValueOnce({
                rowCount: 1,
                rows: [{ id: 1, name: "Mock Restaurant", price_range: "Mock Price Range 3" }],
            })
            .mockResolvedValueOnce({
                rows: [{ id: 1, name: "Mock Name", restaurant_id: 1, review: "Tasty!", rating: 4 }],
            });

        const req = { params: { id: 1 } };

        await getRestaurantById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            count: 1,
            data: {
                restaurant: { id: 1, name: "Mock Restaurant", price_range: "Mock Price Range 3" },
                reviews: [
                    { id: 1, name: "Mock Name", restaurant_id: 1, review: "Tasty!", rating: 4 },
                ],
            },
        });
    });
});
