import "dotenv/config";
import express from "express";
import cors from "cors";
import RestaurantsRoutes from "./routes/restaunrants.routes.js";
import ReviewsRoutes from "./routes/reviews.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

const globalRouter = express.Router();
globalRouter.use("/restaurants", RestaurantsRoutes);
globalRouter.use("/reviews", ReviewsRoutes);

app.use("/api/v1", globalRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on port 3000");
});
