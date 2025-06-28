import React from "react";
import StarRate from "./StarRating";
import { Separator } from "@/components/ui/separator";

export type Review = {
    id: string;
    name: string;
    rating: number;
    review: string;
};

const Review = ({ reviewData }: { reviewData: Review }) => {
    const { name, rating, review } = reviewData;
    return (
        <div className="min-w-md rounded-xl border-2 border-black h-36 flex flex-col">
            <div className="flex items-center justify-between p-2">
                <span>{name}</span>
                <StarRate rating={rating} />
            </div>
            <Separator />
            <div className="flex items-start justify-center flex-col flex-1 p-2">
                <span className="leading-7">{review}</span>
            </div>
        </div>
    );
};

export default Review;
