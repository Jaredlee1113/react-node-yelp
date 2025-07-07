import { RestaurantsContext } from "@/context/RestaurantsContext";

import type { Restaurant } from "@/context/RestaurantsContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import ReviewComponent from "@/components/Review";
import type { Review } from "@/components/Review";
import StarRate from "@/components/StarRating";
import AddReview from "@/components/AddReview";
import { useParams } from "react-router";
import RestaurantFinder from "@/api/RestaurantFinder";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const RestaurantDetailPage = () => {
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [curReview, setCurReview] = useState<Review | null>(null);
    const { id } = useParams();
    useEffect(() => {
        if (!selectedRestaurant) {
            const fetchRestaurantById = async () => {
                const res = await RestaurantFinder.get(`/restaurants/${id}`);
                const { restaurant, reviews } = res.data.data;
                setSelectedRestaurant(restaurant);
                setReviews(reviews);
            };
            fetchRestaurantById();
        } else {
            const fetchData = async () => {
                const res = await RestaurantFinder.get<{
                    data: { restaurant: Restaurant; reviews: Review[] };
                }>(`/restaurants/${selectedRestaurant.id}`);
                setReviews(res.data.data.reviews);
            };
            fetchData();
        }
    }, []);

    return (
        selectedRestaurant && (
            <>
                <Link to="/">
                    <Button variant="outline" size="sm">
                        <ChevronLeftIcon /> Back to home
                    </Button>
                </Link>
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                        {selectedRestaurant.name}
                    </h1>
                    <StarRate rating={selectedRestaurant.average_rating} showRateNumber />

                    {reviews && (
                        <div className="w-full flex flow-row justify-start items-center flex-wrap gap-2">
                            {reviews.map((item) => (
                                <ReviewComponent
                                    key={item.id}
                                    reviewData={item}
                                    setCurReview={setCurReview}
                                />
                            ))}
                        </div>
                    )}
                    <AddReview
                        reviews={reviews}
                        setReviews={setReviews}
                        curReview={curReview}
                        setCurReview={setCurReview}
                    />
                </div>
            </>
        )
    );
};

export default RestaurantDetailPage;
