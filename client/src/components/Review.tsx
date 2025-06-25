import React from "react";
import StarRate from "./StarRate";
import { Separator } from "@/components/ui/separator";

export type Review = {
    id: string;
    name: string;
    rate: number;
    review: string;
};

const Review = ({ reviewData }: { reviewData: Review }) => {
    const { name, rate, review } = reviewData;
    return (
        <div className="min-w-md rounded-xl border-2 border-black h-36 flex flex-col">
            <div className="flex items-center justify-between p-2">
                <span>{name}</span>
                <StarRate rate={rate} />
            </div>
            <Separator />
            <div className="flex items-start justify-center flex-col flex-1 p-2">
                <span className="leading-7">{review}</span>
            </div>
        </div>
    );
};

export default Review;
