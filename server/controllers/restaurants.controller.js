import db from "../db/index.js";

// get all restaurants
export const getAllRestaurants = async (req, res, next) => {
    try {
        const { rowCount, rows } = await db.query(
            "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), ROUND(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;"
        );
        const data = res.json({
            status: "success",
            count: rowCount,
            data: rows,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch data",
        });
    }
};

// get a restaurant by id
export const getRestaurantById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount, rows: restaurants } = await db.query(
            "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), ROUND(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id where id = $1;",
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
        res.status(500).json({
            status: "error",
            message: "Failed to fetch data",
        });
    }
};

// create a new restaurant
export const createRestaurant = async (req, res) => {
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
        res.status(500).json({
            status: "error",
            message: "Failed to create data",
        });
    }
};

// update a restaurant by id
export const updateRestaurant = async (req, res) => {
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

    for (const [key, value] of Object.entries(fields)) {
        setClauses.push(`${key} = $${index}`);
        values.push(value);
        index++;
    }

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
        res.status(500).json({
            status: "error",
            message: `Failed to update data by id = ${id}`,
        });
    }
};

// delete a restaurant by id
export const deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE from restaurants WHERE id = $1;", [id]);
        res.status(200).json({
            status: "success",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: `Failed to delete data by id = ${id}`,
        });
    }
};
