import { RestaurantsContext } from "@/context/RestaurantsContext";
import type { Restaurant } from "@/context/RestaurantsContext";
import React, { useContext, useEffect } from "react";
import Review from "@/components/Review";
import StarRating from "@/components/StarRating";
import AddReview from "@/components/AddReview";
import { useNavigate } from "react-router";

const RestaurantDetailPage = () => {
    const { selectedRestaurant } = useContext(RestaurantsContext);
    const navigate = useNavigate();
    console.log(" RestaurantDetailPage ~ selectedRestaurant:", selectedRestaurant);
    useEffect(() => {
        if (!selectedRestaurant) {
            navigate("/");
        }
    }, []);
    return (
        selectedRestaurant && (
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    {selectedRestaurant.name}
                </h1>
                <StarRating rating={3.4} showRateNumber />
                <div className="w-full flex flow-row justify-evenly items-center gap-2">
                    <Review />
                    <Review />
                    <Review />
                </div>
                <AddReview />
            </div>
        )
    );
};

export default RestaurantDetailPage;
