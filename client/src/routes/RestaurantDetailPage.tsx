import { RestaurantsContext } from "@/context/RestaurantsContext";
import type { Restaurant } from "@/context/RestaurantsContext";
import React, { useContext } from "react";

import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Separator } from "@/components/ui/separator";
import Review from "@/components/Review";
import StarRating from "@/components/StarRating";

const RestaurantDetailPage = () => {
    const { selectedRestaurant } = useContext(RestaurantsContext);

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                {selectedRestaurant.name}
            </h1>
            <StarRating rating={3.4} />
            <Review />
        </div>
    );
};

export default RestaurantDetailPage;
