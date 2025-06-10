import "dotenv/config";
import express from "express";
import Pool from "./db/index.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const { rows } = await Pool.query("SELECT * FROM restaurants");
        const data = res.json({
            status: "success",
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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
