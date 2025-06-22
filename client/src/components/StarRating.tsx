import React from "react";
import { Star, StarHalf } from "lucide-react";

const StarRating = ({ rating }) => {
    return (
        <div className="height: 50px">
            {Array.from(5)
                .fill(null)
                .map((_, index) => {
                    if (index <= rating) {
                        return <Star className="text-amber-400" />;
                    } else {
                        return <Star fill="yellow" strokeWidth={2} />;
                    }
                })}
        </div>
    );
};

export default StarRating;
