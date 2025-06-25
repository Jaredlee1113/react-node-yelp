import React from "react";
import { Star, StarHalf } from "lucide-react";

declare type StarRateProps = {
    rate: number;
    showRateNumber?: boolean;
};

const StarRate = ({ rate, showRateNumber }: StarRateProps) => {
    const Stars = () =>
        new Array(5).fill(null).map((_, index) => {
            const serial = index + 1;
            if (serial <= rate) {
                return (
                    <Star
                        key={serial}
                        fill="var(--color-amber-400)"
                        strokeWidth={2}
                        color={"var(--color-amber-400)"}
                    />
                );
            } else if (serial - rate < 1 && serial - rate > 0) {
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
        <div className="flex gap-0.5">
            <Stars />
            {showRateNumber && <span className="text-amber-400">({rate})</span>}
        </div>
    );
};

export default StarRate;
