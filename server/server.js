import "dotenv/config";
import express from "express";
import db from "./db/index.js";

const app = express();

app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM restaurants");
        const data = res.json({
            status: "success",
            count: rows.length,
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

// create a new restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    const { name, location, price_range } = req.body;
    try {
        const { rows } = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
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
    const query = `UPDATE restaurants SET ${setClause} WHERE id = $${index} RETURNING *`;

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
        await db.query("DELETE from restaurants WHERE id = $1", [id]);
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on port 3000");
});
