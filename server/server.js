import "dotenv/config";
import express from "express";
import db from "./db/index.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const { rowCount, rows } = await db.query(
            "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), ROUND(AVG(rate),1) as average_rate FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;"
        );
        const data = res.json({
            status: "success",
            count: rowCount,
            data: rows,
        });
    } catch (error) {
        console.log("Failed to fetch data:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch data",
        });
    }
});

// get a restaurant by id
app.get("/api/v1/restaurants/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount, rows: restaurants } = await db.query(
            "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), ROUND(AVG(rate),1) as average_rate FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id where id = $1;",
            [id]
        );
        const { rows: reviews } = await db.query("SELECT * FROM reviews where restaurant_id = $1", [
            id,
        ]);
        const data = res.status(200).json({
            status: "success",
            count: rowCount,
            data: {
                restaurant: restaurants[0],
                reviews,
            },
        });
    } catch (error) {
        console.log("Failed to fetch data:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch data",
        });
    }
});

// create a new restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    const { name, location, price_range } = req.body;
    try {
        const { rows } = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING name, location, price_range;",
            [name, location, price_range]
        );
        res.json({
            status: "success",
            data: rows[0],
        });
    } catch (error) {
        console.log(" app.post ~ error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to create data",
        });
    }
});

// update a restaurant by id
app.put("/api/v1/restaurants/:id", async (req, res) => {
    const { id } = req.params;
    const fields = req.body;

    if (Object.keys(fields).length === 0) {
        res.status(400).json({
            status: "error",
            message: "No fields to update.",
        });
    }

    const setClauses = [];
    const values = [];
    let index = 1;

    // build setClauses and values array
    for (const [key, value] of Object.entries(fields)) {
        setClauses.push(`${key} = $${index}`);
        values.push(value);
        index++;
    }

    // Add id at the end of WHERE clause
    values.push(id);

    const setClause = setClauses.join(", ");
    const query = `UPDATE restaurants SET ${setClause} WHERE id = $${index} RETURNING *;`;

    try {
        const { rows } = await db.query(query, values);
        res.json({
            status: "success",
            data: rows[0],
        });
    } catch (error) {
        console.log(" app.put ~ error:", error);
        res.status(500).json({
            status: "error",
            message: `Failed to update data by id = ${id}`,
        });
    }
});

// delete a restaurant by id
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE from restaurants WHERE id = $1;", [id]);
        res.status(204).json({
            status: "success",
        });
    } catch (error) {
        console.log(" app.delete ~ error:", error);
        res.status(500).json({
            status: "error",
            message: `Failed to delete data by id = ${id}`,
        });
    }
});

// create a new review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    const { name, rate, review } = req.body;
    const { id } = req.params;
    try {
        const { rows } = await db.query(
            "INSERT INTO reviews (restaurant_id, name, rate, review) VALUES ($1, $2, $3, $4) RETURNING *;",
            [id, name, rate, review]
        );
        res.status(200).json({
            status: "success",
            data: rows[0],
        });
    } catch (error) {
        console.log(" app.post ~ error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to create review",
        });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on port 3000");
});
