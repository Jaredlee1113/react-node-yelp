import React from "react";
import { Star, StarHalf } from "lucide-react";

declare type StarRateProps = {
    rating: number;
    showRateNumber?: boolean;
};

const StarRating = ({ rating, showRateNumber }: StarRateProps) => {
    if (Number(rating) === 0) {
        return <span className="text-amber-400">No rating yet</span>;
    }
    const Stars = () =>
        new Array(5).fill(null).map((_, index) => {
            const serial = index + 1;
            if (serial <= rating) {
                return (
                    <Star
                        key={serial}
                        fill="var(--color-amber-400)"
                        strokeWidth={2}
                        color={"var(--color-amber-400)"}
                    />
                );
            } else if (serial - rating < 1 && serial - rating > 0) {
                return (
                    <StarHalf
                        key={serial}
                        fill="var(--color-amber-400)"
                        strokeWidth={2}
                        color={"var(--color-amber-400)"}
                    />
                );
            } else {
                return <Star key={serial} strokeWidth={2} color={"var(--color-amber-400)"} />;
            }
        });
    return (
        <div className="flex gap-0.5" title={rating.toString()}>
            <Stars />
            {showRateNumber && <span className="text-amber-400">({rating})</span>}
        </div>
    );
};

export default StarRating;
