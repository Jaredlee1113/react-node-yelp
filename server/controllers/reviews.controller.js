import db from "../db/index.js";

// get reviews
export const getReviews = async (req, res) => {
    const { restaurant_id } = req.body;
    try {
        const { rows, rowCount } = await db.query(
            "SELECT * FROM reviews WHERE restaurant_id = $1;",
            [restaurant_id]
        );
        res.status(200).json({
            status: "success",
            data: {
                count: rowCount,
                reviews: rows,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to get reviews",
        });
    }
};

// get a review by id
export const getReviewById = async (req, res) => {
    const { restaurant_id } = req.body;
    const { id } = req.params;
    try {
        const { rows, rowCount } = await db.query(
            "SELECT * FROM reviews WHERE id = $1 AND restaurant_id = $2;",
            [id, restaurant_id]
        );
        res.status(200).json({
            status: "success",
            data: {
                count: rowCount,
                review: rows[0],
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to get the review by id",
            error,
        });
    }
};

// create a new review
export const createReview = async (req, res) => {
    const { name, rating, review, restaurant_id } = req.body;
    try {
        const { rows } = await db.query(
            "INSERT INTO reviews (restaurant_id, name, rating, review) VALUES ($1, $2, $3, $4) RETURNING *;",
            [restaurant_id, name, rating, review]
        );

        const { rows: avg_rows } = await db.query(
            "SELECT ROUND(AVG(rating), 1) AS average_rating FROM reviews where restaurant_id = $1",
            [restaurant_id]
        );
        const reviewRes = {
            ...rows[0],
            ...avg_rows[0],
        };
        res.status(200).json({
            status: "success",
            data: {
                review: reviewRes,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to create the review",
        });
    }
};

// update a review
export const updateReview = async (req, res) => {
    const { restaurant_id, name, review, rating } = req.body;
    const { id } = req.params;
    const newReview = { name, review, rating };
    let setClauses = [];
    let values = [];
    let index = 1;

    for (const [key, value] of Object.entries(newReview)) {
        if (value) {
            setClauses.push(`${key} = $${index}`);
            values.push(value);
            index++;
        }
    }

    values.push(id);
    values.push(restaurant_id);

    const setClause = setClauses.join(",");

    try {
        const { rows } = await db.query(
            `UPDATE reviews SET ${setClause} WHERE id = $${index} AND restaurant_id = $${
                index + 1
            } RETURNING *;`,
            values
        );
        const { rows: avg_rows } = await db.query(
            "SELECT ROUND(AVG(rating), 1) AS average_rating FROM reviews where restaurant_id = $1",
            [restaurant_id]
        );
        const review = {
            ...rows[0],
            ...avg_rows[0],
        };
        res.status(200).json({
            status: "success",
            data: {
                review,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to update the review",
        });
    }
};

// remove a review
export const deleteReview = async (req, res) => {
    const { restaurant_id } = req.body;
    const { id } = req.params;
    try {
        await db.query("DELETE FROM reviews WHERE id = $1 AND restaurant_id = $2;", [
            id,
            restaurant_id,
        ]);
        res.status(200).json({
            status: "success",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete the review",
            error,
        });
    }
};
