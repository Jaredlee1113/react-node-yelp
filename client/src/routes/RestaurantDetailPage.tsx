import { RestaurantsContext } from "@/context/RestaurantsContext";
import type { Restaurant } from "@/context/RestaurantsContext";
import React, { useContext } from "react";

import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Separator } from "@/components/ui/separator";
import Review from "@/components/Review";

const RestaurantCard = ({ restaurant }) => {
    const { name, price_range } = restaurant;
    <div>
        <div className="flex flex-row justify-between">
            <span>{name}</span>
            <Rating defaultValue={Number(price_range)}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton key={index} className="text-amber-400" />
                ))}
            </Rating>
        </div>
        <Separator className="my-4" />
        <div>xxxxxxxx</div>
    </div>;
};

const RestaurantDetailPage = () => {
    const { selectedRestaurant } = useContext(RestaurantsContext);

    return (
        <div>
            RestaurantDetailPage: {(selectedRestaurant as Restaurant).id}
            <Review />
        </div>
    );
};

export default RestaurantDetailPage;
