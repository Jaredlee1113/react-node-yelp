import { RestaurantsContext } from "@/context/RestaurantsContext";

import type { Restaurant } from "@/context/RestaurantsContext";
import React, { useContext, useEffect, useState } from "react";
import ReviewComponent from "@/components/Review";
import type { Review } from "@/components/Review";
import StarRate from "@/components/StarRate";
import AddReview from "@/components/AddReview";
import { useNavigate } from "react-router";
import RestaurantFinder from "@/api/RestaurantFinder";

const RestaurantDetailPage = () => {
    const { selectedRestaurant } = useContext(RestaurantsContext);
    const [reviews, setReviews] = useState<Review[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!selectedRestaurant) {
            navigate("/");
        } else {
            const fetchData = async () => {
                const res = await RestaurantFinder.get<{
                    data: { restaurant: Restaurant; reviews: Review[] };
                }>(`/${selectedRestaurant.id}`);
                setReviews(res.data.data.reviews);
            };
            fetchData();
        }
    }, []);
    return (
        selectedRestaurant && (
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    {selectedRestaurant.name}
                </h1>
                <StarRate rate={3.4} showRateNumber />

                {reviews && (
                    <div className="w-full flex flow-row justify-between items-center flex-wrap gap-2">
                        {reviews.map((item) => (
                            <ReviewComponent key={item.id} reviewData={item} />
                        ))}
                    </div>
                )}
                <AddReview reviews={reviews} setReviews={setReviews} />
            </div>
        )
    );
};

export default RestaurantDetailPage;
