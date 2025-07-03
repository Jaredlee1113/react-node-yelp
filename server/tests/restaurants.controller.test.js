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
    let res;
    beforeEach(() => {
        vi.restoreAllMocks();
        res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(),
        };
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
        const restaurants = [{ id: 1, name: "Mock Restaurant", price_range: "Mock Price Range 3" }];
        const reviews = [
            { id: 1, name: "Mock Name", restaurant_id: 1, review: "Tasty!", rating: 4 },
        ];
        const req = { params: { id: 1 } };
        vi.spyOn(db.default, "query")
            .mockResolvedValueOnce({
                rowCount: 1,
                rows: restaurants,
            })
            .mockResolvedValueOnce({
                rows: reviews,
            });

        await getRestaurantById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            count: 1,
            data: {
                restaurant: restaurants[0],
                reviews: reviews,
            },
        });
    });

    it("Create restaurant - success", async () => {
        const newRestaurant = {
            name: "mock name",
            location: "mock location",
            price_range: 3,
        };
        vi.spyOn(db.default, "query").mockResolvedValueOnce({
            rows: [newRestaurant],
        });
        const req = { body: newRestaurant };
        await createRestaurant(req, res);
        res.status.mockResolvedValueOnce(200);
        res.status.mockResolvedValueOnce({
            status: "success",
            data: newRestaurant,
        });
    });

    it("Update restaurant - success", async () => {
        const updateRestaurantData = {
            name: "mock name update",
            location: "mock location update",
            price_range: 4,
        };
        vi.spyOn(db.default, "query").mockResolvedValueOnce({
            rows: [updateRestaurantData],
        });
        const req = { body: updateRestaurantData, params: { id: 5 } };
        await updateRestaurant(req, res);
        res.status.mockResolvedValueOnce(200);
        res.status.mockResolvedValueOnce({
            status: "success",
            data: updateRestaurantData,
        });
    });

    it("Delete restaurant - success", async () => {
        vi.spyOn(db.default, "query").mockResolvedValueOnce({});
        const req = { params: { id: 5 } };
        await deleteRestaurant(req, res);
        res.status.mockResolvedValueOnce(200);
        res.status.mockResolvedValueOnce({
            status: "success",
        });
    });
});
