import React from "react";
import StarRating from "./StarRating";
import { Separator } from "@/components/ui/separator";

const Review = () => {
    return (
        <div className="w-l rounded-xl border-2 border-black h-36 flex flex-col">
            <div className="flex items-center justify-between p-2">
                <span>John</span>
                <StarRating rating={3.7} />
            </div>
            <Separator />
            <div className="flex items-start justify-center flex-col flex-1 p-2">
                <span className="leading-7">
                    Does this place sell anything other than chesscake?
                </span>
            </div>
        </div>
    );
};

export default Review;
